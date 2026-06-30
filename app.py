from fastapi import FastAPI, HTTPException, File, UploadFile, Response
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.staticfiles import StaticFiles
load_dotenv()

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    level: str
    history: list

class SpeakRequest(BaseModel):
    text: str

@app.get("/ping")
def root():
    return {"message": "hello"}

@app.post("/chat")
def request(body: ChatRequest):
    if body.level not in ["beginner", "intermediate", "advanced"]:
        raise HTTPException(status_code=400, detail="Invalid level")
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    if len(body.message) > 500:
        raise HTTPException(status_code=400, detail="Message cannot exceed 500 characters")
    prompt_path = f"api/prompts/system_{body.level}.md"
    with open(prompt_path, "r") as f:
        prompt = f.read()
    response = client.chat.completions.create(
        max_tokens=200,
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": prompt}] + body.history[-6:] + [{"role": "user", "content": body.message}]
    )
    return response.choices[0].message.content

@app.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    audio_bytes = await audio.read()
    result = client.audio.transcriptions.create(model="whisper-1", file=(audio.filename, audio_bytes, "audio/webm"))
    return result.text

@app.post("/speak")
async def speak(body: SpeakRequest):
    answer = client.audio.speech.create(model="gpt-4o-mini-tts", voice="sage", input=body.text, instructions="Warm, energetic, youthful energy, clear articulate")
    return Response(content=answer.content, media_type="audio/mpeg")

app.mount("/", StaticFiles(directory="public", html=True), name="static")

