from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from dotenv import load_dotenv
import os
import re
import json
import traceback

load_dotenv()

def extract_json(raw: str) -> dict:
    """Robustly extract JSON from LLM output, handling markdown blocks and extra text."""
    # 1. Try to find JSON within markdown code blocks first
    block_match = re.search(r'```(?:json)?\s*([\s\S]*?)```', raw)
    if block_match:
        try:
            return json.loads(block_match.group(1).strip())
        except json.JSONDecodeError:
            pass
    # 2. Try to extract the outermost { ... } object
    brace_match = re.search(r'\{[\s\S]*\}', raw)
    if brace_match:
        try:
            return json.loads(brace_match.group())
        except json.JSONDecodeError:
            pass
    # 3. Fallback: try parsing the raw string directly
    return json.loads(raw.strip())

app = FastAPI(title="Fluenix AI Service")
client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    max_retries=2, # Otomatik tekrar deneme (Rate limit 429 için)
    timeout=60.0
)

raw_origins = os.getenv("CORS_ORIGINS", "*")
allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

SCENARIO_PROMPTS = {
    "interview": """You are a highly experienced, NO-NONSENSE FAANG technical interviewer. 
    Conduct a high-stakes, rigorous technical interview. Your tone is cold, formal, and demanding.
    Expect precise technical answers. If the candidate is vague, press them for exact architectural details.
    DO NOT offer encouragement. DO NOT say 'good job' or 'don't worry'. 
    If the candidate struggles, remain silent or ask a follow-up that exposes the gap.
    CRITICAL: Maintain a professional distance. You are evaluating, not coaching.""",
    
    "standup": """You are a high-pressure Engineering Lead running a mission-critical daily standup.
    Expect brief, high-signal updates. If an update is too vague or 'soft', call it out and demand specific technical blockers.
    Maintain a time-boxed, efficient, and strictly professional atmosphere. 
    Zero tolerance for fluff or patronizing language.""",
    
    "code_review": """You are a pedantic Senior Software Architect conducting a critical code review.
    Your goal is to find architectural flaws and demand justification for every line of code.
    Be thorough, technically rigorous, and uncompromising on quality. 
    Maintain a formal peer-review tone with zero emotional padding."""
}

LISTENING_SCENARIOS = [
    "Technical: System design trade-offs - Monolith vs microservices decision, two senior engineers debating",
    "Technical: Code review session - PR feedback, 'this won't scale' debate, clean code vs pragmatism",
    "Technical: Incident post-mortem - Production outage, 5-why analysis, blameless retrospective",
    "Technical: API design review - REST vs GraphQL, versioning strategy, breaking changes",
    "Technical: ML model deployment - Latency, model drift, A/B testing, rollback plan",
    "Collaboration: Sprint planning - Story point negotiation, scope creep, 'this is a 13-pointer' debate",
    "Collaboration: Cross-team dependency sync - Platform team and feature team discussing handoff dates",
    "Collaboration: Stakeholder update - Engineering lead explaining technical risk to a non-technical VP",
    "Collaboration: Scope negotiation - Engineer explaining to PM why 2 weeks of work won't fit into 1 week",
    "Collaboration: Performance feedback conversation - Manager giving a software engineer growth areas",
    "Leadership: Quarterly roadmap alignment - VP Eng explaining how to balance technical debt with OKRs",
    "Leadership: Hiring debrief - Bar raiser meeting, 'strong hire vs. no hire' calibration",
    "Leadership: Promotion calibration - Manager advocacy for a Staff engineer, 'scope vs. impact' debate",
    "Leadership: 1:1 coaching session - Senior engineer coaching a mid-level engineer on career pathing",
    "Interview: Phone screen - Behavioral questions + light system design intro",
    "Interview: Behavioral interview (STAR) - 'Tell me about a time you disagreed with your team' question",
    "Interview: System design interview - Design a URL shortener / rate limiter (FAANG style)",
    "Interview: Offer negotiation call - Recruiter discussing leveling and comp package with candidate"
]

