Build a system where a user gives a task (example: “Create a short blog about AI in hiring”). The
Frontend Agent understands the request and communicates with the backend. The Backend Agent
processes the request and may ask for clarification (e.g., tone, length). The agents interact for a few
steps and then produce the final output.
Example Flow
User: Create a short blog on AI in hiring
Frontend Agent → Backend Agent: Generate blog
Backend Agent → Frontend Agent: What tone? (formal/casual)
Frontend Agent → Backend Agent: Formal
Backend Agent → Returns blog
Frontend Agent → Displays final result
Key Requirements
- Must have Frontend Agent + Backend Agent
- Must show 2–3 interactions between agents
- Final output can be simple (blog, messages, summary, etc.)
- Keep implementation simple and clean
Tech Stack
Frontend: React or simple JavaScript
Backend: FastAPI
Deliverables
- GitHub repository (frontend + backend)
- README with basic instructions
- Demo video showing the interaction
We are not expecting a complex system. We are looking for clear agent communication and simple
working logic.