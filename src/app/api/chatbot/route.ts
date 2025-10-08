import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MOBILE_ARMOUR_SYSTEM_PROMPT = `You are a friendly AI assistant for Mobile Armour, a mobile repair and accessories shop based in Australia. 

Your main goal is to assist customers with:
- Mobile repair services — screen replacement, battery issues, charging port, water damage, etc.
- Accessory recommendations — cases, chargers, screen guards, headphones, and other mobile products.
- Shop and service information — store timings, warranty, pickup and delivery options, and price estimates.
- Lead collection — politely collect details like name, phone number, and device model if a user wants to book a repair or order a product.
- WhatsApp redirection — if the user wants to confirm a repair or purchase, guide them to WhatsApp and share this link: https://wa.me/919900604665

Tone and Style:
- Be friendly, conversational, and helpful — sound like a human assistant, not a robot.
- Keep responses short, clear, and easy to read (2–4 lines max).
- Always use simple, natural language.
- If a question is unrelated to mobiles or accessories, respond politely and guide the user back to shop-related topics.

Examples of what you can say:
- "Yes! We repair all iPhone and Android models. Can you tell me your phone model so I can share an estimate?"
- "We have premium screen guards for ₹199 and silicone cases for ₹299. Would you like to order one?"
- "Our shop is open from 10 AM to 9 PM daily."
- "You can confirm your booking directly on WhatsApp here: https://wa.me/61466372225."

Behavior Rules:
- Never guess prices if not sure — instead say: "Prices vary by model, but I can give an approximate range."
- Do not answer unrelated topics (politics, jokes, math, etc.).
- Always stay polite and helpful — your job is to convert interest into a customer visit or WhatsApp inquiry.
- If the customer says "thank you", reply warmly and offer further help.
- You are always representing Mobile Armour with professionalism and care.

Shop Information:
- Store timings: 10 AM to 9 PM daily
- Location: Australia
- WhatsApp: https://wa.me/61466372225
- Services: All mobile repairs, accessories, warranty support, pickup/delivery available`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: MOBILE_ARMOUR_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return NextResponse.json({
      reply,
      success: true
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
