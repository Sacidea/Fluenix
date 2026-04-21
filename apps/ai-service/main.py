from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from dotenv import load_dotenv
import os
import traceback

load_dotenv()

app = FastAPI(title="Fluenix AI Service")
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SCENARIO_PROMPTS = {
    "interview": """You are an experienced FAANG technical interviewer. 
    Conduct a realistic technical interview in English.
    Ask one question at a time. Be professional but friendly.""",
    "standup": """You are a Scrum Master running a daily standup meeting.
    Ask the developer about yesterday's work, today's plan, and any blockers.""",
    "code_review": """You are a senior software engineer doing a code review.
    Ask the developer to explain their code choices."""
}

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "fluenix-ai",
        "api_key_set": bool(os.getenv("ANTHROPIC_API_KEY"))
    }

@app.post("/scenario/chat")
async def scenario_chat(data: dict):
    try:
        scenario = data.get("scenario", "interview")
        level = data.get("level", "B2")
        messages = data.get("messages", [])
        
        base_prompt = SCENARIO_PROMPTS.get(scenario, SCENARIO_PROMPTS["interview"])
        level_instruction = f"\n\nIMPORTANT: The user is at a CEFR {level} English proficiency level. Strictly adjust your language complexity, vocabulary, and expectations to match the {level} level."
        
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,
            system=base_prompt + level_instruction,
            messages=messages
        )
        return {"reply": response.content[0].text}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/writing/analyze")
async def analyze_writing(data: dict):
    try:
        exercise = data.get("exercise", "pr_description")
        text = data.get("text", "")
        prompt = data.get("prompt", "")
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1000,
            system="""You are a technical English writing coach for software developers.
            Analyze the writing and return ONLY a JSON object with these exact fields:
            {
              "clarity_score": <0-100>,
              "technical_score": <0-100>,
              "overall_score": <0-100>,
              "strengths": ["...", "..."],
              "improvements": ["...", "..."],
              "overall_feedback": "2-3 sentences"
            }
            Return only the JSON, no extra text, no markdown.""",
            messages=[{
                "role": "user",
                "content": f"Task: {prompt}\n\nUser's writing:\n{text}"
            }]
        )
        return {"feedback": response.content[0].text}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scenario/analyze")
async def analyze_scenario(data: dict):
    try:
        messages = data.get("messages", [])
        scenario = data.get("scenario", "interview")
        level = data.get("level", "B2")

        transcript = "\n".join([
            f"{'AI' if m['role'] == 'assistant' else 'User'}: {m['content']}"
            for m in messages
        ])

        system_prompt="""You are a technical English coach for software developers.
        The user is targeting a CEFR {LEVEL} English proficiency level. Evaluate them strictly based on {LEVEL} standards.
        Analyze the conversation and return ONLY a JSON object:
        {
          "fluency_score": <0-100>,
          "vocabulary_score": <0-100>,
          "technical_accuracy": <0-100>,
          "overall_score": <0-100>,
          "strengths": ["...", "..."],
          "improvements": ["...", "..."],
          "overall_feedback": "2-3 sentences"
        }
        Return only the JSON, no markdown, no extra text."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=800,
            system=system_prompt.replace("{LEVEL}", level),
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
async def analyze_pronunciation(data: dict):
    try:
        transcript = data.get("transcript", "")
        target_word = data.get("target_word", "")
        level = data.get("level", "B2")
        
        system_prompt = f"""You are a technical English pronunciation coach for software developers.
        The user is targeting a CEFR {level} English proficiency level. Compare the user's spoken transcript with the target word/phrase.
        Evaluate them based on {level} expectations:
        - If {level} is Beginner/A1/A2, be very forgiving, focus on basic intelligibility, and reply in simple, highly encouraging English.
        - If {level} is B1/B2, focus on correct syllable stress, clarity, and intermediate phonetic correctness.
        - If {level} is C1/C2, be extremely strict, focusing on advanced phonetics, tongue placement, native-like articulation, and precise intonation.
        Return ONLY a JSON object:
        {{
          "accuracy_score": <0-100>,
          "is_correct": <true/false>,
          "feedback": "2-3 sentences of feedback tailored to the {level} strictness guidelines.",
          "tip": "one precise pronunciation tip tailored to the {level} level."
        }}
        Return only the JSON, no markdown, no extra text."""

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=600,
            system=system_prompt,
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
    