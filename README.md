# Agent Communication System

This project demonstrates a simple system where a Frontend Agent and a Backend Agent interact to fulfill a user request.

## Architecture

- **Frontend Agent (React + Vite)**: Provides a chat interface for the user. It intercepts user input, extracts intent (e.g., detecting the user wants a blog about a specific topic), and structures the request before sending it to the backend. It also relays clarification questions back to the user.
- **Backend Agent (FastAPI)**: Receives the structured task request. It evaluates the state of the task, requests clarification (e.g., the desired tone of the blog) if necessary, and ultimately generates the final response.

## Getting Started

### 1. Backend Setup
Navigate to the `backend` directory and install the required Python packages.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The FastAPI backend will start on `http://localhost:8000`.

### 2. Frontend Setup
Open a new terminal window, navigate to the `frontend` directory, and install dependencies.

```bash
cd frontend
npm install
npm run dev
```
The React frontend will start on `http://localhost:5173`.

## Example Interaction Flow

1. **User**: "Create a short blog on AI in hiring"
2. **Frontend Agent**: Extracts the topic ("AI in hiring") and sends `{"action": "init", "topic": "AI in hiring"}` to the backend.
3. **Backend Agent**: Determines tone is missing and replies with `{"status": "need_info", "message": "I can help generate a blog about 'AI in hiring'. What tone would you like? (e.g., formal, casual, humorous)"}`
4. **Frontend Agent**: Displays the clarification question to the user.
5. **User**: "Formal"
6. **Frontend Agent**: Sends `{"action": "clarify", "topic": "AI in hiring", "tone": "Formal"}` to the backend.
7. **Backend Agent**: Generates the blog and returns `{"status": "done", "result": "Here is your Formal blog..."}`
8. **Frontend Agent**: Displays the final output.

## Demo
Please refer to the attached demo video for a walkthrough of the system.
# Assessment_task
