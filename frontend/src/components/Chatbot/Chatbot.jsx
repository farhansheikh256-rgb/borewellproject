import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { useLocation } from 'react-router-dom';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about the borewell manuals.", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Only show on home (/) and dashboard (/admin/dashboard)
  const isVisible = location.pathname === '/' || location.pathname.startsWith('/admin/dashboard');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  if (!isVisible) return null;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      // The RAG server runs on port 3000
      const res = await fetch(`http://${window.location.hostname}:3000/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // You can add file_filter: "borewell.pdf" here if needed
        body: JSON.stringify({ question: userMsg }) 
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      
      setMessages(prev => [...prev, { text: data.answer || "I don't know the answer to that.", isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Error connecting to the RAG server. Is it running on port 3000?", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window glass-card">
          <div className="chatbot-header">
            <h4>Borewell Assistant</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble bot typing">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="chatbot-input">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask a question..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>↑</button>
          </form>
        </div>
      ) : (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}