BEHAVIORAL_PRINCIPLES = [
    "Customer Obsession - Prioritizing the user over technical convenience",
    "Ownership - Taking responsibility for a production outage or project failure",
    "Invent and Simplify - Refactoring legacy code or simplifying a complex architecture",
    "Are Right, A Lot - Making a tough technical decision with limited data",
    "Learn and Be Curious - Picking up a completely new language or framework under pressure",
    "Hire and Develop The Best - Mentoring a junior engineer or handling an underperformer",
    "Insist on Highest Standards - Rejecting a PR or pushing back against a tight deadline to maintain code quality",
    "Think Big - Proposing a major architectural shift (e.g. monolith to microservices)",
    "Bias for Action - Shipping a hotfix quickly vs waiting for a perfect solution",
    "Frugality - Reducing AWS costs or optimizing resource usage",
    "Earn Trust - Resolving a severe conflict with a product manager or another team",
    "Dive Deep - Debugging an incredibly obscure bug that no one else could find",
    "Have Backbone; Disagree and Commit - Pushing back on leadership about technical debt, then committing to their decision",
    "Deliver Results - Delivering a critical feature on an impossible deadline"
]

def get_level_steering(level: str):
    """Provides invisible steering instructions based on CEFR level."""
    steering = f"\n\n[INVISIBLE STEERING: The candidate has a CEFR {level} level. "
    if level in ["beginner", "A1", "A2"]:
        steering += "Avoid extremely rare idioms and complex nested sentences. Use standard professional vocabulary. "
    elif level in ["B1", "B2"]:
        steering += "Use natural professional industry terminology. No need to over-simplify. "
    else:
        steering += "Use advanced architectural concepts and native-level professional jargon. No restrictions on complexity. "
    steering += "CRITICAL: Do NOT mention their level. Do NOT be patronizing. Remain a professional peer/interviewer.]"
    return steering

@app.get("/health")
def health():
    return {"status": "ok"}

from fastapi.responses import StreamingResponse

@app.post("/scenario/chat")
def scenario_chat(data: dict):
    try:
        scenario = data.get("scenario", "interview")
        level = data.get("level", "B2")
        context = data.get("context", "")
        messages = data.get("messages", [])
        
        system_prompt = SCENARIO_PROMPTS.get(scenario, SCENARIO_PROMPTS["interview"])
        system_prompt += get_level_steering(level)

        if context:
            system_prompt += f"\n\n[SCENARIO CONTEXT: {context}. You must strictly adhere to this exact context. Initiate the conversation by addressing this scenario directly.]"
        
        def sse_generator():
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=4096,
                temperature=0.8,
                system=[{
                    "type": "text",
                    "text": system_prompt,
                    "cache_control": {"type": "ephemeral"}
                }],
                extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
                messages=messages
            ) as stream:
                for text in stream.text_stream:
                    # Format as Server-Sent Event (SSE) chunk
                    yield f"data: {text}\n\n"
                yield "data: [DONE]\n\n"

        # Check if client explicitly requested a stream via query or body
        # For backwards compatibility, if stream: true is passed, use StreamingResponse
        if data.get("stream", False):
            return StreamingResponse(sse_generator(), media_type="text/event-stream")
        else:
            # Non-streaming fallback
            response = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=4096,
                temperature=0.8,
                system=[{
                    "type": "text",
                    "text": system_prompt,
                    "cache_control": {"type": "ephemeral"}
                }],
                extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
                messages=messages
            )
            return {"reply": response.content[0].text}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/writing/generate")
def generate_writing(data: dict):
    try:
        level = data.get("level", "B2")
        category = data.get("category", "pr_description")
        
        system_prompt = f"""You are a FAANG Senior Engineering Manager preparing a technical writing exercise for a candidate.
Their English proficiency is expected to be CEFR {level}.
The writing category is {category} (e.g., pr_description, architecture_decision, post_mortem).

Return ONLY a JSON object matching this exact schema (do not wrap in markdown code blocks):
{{
  "mission": {{
    "title": "A short, descriptive title for the task",
    "context": "A 2-3 sentence context explaining the situation and what the engineer needs to write.",
    "referenceData": "Mock data, code diff, or ticket description they should base their writing on."
  }}
}}"""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            temperature=0.7,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Generate a new writing mission for {category}."
            }]
        )
        raw = response.content[0].text
        return extract_json(raw)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/writing/analyze")
