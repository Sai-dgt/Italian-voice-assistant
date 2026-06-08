from fastapi import FastAPI ,HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()

app=FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ChatRequest(BaseModel):
    message:str
    level:str
    history:list

@app.get("/ping")
def root():
    return {"message":"hello"}


@app.post("/chat")
def request (body:ChatRequest):
  
  if body.level not in ["beginner","intermediate","advanced"]:
     raise HTTPException(status_code=400, detail="Invalid level")
  if not body.message.strip():
     raise HTTPException(status_code=400,detail="Message cannot be empty")
  if len(body.message)>500:
     raise HTTPException (status_code=400,detail="Message cannot exceed 500 characters")
  prompt_path=f"api/prompts/system_{body.level}.md"
  with open(prompt_path,"r") as f:
    prompt=f.read()
  
  response = client.chat.completions.create(
  max_tokens=200 , 
  model="gpt-4o-mini",
  messages=[{"role":"system","content":prompt}]+body.history[-5:]+[{"role":"user","content":body.message}]

  )

  return response.choices[0].message.content




