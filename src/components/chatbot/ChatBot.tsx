'use client';

import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  issue: string;
  collected: boolean;
}

// Use a stable epoch date for SSR so server and client produce identical HTML.
// The real timestamp is set on the client after mount.
const INITIAL_TIMESTAMP = new Date(0);

const ChatBot: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Welcome to Mobile Armour! 👋 I\'m here to help you with mobile repairs, accessories, and any questions about our services. How can I assist you today?',
      sender: 'bot',
      timestamp: INITIAL_TIMESTAMP
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    issue: '',
    collected: false
  });
  const [lastSentSig, setLastSentSig] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // After hydration, patch the initial message timestamp to the real current time
  useEffect(() => {
    setIsMounted(true);
    setMessages(prev =>
      prev.map(msg =>
        msg.id === '1' && msg.timestamp.getTime() === 0
          ? { ...msg, timestamp: new Date() }
          : msg
      )
    );
  }, []);

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
    } catch { }
  }, []);

  // Open chat and persist that teaser was shown
  const openChat = () => {
    setIsOpen(true);
    setIsTeaserVisible(false);
    try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch { }
  };

  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      setIsTeaserVisible(false);
      try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch { }
    }
  };

  // Convert Markdown links [text](url), plain URLs, and bare phone numbers to clickable anchors
  const linkify = (text: string) => {
    const elements: React.ReactNode[] = [];
    const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let lastIndex = 0;

    // First, handle Markdown links
    let mdMatch: RegExpExecArray | null;
    while ((mdMatch = mdLinkRegex.exec(text)) !== null) {
      const [full, label, url] = mdMatch;
      const start = mdMatch.index;
      const end = start + full.length;

      if (start > lastIndex) {
        elements.push(text.slice(lastIndex, start));
      }

      elements.push(
        <a key={`md-${start}`} href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );

      lastIndex = end;
    }

    // Remaining text after last markdown link
    const remaining = text.slice(lastIndex);

    // Then, handle plain URLs inside the remaining text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let urlLastIndex = 0;
    let urlMatch: RegExpExecArray | null;
    while ((urlMatch = urlRegex.exec(remaining)) !== null) {
      const [url] = urlMatch;
      const start = urlMatch.index;
      const end = start + url.length;
      if (start > urlLastIndex) {
        elements.push(remaining.slice(urlLastIndex, start));
      }
      elements.push(
        <a key={`url-${lastIndex + start}`} href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      );
      urlLastIndex = end;
    }
    // Remaining after URL parsing — detect bare phone numbers (9-15 digits, optional + prefix)
    const rest = remaining.slice(urlLastIndex);
    const phoneRegex = /(\+?\d{9,15})/g;
    let phoneLastIndex = 0;
    let phoneMatch: RegExpExecArray | null;
    while ((phoneMatch = phoneRegex.exec(rest)) !== null) {
      const [raw] = phoneMatch;
      const start = phoneMatch.index;
      const end = start + raw.length;
      if (start > phoneLastIndex) {
        elements.push(rest.slice(phoneLastIndex, start));
      }
      const digitsOnly = raw.replace(/[^\d+]/g, '');
      const waUrl = `https://wa.me/${digitsOnly.replace(/^\+/, '')}`;
      elements.push(
        <a key={`wa-${lastIndex + urlLastIndex + start}`} href={waUrl} target="_blank" rel="noopener noreferrer">
          {raw}
        </a>
      );
      phoneLastIndex = end;
    }
    if (phoneLastIndex < rest.length) {
      elements.push(rest.slice(phoneLastIndex));
    }

    return elements;
  };


  // Extract lead information from conversation and return the updated object
  const extractLeadInfo = (userMessage: string, botResponse: string) => {
    // More flexible name patterns
    const nameRegex = /(?:my name is|i'm|i am|call me|name|i'm)\s+([a-zA-Z\s]+)/i;
    // Simple name extraction - if it's a single word response after asking for name
    const simpleNameRegex = /^([a-zA-Z]{2,20})$/;

    const phoneRegex = /(\+?[\d\s\-\(\)]{8,15})/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    // Enhanced brand/model detection including iPad
    const knownBrands = ['apple', 'iphone', 'ipad', 'samsung', 'galaxy', 'xiaomi', 'mi', 'redmi', 'oneplus', 'google', 'pixel', 'oppo', 'vivo', 'motorola', 'realme', 'nokia', 'sony', 'huawei'];

    let newLeadData = { ...leadData };
    let updated = false;
    let identityChanged = false;

    // Extract name - enhanced patterns for combined responses
    if (!newLeadData.name) {
      const botAskedForName = botResponse.toLowerCase().includes('name') ||
        messages.some(m => m.sender === 'bot' && m.text.toLowerCase().includes('name'));

      let nameMatch = userMessage.match(nameRegex);

      // If bot asked for name and user gave simple response, try simple pattern
      if (!nameMatch && botAskedForName) {
        nameMatch = userMessage.match(simpleNameRegex);
      }

      // Try to extract name from combined response like "aman sing@gmail.com 9900523423"
      if (!nameMatch) {
        const combinedMatch = userMessage.match(/^([a-zA-Z\s]+)\s+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (combinedMatch) {
          nameMatch = [combinedMatch[0], combinedMatch[1]];
        }
      }

      // If still no match, try extracting the first word when bot asked for name
      // e.g. user typed "aman andnumber" — first word is the name
      if (!nameMatch && botAskedForName) {
        const firstWordMatch = userMessage.match(/^([a-zA-Z]{2,20})\b/);
        if (firstWordMatch) {
          nameMatch = [firstWordMatch[0], firstWordMatch[1]];
        }
      }

      // Last resort: look at the bot's reply for a confirmation like "Thank you, Aman!"
      if (!nameMatch) {
        const botConfirmMatch = botResponse.match(
          /(?:thank you|thanks|great|hi|hello|hey)[,!\s]+([A-Z][a-z]{1,19})\b/
        );
        if (botConfirmMatch) {
          nameMatch = [botConfirmMatch[0], botConfirmMatch[1]];
        }
      }

      if (nameMatch) {
        let foundName = nameMatch[1].trim();

        // Clean up the name if it includes extra details
        const stopWords = [' and ', ' email', ' phone', ' is my', ' my '];
        for (const word of stopWords) {
          const index = foundName.toLowerCase().indexOf(word);
          if (index !== -1) {
            foundName = foundName.substring(0, index).trim();
          }
        }

        if (leadData.collected && leadData.name && leadData.name.toLowerCase() !== foundName.toLowerCase()) {
          identityChanged = true;
        }
        newLeadData.name = foundName;
        updated = true;
      }
    }

    // Extract phone - more flexible
    if (!newLeadData.phone) {
      // Look for phone numbers in various formats
      const phoneMatch = userMessage.match(phoneRegex) ||
        userMessage.match(/(\d{10})/); // Simple 10-digit number
      if (phoneMatch) {
        const foundPhone = phoneMatch[1].replace(/[\s\-\(\)]/g, '');
        if (leadData.collected && leadData.phone && leadData.phone !== foundPhone) {
          identityChanged = true;
        }
        newLeadData.phone = foundPhone;
        updated = true;
      }
    }

    // Extract email - enhanced to get full email from combined responses
    if (!newLeadData.email) {
      // First try to get full email including name part
      const fullEmailMatch = userMessage.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (fullEmailMatch) {
        newLeadData.email = fullEmailMatch[0];
        updated = true;
      }
    }

    // Extract brand/model - enhanced detection
    if (!newLeadData.brand || !newLeadData.model) {
      const lower = userMessage.toLowerCase();
      const words = lower.split(/[^a-z0-9+]+/i);

      // Brand detection
      const brandFound = words.find(w => knownBrands.includes(w));
      if (brandFound && !newLeadData.brand) {
        newLeadData.brand = brandFound === 'ipad' ? 'Apple iPad' : brandFound;
        updated = true;
      }

      // Model detection - enhanced for iPad and other devices
      if (!newLeadData.model) {
        // iPad models
        if (lower.includes('ipad')) {
          const ipadMatch = userMessage.match(/ipad\s*(air|pro|mini|\d+)?/i);
          if (ipadMatch) {
            newLeadData.model = ipadMatch[0].trim();
            if (!newLeadData.brand) newLeadData.brand = 'Apple iPad';
            updated = true;
          }
        }
        // iPhone models
        else if (lower.includes('iphone')) {
          const iphoneMatch = userMessage.match(/iphone\s*(\d+\s*(pro|plus|mini)?)/i);
          if (iphoneMatch) {
            newLeadData.model = iphoneMatch[0].trim();
            if (!newLeadData.brand) newLeadData.brand = 'Apple';
            updated = true;
          }
        }
        // General model patterns
        else {
          const modelMatch = userMessage.match(/(\b(\w+\s)?(\d{1,3}[a-z]?|[a-z]{1,3}\d{1,3}|pro\s?max|ultra|air|mini)\b)/i);
          if (modelMatch) {
            newLeadData.model = modelMatch[0].trim();
            updated = true;
          }
        }
      }
    }

    // Extract issue - more comprehensive
    if (!newLeadData.issue && userMessage.length > 5) {
      const issueKeywords = [
        'repair', 'fix', 'broken', 'problem', 'issue', 'screen', 'battery', 'charging',
        'crack', 'cracked', 'damage', 'not working', 'assistance',
        // water / liquid damage
        'water', 'liquid', 'wet', 'dropped', 'splash', 'spill',
        // hardware components
        'speaker', 'mic', 'microphone', 'camera', 'button', 'port', 'jack', 'headphone',
        'volume', 'power', 'home', 'face id', 'touch id', 'fingerprint',
        // display / touch
        'display', 'touch', 'glass', 'shattered', 'black screen', 'white screen',
        // connectivity / software
        'wifi', 'bluetooth', 'signal', 'sim', 'imei', 'software', 'update', 'boot',
        // general
        'slow', 'heating', 'hot', 'overheat', 'virus', 'unlock', 'password',
      ];
      const lowerMsg = userMessage.toLowerCase();
      if (issueKeywords.some(keyword => lowerMsg.includes(keyword))) {
        newLeadData.issue = userMessage;
        updated = true;
      }
      // Also capture as issue if the bot previously asked about the problem/device
      if (!newLeadData.issue) {
        const botAskedAboutIssue = messages.some(m =>
          m.sender === 'bot' && (
            m.text.toLowerCase().includes('issue') ||
            m.text.toLowerCase().includes('problem') ||
            m.text.toLowerCase().includes('help') ||
            m.text.toLowerCase().includes('assist') ||
            m.text.toLowerCase().includes('repair')
          )
        );
        if (botAskedAboutIssue && userMessage.length > 3) {
          newLeadData.issue = userMessage;
          updated = true;
        }
      }
    }

    // If identity (name/phone) changed after a previous submission, reset lead to start a new record
    if (identityChanged) {
      newLeadData = {
        name: newLeadData.name || '',
        phone: newLeadData.phone || '',
        email: '',
        brand: '',
        model: '',
        issue: '',
        collected: false,
      };
    }

    if (updated || identityChanged) {
      setLeadData(newLeadData);
      console.log('Lead data updated:', newLeadData);
      // Check if we have enough info to send to Google Sheets - more flexible conditions
      const sig = `${newLeadData.name}|${newLeadData.phone}|${newLeadData.email}|${newLeadData.brand}|${newLeadData.model}|${newLeadData.issue}`;
      // Send as soon as we have a contact method (phone or email) — name/issue are bonus
      const hasMinimumData = !!(newLeadData.phone || newLeadData.email);
      if (hasMinimumData && sig !== lastSentSig) {
        console.log('Auto-sending lead to sheets (flexible conditions):', newLeadData);
        sendLeadToGoogleSheets(newLeadData);
      }
    }
    return newLeadData;
  };


  // Send lead data to Google Sheets
  const sendLeadToGoogleSheets = async (lead: LeadData) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'ENQUIRY',
          data: {
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            brand: lead.brand,
            model: lead.model,
            message: lead.issue
          }
        }),
      });

      if (response.ok) {
        const sig = `${lead.name}|${lead.phone}|${lead.email}|${lead.brand}|${lead.model}|${lead.issue}`;
        setLeadData(prev => ({ ...prev, collected: true }));
        setLastSentSig(sig);
        console.log('Lead data sent to Google Sheets successfully');

        // Send email notification to store owner — same flow as the contact form
        try {
          await fetch('/api/send-lead-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'ENQUIRY',
              data: {
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                brand: lead.brand,
                model: lead.model,
                message: lead.issue
              }
            }),
          });
          console.log('Lead email notification sent successfully');
        } catch (emailError) {
          console.error('Failed to send lead email notification:', emailError);
        }
      }
    } catch (error) {
      console.error('Failed to send lead data:', error);
    }
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
    const currentInput = inputMessage;
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
          message: currentInput,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Extract lead info first and possibly auto-send
        const updatedLead = extractLeadInfo(currentInput, data.reply);


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
        text: 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly on WhatsApp: https://wa.me/61466372225',
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
    // Don't render time during SSR — only show after client mount to avoid hydration mismatch
    if (!isMounted || date.getTime() === 0) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className={`chat-widget-button ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Teaser bubble */}
      <div
        className={`chat-teaser ${isTeaserVisible && !isOpen ? 'show' : ''}`}
        onClick={openChat}
      >
        <div className="teaser-content">
          {/* Avatar/Icon - Mbot icon */}
          <div className="mbot-icon-placeholder">
            <img src="/img/bot.png" alt="Mobile Armour chat assistant" loading="lazy" width={40} height={40} />
          </div>

          <div className="teaser-text-area">
            <div className="teaser-main-text">
              <span role="img" aria-label="waving hand">👋</span>
              &nbsp;Need Any help ?
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <img src="/img/bot.png" alt="Mobile Armour chat assistant" loading="lazy" width={40} height={40} />
            </div>
            <div>
              <h4>Mobile Armour Assistant</h4>
              <span className="status">Online • Typically replies instantly</span>
            </div>
          </div>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          <div className="chat-input-container">
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
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
