import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import api from '../../utils/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi there! 👋 Welcome to DoctorWater. How can we help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [askForPhone, setAskForPhone] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || leadCaptured) return;

    const userText = input.trim();
    setInput('');

    // Add user message to UI
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);

    // If we are currently asking for a phone number
    if (askForPhone) {
      // Basic phone number validation (10 digits + optional country code)
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      
      if (phoneRegex.test(userText)) {
        setLoading(true);
        try {
          // Save the lead to the backend
          await api.post('/chat/lead', {
            phoneNumber: userText,
            chatHistory: newMessages
          });
          
          setMessages(prev => [...prev, { 
            role: 'model', 
            text: 'Thank you! We have received your number. Our expert will contact you shortly on WhatsApp!' 
          }]);
          setLeadCaptured(true);
          setAskForPhone(false);
        } catch (error) {
          console.error("Error saving lead:", error);
          setMessages(prev => [...prev, { role: 'model', text: 'Sorry, there was an error saving your details. Please try again.' }]);
        } finally {
          setLoading(false);
        }
      } else {
        // Invalid phone number
        setMessages(prev => [...prev, { role: 'model', text: 'That does not look like a valid phone number. Please enter a valid 10-digit WhatsApp number.' }]);
      }
      return;
    }

    // Normal AI Chat flow
    setLoading(true);
    try {
      // Format history for Gemini (excluding the first greeting to save tokens if needed, but we'll send it)
      const historyForApi = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await api.post('/chat/message', {
        message: userText,
        history: historyForApi
      });

      if (res.data.success) {
        setMessages(prev => [...prev, { role: 'model', text: res.data.reply }]);
        // After every AI response (or just the first few), we trigger the phone number ask
        // The AI is instructed to ask for it, so we switch state to expect a phone number next
        setAskForPhone(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the server. Could you please provide your WhatsApp number so we can reach you?" }]);
      setAskForPhone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      {/* Floating Button */}
      <button 
        className={`chat-widget-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="chat-widget-box slide-up">
          <div className="chat-widget-header">
            <div className="chat-header-info">
              <h3>DoctorWater Support</h3>
              <span className="chat-status">🟢 Online</span>
            </div>
            <button onClick={toggleChat} className="chat-close-btn"><FaTimes /></button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message-wrapper ${msg.role}`}>
                <div className="chat-message">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message-wrapper model">
                <div className="chat-message typing">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-widget-input">
            <input
              type="text"
              placeholder={leadCaptured ? "Chat ended" : askForPhone ? "Enter WhatsApp number..." : "Type your message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || leadCaptured}
            />
            <button type="submit" disabled={!input.trim() || loading || leadCaptured}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
