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
        messages = data.get("messages", [])
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,
            system=SCENARIO_PROMPTS.get(scenario, SCENARIO_PROMPTS["interview"]),
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