def analyze_writing(data: dict):
    try:
        exercise = data.get("exercise", "pr_description")
        text = data.get("text", "")
        context = data.get("context", "")
        referenceData = data.get("referenceData", "")
        level = data.get("level", "B2")
        
        system_msg = f"""You are a Senior Staff Engineer at a FAANG company reviewing a colleague's written communication.
They are practicing technical English for a {exercise}.
Their English CEFR level is {level}. Adjust your expectations accordingly.

SCENARIO CONTEXT: {context}
REFERENCE DATA (Code Diff / Ticket):
{referenceData}

The user has written the following draft based on the context above:
<draft>{text}</draft>

Evaluate their draft on:
1. Technical Clarity: Does it accurately and professionally convey the required information based on the reference data?
2. Professional Tone: Is it appropriate for a FAANG environment?
3. Grammar and Vocabulary: Correctness and richness of language.

Provide a strict, professional review. Return ONLY a valid JSON object matching this exact schema:
{{
  "overall_score": 85,
  "fluency_score": 80,
  "vocabulary_score": 90,
  "technical_accuracy": 85,
  "strengths": ["Clear opening", "Good use of tech terms"],
  "improvements": ["Sentence 2 is passive", "Missed a comma"],
  "overall_feedback": "A concise paragraph summarizing the review..."
}}
Do NOT wrap the JSON in markdown code blocks. Start immediately with {{."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            temperature=0.3,
            system=[{
                "type": "text",
                "text": system_msg,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": "Analyze my draft."
            }]
        )
        return {"feedback": response.content[0].text}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scenario/analyze")
def analyze_scenario(data: dict):
    try:
        messages = data.get("messages", [])
        scenario = data.get("scenario", "interview")
        level = data.get("level", "B2")

        transcript = "\n".join([
            f"{'AI' if m['role'] == 'assistant' else 'User'}: {m['content']}"
            for m in messages
        ])

        scenario_label = {"interview": "Technical Interview", "standup": "Daily Standup", "code_review": "Code Review"}.get(scenario, scenario)

        system_prompt=f"""You are a senior technical English evaluator at a FAANG company.
You are reviewing a {scenario_label} simulation where a candidate practiced professional English.
Their CEFR level is {level}.

Evaluate the conversation transcript on these criteria:

1. FLUENCY (0-100): Sentence structure, natural flow, use of fillers/hedging, response length.
   - 0-40: Broken sentences, frequent L1 interference, unnaturally short responses.
   - 40-70: Functional but stilted, some unnatural phrasing, adequate length.
   - 70-100: Natural, confident, professional cadence with appropriate detail.

2. VOCABULARY (0-100): Range and precision of technical and professional terms.
   - 0-40: Basic words only, avoids technical terms, repetitive.
   - 40-70: Uses common tech terms correctly, limited range.
   - 70-100: Rich vocabulary, precise jargon, idiomatic professional expressions.

3. TECHNICAL ACCURACY (0-100): Correctness of technical content, not English.
   - 0-40: Major technical errors or vague hand-waving.
   - 40-70: Generally correct but lacks depth or specificity.
   - 70-100: Precise, demonstrates deep understanding, uses concrete examples.

4. OVERALL (0-100): Weighted average — would this person pass a FAANG {scenario_label}?

Return ONLY a JSON object:
{{
  "fluency_score": <0-100>,
  "vocabulary_score": <0-100>,
  "technical_accuracy": <0-100>,
  "overall_score": <0-100>,
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "improvements": ["Actionable improvement 1", "Actionable improvement 2"],
  "overall_feedback": "2-3 sentence summary with specific examples from the transcript."
}}
Return only JSON. Do not wrap in markdown."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            temperature=0.3,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Scenario type: {scenario_label}\n\nConversation transcript:\n{transcript}"
            }]
        )
        raw = response.content[0].text
        return {"analysis": json.dumps(extract_json(raw))}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pronunciation/analyze")
