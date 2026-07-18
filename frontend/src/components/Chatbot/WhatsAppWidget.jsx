import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // You can update this to your actual WhatsApp number
  const whatsappNumber = '918830251172'; 

  const toggleWidget = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Create the WhatsApp API URL with the pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
    
    // Open in a new tab
    window.open(url, '_blank');
    
    // Clear message and optionally close widget
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="wa-widget-container">
      {/* Phone Floating Button */}
      <a href="tel:+918830251172" className="phone-widget-button" aria-label="Call Us">
        <FaPhoneAlt className="phone-icon" />
      </a>

      {/* Floating Button */}
      <button 
        className={`wa-widget-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleWidget}
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp className="wa-icon" />}
      </button>

      {/* Chat Box Modal */}
      {isOpen && (
        <div className="wa-widget-box slide-up">
          <div className="wa-widget-header">
            <div className="wa-header-info">
              <FaWhatsapp className="wa-header-icon" />
              <div>
                <h3>Chat with us on WhatsApp</h3>
                <span className="wa-status">Typically replies instantly</span>
              </div>
            </div>
            <button onClick={toggleWidget} className="wa-close-btn"><FaTimes /></button>
          </div>

          <div className="wa-widget-body">
            <div className="wa-message-bubble">
              <p>Hi there! 👋</p>
              <p>How can we help you today? Please type your message below and we'll get back to you on WhatsApp.</p>
              <span className="wa-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <form onSubmit={handleSend} className="wa-widget-input">
            <textarea
              placeholder="Your message or enquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="2"
              required
            />
            <button type="submit" disabled={!message.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
