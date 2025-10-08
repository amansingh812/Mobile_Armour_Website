'use client';

import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Welcome to Mobile Armour! 👋 I\'m here to help you with mobile repairs, accessories, and any questions about our services. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show a teaser bubble on first visit in this session
  useEffect(() => {
    try {
      const shown = typeof window !== 'undefined' && sessionStorage.getItem('maChatTeaserShown');
      if (!shown) {
        const showTimer = setTimeout(() => setIsTeaserVisible(true), 1800);
        const hideTimer = setTimeout(() => setIsTeaserVisible(false), 10000);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch {}
  }, []);

  // Open chat and persist that teaser was shown
  const openChat = () => {
    setIsOpen(true);
    setIsTeaserVisible(false);
    try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch {}
  };

  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      setIsTeaserVisible(false);
      try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch {}
    }
  };

  // Convert URLs in plain text to clickable links
  const linkify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, idx) => {
      if (urlRegex.test(part)) {
        return (
          <a key={idx} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly on WhatsApp: https://wa.me/919900604665',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className={`chat-widget-button ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Teaser bubble */}
      <div className={`chat-teaser ${isTeaserVisible && !isOpen ? 'show' : ''}`} onClick={openChat}>
        <span>Hi! How can I help?</span>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <span>MA</span>
            </div>
            <div>
              <h4>Mobile Armour Assistant</h4>
              <span className="status">Online • Typically replies instantly</span>
            </div>
          </div>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{linkify(message.text)}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <div className="input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="powered-by">Powered by Mobile Armour AI</p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