def analyze_pronunciation(data: dict):
    try:
        transcript = data.get("transcript", "")
        target_word = data.get("target_word", "")
        level = data.get("level", "B2")
        
        # Client-side STT already converted speech to text.
        # We analyze: did the STT hear the correct word? If not, what went wrong phonetically?
        system_prompt = f"""You are an expert English pronunciation coach specializing in technical vocabulary.
The student (CEFR {level}) tried to pronounce a target word. A speech-to-text engine transcribed what it heard.

Your job:
1. Compare the STT transcript against the target word.
2. If they differ, analyze the PHONETIC reason — which sounds were likely mispronounced.
3. If they match, still provide a useful pronunciation tip for the word (stress pattern, silent letters, common mistakes by non-native speakers).
4. Consider that STT errors can also indicate pronunciation issues (e.g., "algorithm" heard as "al gore rhythm" suggests wrong stress).

Scoring guide:
- If transcript matches target exactly: 85-100 (give 100 only if the word has no common pronunciation pitfalls).
- If transcript is close but slightly different: 50-84 based on severity.
- If transcript is completely wrong: 0-49.

Return ONLY a JSON object:
{{
  "accuracy_score": <0-100>,
  "is_correct": <true if score >= 70>,
  "feedback": "Specific phonetic feedback. Example: 'The stress should be on the SECOND syllable: al-GO-rithm, not AL-go-rithm.'",
  "tip": "A practical tip for remembering the correct pronunciation. Keep it concise."
}}
Return only JSON. Do not wrap in markdown."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=512,
            temperature=0.3,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Target word: {target_word}\nSTT heard: {transcript}"
            }]
        )
        raw = response.content[0].text
        return {"result": json.dumps(extract_json(raw))}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/behavioral/generate")
def generate_behavioral(data: dict):
    try:
        import random
        level = data.get("level", "B2")
        principle = random.choice(BEHAVIORAL_PRINCIPLES)
        
        system_prompt = f"""You are a FAANG Senior Engineering Manager preparing a behavioral interview.
Generate a highly realistic behavioral interview question for a software engineer.
Focus specifically on the following Amazon Leadership Principle / theme:
THEME: {principle}

Their English proficiency is expected to be CEFR {level}.

Return ONLY a JSON object matching this exact schema (do not wrap in markdown):
{{
  "question": {{
    "category": "{principle.split(' - ')[0]}",
    "context": "A brief 1-2 sentence context or expectation for why this question is being asked in a FAANG interview.",
    "question": "The actual behavioral interview question (e.g., 'Tell me about a time...')"
  }}
}}"""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            temperature=0.7,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": "Generate a new behavioral interview question."
            }]
        )
        raw = response.content[0].text
        return extract_json(raw)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/behavioral/analyze")
def analyze_behavioral(data: dict):
    try:
        question = data.get("question", "")
        category = data.get("category", "")
        context = data.get("context", "")
        level = data.get("level", "B2")
        star = data.get("star", {})
        
        system_prompt = f"""You are a FAANG Senior Engineering Manager evaluating a candidate's behavioral interview answer.
The candidate is testing for Amazon Leadership Principles like {category}.
Their English proficiency is expected to be CEFR {level}.

Context/Expectation for this question:
{context}

The candidate was asked: "{question}"

They provided the following STAR response:
[SITUATION]: {star.get('situation', '')}
[TASK]: {star.get('task', '')}
[ACTION]: {star.get('action', '')}
[RESULT]: {star.get('result', '')}

Evaluate their response based on two main criteria:
1. Leadership Alignment (Did they answer the question well technically? Did they show ownership? Did they use 'I' instead of 'We' in action? Did they have quantifiable results?)
2. English Quality (Grammar, vocabulary, and professional tone relative to {level}.)

Return ONLY a JSON object matching this exact schema:
{{
  "overall_score": <0-100>,
  "leadership_alignment": <0-100>,
  "english_quality": <0-100>,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "detailed_analysis": {{
    "situation": "Brief critique of their situation.",
    "task": "Brief critique of their task.",
    "action": "Critique of action (most important).",
    "result": "Critique of their result."
  }}
}}
Return ONLY JSON. Do not use markdown blocks."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            temperature=0.3,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": "Evaluate my STAR response."
            }]
        )
        raw = response.content[0].text
        return {"analysis": json.dumps(extract_json(raw))}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/error-decoder/generate")
