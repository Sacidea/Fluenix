from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Fluenix AI Service")
client = Anthropic()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SCENARIO_PROMPTS = {
    "interview": """You are an experienced FAANG technical interviewer. 
    Conduct a realistic technical interview in English.
    Ask one question at a time. Be professional but friendly.
    Evaluate the candidate's technical knowledge and English communication skills.""",

    "standup": """You are a Scrum Master running a daily standup meeting.
    Ask the developer about: yesterday's work, today's plan, and any blockers.
    Keep it professional and time-boxed. Ask follow-up questions naturally.""",

    "code_review": """You are a senior software engineer doing a code review.
    Ask the developer to explain their code choices and architecture decisions.
    Be constructive but thorough in your questions."""
}

@app.get("/health")
def health():
    return {"status": "ok", "service": "fluenix-ai", "version": "1.0.0"}

@app.post("/scenario/chat")
async def scenario_chat(data: dict):
    scenario = data.get("scenario", "interview")
    messages = data.get("messages", [])

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=500,
        system=SCENARIO_PROMPTS.get(scenario, SCENARIO_PROMPTS["interview"]),
        messages=messages
    )
    return {"reply": response.content[0].text}

@app.post("/scenario/analyze")
async def analyze_response(data: dict):
    transcript = data.get("transcript", "")
    scenario = data.get("scenario", "interview")

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        system="""You are a technical English coach for software developers.
        Analyze the speech and return a JSON object with these exact fields:
        {
          "fluency_score": <0-100>,
          "vocabulary_score": <0-100>,
          "technical_accuracy": <0-100>,
          "overall_score": <0-100>,
          "strengths": ["...", "..."],
          "improvements": ["...", "..."],
          "overall_feedback": "..."
        }
        Return only the JSON, no extra text.""",
        messages=[{
            "role": "user",
            "content": f"Scenario: {scenario}\nTranscript: {transcript}"
        }]
    )
    return {"analysis": response.content[0].text}