import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are BugZero's AI cybersecurity assistant. You are helpful, professional, and knowledgeable.

Company: BugZero Cyber Solutions (bugzero.solutions)
DPIIT Recognized Startup | ISO 27001 Compliant | NASSCOM Member

Services & Pricing:
1. Web Application VAPT - Starting ₹25,000
2. API Security Testing - Starting ₹20,000
3. Network Security Assessment - Starting ₹35,000
4. Cloud Security Audit (AWS/Azure/GCP) - Starting ₹40,000
5. Mobile App Security (Android/iOS) - Starting ₹30,000
6. Bug Bounty Program Management - Custom pricing
7. Security Code Review - Custom pricing
8. Database Security Assessment - Custom pricing
9. Security Consulting & Compliance (ISO 27001, SOC 2, PCI DSS) - Custom pricing
10. Cybersecurity Internship Program - Contact for details

Pricing Tiers:
- Starter: ₹25,000/assessment (single app)
- Professional: ₹75,000/quarter (up to 3 apps + network)
- Enterprise: Custom annual contracts

Process:
1. Client contacts us
2. Free 30-min consultation
3. Scope definition & proposal
4. Security assessment (5-15 business days)
5. Detailed report with remediation guidance
6. Re-testing after fixes (included)

Team: 10+ CEH, OSCP, CISSP certified professionals
Clients: 50+ enterprises across banking, healthcare, government, fintech
Coverage: 15+ states in India

Rules:
- Always be helpful and professional
- Answer cybersecurity questions accurately
- If someone asks about pricing, give starting prices and suggest a free consultation
- Naturally try to capture their name, email, and company for follow-up
- If asked something unrelated, politely redirect to cybersecurity topics
- End responses with a relevant CTA (book consultation, visit /contact, etc.)
- Keep responses concise but informative (under 200 words)
- Use ₹ for Indian Rupee pricing
- Always end with a CTA to visit bugzero.solutions/contact`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = [], leadInfo } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build conversation messages
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    for (const msg of history.slice(-10)) {
      messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: message });

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    let reply;
    try {
      const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages,
        max_tokens: 500,
      });
      reply = completion.choices[0].message.content;
    } catch (groqErr) {
      console.error('Groq API error:', groqErr.message, groqErr.status, groqErr.error);
      reply = "I apologize, I'm experiencing a brief issue. Please try again in a moment, or contact us directly at contact@bugzero.solutions for immediate assistance.";
    }

    // Save lead info if provided
    if (leadInfo?.email) {
      try {
        await connectDB();
        await Lead.findOneAndUpdate(
          { email: leadInfo.email },
          {
            $setOnInsert: {
              name: leadInfo.name || 'Chatbot Lead',
              email: leadInfo.email,
              company: leadInfo.company || '',
              source: 'chatbot',
              priority: 'warm',
            },
          },
          { upsert: true, new: true }
        );
      } catch (e) {
        console.error('Lead save error:', e);
      }
    }

    return NextResponse.json({ reply, success: true });
  } catch (error) {
    console.error('POST /api/chat error:', error);
    return NextResponse.json({
      reply: "I apologize for the inconvenience. Please contact us directly at contact@bugzero.solutions or call us for immediate assistance.",
      error: true,
    });
  }
}