def generate_error_scenario(data: dict):
    try:
        level = data.get("level", "B2")
        role = data.get("role", "Full Stack") # From onboarding metadata
        
        system_prompt = f"""You are a FAANG Senior Staff Engineer designing a technical training exercise.
Generate a highly realistic, challenging technical error scenario tailored to a {role} engineer.
Their English proficiency is expected to be CEFR {level}.

Return ONLY a JSON object matching this exact schema (do not wrap in markdown):
{{
  "title": "Short title",
  "type": "stack-trace",
  "difficulty": "Intermediate",
  "content": "The actual error log, stack trace, or doc text",
  "eli5": "Yapay Zeka Özeti: Explain like I'm 5 in Turkish",
  "highlights": [{{ "word": "specific term from content", "tooltip": "Turkish explanation" }}],
  "question": "A technical multiple choice question based on the content",
  "options": [
    {{ "id": "o1", "text": "Option 1", "isCorrect": false, "explanation": "Why this is incorrect" }},
    {{ "id": "o2", "text": "Option 2", "isCorrect": true, "explanation": "Why this is correct" }},
    {{ "id": "o3", "text": "Option 3", "isCorrect": false, "explanation": "Why this is incorrect" }}
  ]
}}"""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            temperature=0.7,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": "Generate a new error scenario."
            }]
        )
        raw = response.content[0].text
        scenario_data = extract_json(raw)
        
        if "options" in scenario_data:
            import random
            random.shuffle(scenario_data["options"])
            
        return {"scenario": scenario_data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/listening/generate")
def generate_listening_scenario(data: dict):
    try:
        import random
        level = data.get("level", "B2")
        topic = random.choice(LISTENING_SCENARIOS)
        
        system_prompt = f"""You are a FAANG Senior Staff Engineer designing a listening comprehension exercise.
Generate a highly realistic technical conversation or monologue tailored to a Software Engineer based on the following specific scenario:

SCENARIO: {topic}

Their English proficiency is expected to be CEFR {level}.

Return ONLY a JSON object matching this exact schema (do not wrap in markdown):
{{
  "title": "Short title (e.g. System Design Interview)",
  "context": "Context of the audio (e.g. An interviewer is asking about scaling databases)",
  "dialogue": [
    {{ "speaker": "Interviewer", "gender": "male", "text": "Can you explain how you would shard a relational database?", "idiomHighlight": {{ "word": "shard", "meaning": "To split a database into smaller, faster, more manageable parts called shards." }} }},
    {{ "speaker": "Candidate", "gender": "female", "text": "Sure, sharding involves..." }}
  ],
  "questions": [
    {{
      "id": "q1",
      "text": "What is the primary benefit of sharding discussed here?",
      "options": [
        {{ "id": "o1", "text": "Option 1", "isCorrect": true, "explanation": "Correct because..." }},
        {{ "id": "o2", "text": "Option 2", "isCorrect": false, "explanation": "Incorrect because..." }}
      ]
    }}
  ],
  "dictation": {{
    "correctText": "A challenging technical sentence from the dialogue.",
    "textWithBlanks": "A challenging ____ sentence from the ____.",
    "answers": ["technical", "dialogue"]
  }},
  "shadowing": {{
    "text": "The entire sentence for context.",
    "translation": "The translation of the sentence.",
    "targetText": "The key phrase to practice speaking."
  }}
}}"""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            temperature=0.7,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": "Generate a new listening scenario."
            }]
        )
        raw = response.content[0].text
        try:
            scenario_data = extract_json(raw)
            import random
            for q in scenario_data.get("questions", []):
                if "options" in q:
                    random.shuffle(q["options"])
            return {"scenario": scenario_data}
        except (json.JSONDecodeError, ValueError) as e:
            print("FAILED TO PARSE JSON. RAW OUTPUT:")
            print(raw)
            raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
