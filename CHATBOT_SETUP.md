# Mobile Armour AI Chatbot Setup Guide

## Overview
This guide will help you set up the AI-powered chatbot for Mobile Armour, a virtual assistant designed to help customers with mobile repair services, accessories, and shop information.

## Features
- **Smart Virtual Assistant**: Powered by OpenAI GPT-3.5-turbo
- **Mobile Repair Expertise**: Handles screen replacement, battery issues, charging ports, water damage queries
- **Accessory Recommendations**: Suggests cases, chargers, screen guards, headphones
- **Shop Information**: Provides store timings, warranty info, pickup/delivery options
- **Lead Collection**: Collects customer details for bookings and orders
- **WhatsApp Integration**: Redirects customers to WhatsApp for confirmations
- **Modern UI**: Beautiful floating chat widget with responsive design
- **Real-time Chat**: Instant responses with typing indicators

## Setup Instructions

### 1. Environment Configuration
1. Copy your `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your OpenAI API key to `.env.local`:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

### 2. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

### 3. Install Dependencies
The OpenAI SDK has already been installed. If you need to reinstall:
```bash
npm install openai
```

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Test the Chatbot
1. Open your website in the browser
2. Look for the floating chat button in the bottom-right corner
3. Click to open the chat window
4. Test with sample queries like:
   - "I need to repair my iPhone screen"
   - "Do you have cases for Samsung Galaxy?"
   - "What are your store timings?"
   - "I want to book a repair"

## Chatbot Behavior

### What the Chatbot Can Help With:
- **Mobile Repairs**: Screen replacement, battery issues, charging ports, water damage
- **Accessories**: Cases, chargers, screen guards, headphones, cables
- **Shop Info**: Store timings (10 AM - 9 PM daily), warranty details, pickup/delivery
- **Bookings**: Collect customer details for repair bookings
- **Product Orders**: Help customers order accessories
- **WhatsApp Redirect**: Guide customers to WhatsApp for confirmations

### Chatbot Personality:
- Friendly and conversational (sounds human, not robotic)
- Keeps responses short and clear (2-4 lines max)
- Uses simple, natural language
- Professional yet approachable
- Focused on converting interest to visits/WhatsApp inquiries

### Sample Interactions:
```
Customer: "My phone screen is cracked"
Bot: "I can help with that! We repair all iPhone and Android models. What's your phone model so I can give you an estimate?"

Customer: "iPhone 13"
Bot: "Great! iPhone 13 screen replacement typically costs ₹3,500-4,500. Would you like to book a repair? I can collect your details or you can confirm directly on WhatsApp: https://wa.me/919900604665"

Customer: "Do you have phone cases?"
Bot: "Yes! We have premium cases starting from ₹299. What phone model do you need a case for? I can recommend the best options!"
```

## File Structure
```
src/
├── app/
│   └── api/
│       └── chatbot/
│           └── route.ts          # OpenAI API integration
├── components/
│   └── chatbot/
│       ├── ChatBot.tsx           # Main chatbot component
│       └── ChatBot.css           # Chatbot styling
└── app/
    └── layout.tsx                # Updated to include chatbot
```

## Customization

### Modify Chatbot Responses
Edit the system prompt in `/src/app/api/chatbot/route.ts`:
```typescript
const MOBILE_ARMOUR_SYSTEM_PROMPT = `
// Customize the chatbot's behavior, tone, and knowledge here
`;
```

### Update Shop Information
Update these details in the system prompt:
- Store timings
- WhatsApp number
- Pricing information
- Services offered
- Location details

### Styling Customization
Modify `/src/components/chatbot/ChatBot.css` to:
- Change colors and branding
- Adjust chat window size
- Modify animations
- Update mobile responsiveness

## Troubleshooting

### Common Issues:

1. **Chatbot not responding**
   - Check if OpenAI API key is correctly set in `.env.local`
   - Verify API key has sufficient credits
   - Check browser console for errors

2. **Chat widget not appearing**
   - Ensure ChatBot component is imported in layout.tsx
   - Check for CSS conflicts
   - Verify the component is rendered after other elements

3. **API errors**
   - Check OpenAI API status
   - Verify API key permissions
   - Check rate limits

### Debug Mode:
Open browser developer tools and check the Console tab for any error messages.

## Production Deployment

### Environment Variables:
Ensure your production environment has:
```env
OPENAI_API_KEY=your_production_openai_api_key
```

### Performance Considerations:
- The chatbot uses GPT-3.5-turbo for cost efficiency
- Responses are limited to 150 tokens to keep them concise
- Conversation history is maintained for context

## Security Notes:
- API key is server-side only (not exposed to client)
- Rate limiting is handled by OpenAI
- No sensitive customer data is stored in chat history
- WhatsApp redirect ensures secure communication for bookings

## Support
For technical issues or customization requests, contact the development team.

---

**Mobile Armour AI Chatbot** - Enhancing customer experience with intelligent assistance! 🤖📱
