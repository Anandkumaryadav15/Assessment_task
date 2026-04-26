import { useState, useRef, useEffect } from 'react';
import './index.css';
import { frontendAgent } from './FrontendAgent';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Frontend Agent',
      text: 'Hello! I am your AI Assistant. What can I help you with today?',
      type: 'agent'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'User',
      text: inputValue,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate Frontend Agent processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let payload;
      
      // Frontend Agent Logic: Determine action based on current state
      if (!topic) {
        // Assume this is an initial request, try to extract topic
        const extractedTopic = frontendAgent.extractTopic(inputValue);
        
        setTopic(extractedTopic);
        
        // Log Frontend Agent communication
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'Frontend Agent',
          text: `(System: Sending request to Backend Agent to initialize blog generation for topic: "${extractedTopic}")`,
          type: 'agent',
          isSystem: true
        }]);

        payload = frontendAgent.preparePayload('init', extractedTopic);
      } else {
        // We already have a topic, so this must be the clarification (tone)
        const tone = inputValue;
        
        // Log Frontend Agent communication
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'Frontend Agent',
          text: `(System: Sending clarification to Backend Agent. Tone: "${tone}")`,
          type: 'agent',
          isSystem: true
        }]);

        payload = frontendAgent.preparePayload('clarify', topic, tone);
      }


      // Call Backend Agent
      const response = await fetch('http://localhost:8000/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === 'need_info') {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'Backend Agent',
          text: data.message,
          type: 'agent'
        }]);
      } else if (data.status === 'done') {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'Backend Agent',
          text: data.result,
          type: 'agent',
          isResult: true
        }]);
        // Reset topic after completion to allow new tasks
        setTopic(null);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'Backend Agent',
          text: data.message || "An error occurred.",
          type: 'agent'
        }]);
        setTopic(null);
      }

    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        sender: 'System',
        text: 'Error: Could not connect to the Backend Agent. Is the FastAPI server running?',
        type: 'agent'
      }]);
      setTopic(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>✨ AI Agent Assistant</h1>
      </div>
      
      <div className="chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-sender">{msg.sender}</div>
            <div className="message-bubble" style={msg.isSystem ? { fontStyle: 'italic', opacity: 0.8, fontSize: '0.85rem' } : {}}>
              {msg.isResult ? (
                <div className="blog-content">{msg.text}</div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={topic ? "Enter tone (e.g., formal, casual)..." : "Ask me to create a blog..."}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
