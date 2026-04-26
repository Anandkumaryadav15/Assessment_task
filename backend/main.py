from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend_agent import BackendAgent

app = FastAPI(title="Backend Agent API")

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskRequest(BaseModel):
    action: str  # "init" or "clarify"
    topic: Optional[str] = None
    tone: Optional[str] = None

class TaskResponse(BaseModel):
    status: str  # "need_info" or "done" or "error"
    message: str
    result: Optional[str] = None

agent = BackendAgent()

@app.post("/api/task", response_model=TaskResponse)
async def handle_task(request: TaskRequest):
    # Delegate logic to Backend Agent
    response = agent.handle_request(request.action, request.topic, request.tone)
    
    if response["status"] == "error" and response["message"] == "Unknown action.":
        raise HTTPException(status_code=400, detail="Unknown action")
        
    return TaskResponse(
        status=response["status"],
        message=response["message"],
        result=response.get("result")
    )

