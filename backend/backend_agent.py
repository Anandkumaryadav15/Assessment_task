class BackendAgent:
    """
    The Backend Agent processes task requests and handles the state
    of the interaction (e.g., asking for clarification or completing the task).
    """
    
    def handle_request(self, action: str, topic: str = None, tone: str = None):
        print(f"Backend Agent processing action: {action}")
        
        if action == "init":
            if topic:
                return {
                    "status": "need_info",
                    "message": f"I can help generate a blog about '{topic}'. What tone would you like? (e.g., formal, casual, humorous)"
                }
            else:
                return {
                    "status": "error",
                    "message": "Please provide a topic."
                }
                
        elif action == "clarify":
            if not topic or not tone:
                return {
                    "status": "error",
                    "message": "Missing topic or tone."
                }
                
            # Simulate text generation (this is where an LLM model would go)
            generated_blog = (
                f"Here is your {tone} blog post about {topic}:\n\n"
                f"# The Future of {topic}\n\n"
                f"As we navigate the modern landscape, {topic.lower()} has emerged as a crucial area of focus. "
                f"Taking a {tone.lower()} approach, we can see that adapting to these changes is not just beneficial, "
                f"but necessary for growth. The key takeaway is to embrace the possibilities."
            )
            
            return {
                "status": "done",
                "message": "Blog generation complete.",
                "result": generated_blog
            }
        
        else:
            return {
                "status": "error",
                "message": "Unknown action."
            }
