import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { useLocation } from 'react-router-dom';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Borewell Services! 👋", isBot: true },
    { text: "Please enter your phone number so we can assist you.", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat flow state
  const [step, setStep] = useState('ask_phone'); // 'ask_phone', 'ask_name', 'done'
  const [leadData, setLeadData] = useState({ phone: '', name: '' });

  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Show on home and dashboard
  const isVisible = location.pathname === '/' || location.pathname.startsWith('/admin/dashboard');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  if (!isVisible) return null;

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || step === 'done') return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    if (step === 'ask_phone') {
      // Basic validation for phone number
      if (userMsg.length < 8) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: "Please enter a valid phone number.", isBot: true }]);
        }, 500);
        return;
      }
      setLeadData(prev => ({ ...prev, phone: userMsg }));
      setStep('ask_name');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you! May I know your name?", isBot: true }]);
      }, 600);
    } 
    else if (step === 'ask_name') {
      const finalName = userMsg;
      const finalPhone = leadData.phone;
      setStep('done');
      setIsLoading(true);

      try {
        // Send lead to backend API
        const res = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: finalName,
            phone: finalPhone,
            serviceType: 'General Enquiry',
            description: 'Lead captured via website chat widget.',
          })
        });

        if (!res.ok) throw new Error("Failed to save lead");

        setMessages(prev => [...prev, { text: `Thanks ${finalName}! Our team will call you shortly at ${finalPhone}.`, isBot: true }]);
      } catch (error) {
        console.error("Lead capture error:", error);
        setMessages(prev => [...prev, { text: "Oops, something went wrong. Please try contacting us via the Contact page.", isBot: true }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window glass-card">
          <div className="chatbot-header">
            <h4>Borewell Support</h4>
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

          <form onSubmit={handleUserInput} className="chatbot-input">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={step === 'done' ? "Chat finished" : "Type your answer..."}
              disabled={isLoading || step === 'done'}
            />
            <button type="submit" disabled={isLoading || !input.trim() || step === 'done'}>↑</button>
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
