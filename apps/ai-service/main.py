from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from dotenv import load_dotenv
import os
import traceback

load_dotenv()

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
import json

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

        # Check if client explicitly requested a stream via query or body
        # For backwards compatibility, if stream: true is passed, use StreamingResponse
        if data.get("stream", False):
            return StreamingResponse(sse_generator(), media_type="text/event-stream")
        else:
            # Non-streaming fallback
            response = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=4096,
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

        import json
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Generate a new writing mission for {{category}}."
            }]
        )
        raw = response.content[0].text
        clean = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        import traceback
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
            max_tokens=4096,
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

        system_prompt=f"""You are a technical English evaluator.
        The user is at CEFR {level}. Grade them based on the expectations for that level in a tech environment.
        Return ONLY a JSON object:
        {{
          "fluency_score": <0-100>,
          "vocabulary_score": <0-100>,
          "technical_accuracy": <0-100>,
          "overall_score": <0-100>,
          "strengths": ["...", "..."],
          "improvements": ["...", "..."],
          "overall_feedback": "2-3 sentences"
        }}
        Return only JSON."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Scenario: {scenario}\n\nConversation:\n{transcript}"
            }]
        )
        raw = response.content[0].text
        clean = raw.replace("```json", "").replace("```", "").strip()
        return {"analysis": clean}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pronunciation/analyze")
def analyze_pronunciation(data: dict):
    try:
        transcript = data.get("transcript", "")
        target_word = data.get("target_word", "")
        level = data.get("level", "B2")
        
        system_prompt = f"""You are a technical English pronunciation specialist.
        Compare transcript with target. Grade relative to CEFR {level} expectations.
        Return ONLY a JSON object:
        {{
          "accuracy_score": <0-100>,
          "is_correct": <true/false>,
          "feedback": "Professional feedback.",
          "tip": "Technical tip."
        }}
        Return only JSON."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=[{
                "type": "text",
                "text": system_prompt,
                "cache_control": {"type": "ephemeral"}
            }],
            extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            messages=[{
                "role": "user",
                "content": f"Target word: {target_word}\nUser said: {transcript}"
            }]
        )
        raw = response.content[0].text
        clean = raw.replace("```json", "").replace("```", "").strip()
        return {"result": clean}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/behavioral/generate")
def generate_behavioral(data: dict):
    try:
        level = data.get("level", "B2")
        
        system_prompt = f"""You are a FAANG Senior Engineering Manager preparing a behavioral interview.
Generate a realistic behavioral interview question for a software engineer.
Their English proficiency is expected to be CEFR {level}.

Return ONLY a JSON object matching this exact schema (do not wrap in markdown):
{{
  "question": {{
    "category": "e.g., Customer Obsession, Ownership, Dive Deep, Deliver Results",
    "context": "A brief 1-2 sentence context or expectation for why this question is being asked in a FAANG interview.",
    "question": "The actual behavioral interview question (e.g., 'Tell me about a time...')"
  }}
}}"""

        import json
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
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
        clean = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        import traceback
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
            max_tokens=4096,
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
        clean = raw.replace("```json", "").replace("```", "").strip()
        return {"analysis": clean}
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

        import json
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
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
        clean = raw.replace("```json", "").replace("```", "").strip()
        return {"scenario": json.loads(clean)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/listening/generate")
def generate_listening_scenario(data: dict):
    try:
        level = data.get("level", "B2")
        
        system_prompt = f"""You are a FAANG Senior Staff Engineer designing a listening comprehension exercise.
Generate a highly realistic technical conversation or monologue tailored to a Software Engineer.
Their English proficiency is expected to be CEFR {level}.

Return ONLY a JSON object matching this exact schema (do not wrap in markdown):
{{
  "title": "Short title (e.g. System Design Interview)",
  "context": "Context of the audio (e.g. An interviewer is asking about scaling databases)",
  "dialogue": [
    {{ "speaker": "Interviewer", "text": "Can you explain how you would shard a relational database?" }},
    {{ "speaker": "Candidate", "text": "Sure, sharding involves..." }}
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
  "dictation": [
    "A challenging technical sentence from the dialogue to dictate."
  ],
  "shadowing": [
    "A key phrase to practice speaking."
  ]
}}"""

        import json
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
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
        clean = raw.replace("```json", "").replace("```", "").strip()
        try:
            return {"scenario": json.loads(clean)}
        except json.JSONDecodeError as e:
            print("FAILED TO PARSE JSON. RAW OUTPUT:")
            print(raw)
            raise e
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
