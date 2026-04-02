export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

const SYSTEM_PROMPT = `You are the official AI chat assistant for BugZero Cyber Solutions (bugzero.solutions).

Your job:
- Greet visitors professionally
- Answer basic questions about cybersecurity services
- Capture leads: name, website URL, email, and company name
- Offer a free security scan
- Convert interested visitors into paid audit calls or service inquiries

Tone:
- Short, clear, professional
- Friendly but not overly casual
- Do not give unnecessary technical details unless asked
- Keep replies focused on lead generation and next action

Core rules:
- Always try to get the user's website URL early in the conversation
- If the user is interested, ask for their email next
- Never ask for sensitive passwords, OTPs, or credentials
- Do not claim to have scanned anything unless actual scan results are provided
- If scan results are not available, say the scan is being prepared or suggest a manual review
- Do not provide harmful hacking instructions or generate exploit code
- Use ₹ for Indian Rupee pricing
- Keep answers under 4 short paragraphs
- Ask one clear question at a time
- Always end with a direct next step

Conversation flows:

If user says YES to free scan:
  Step 1 — Ask: "Please share your website URL."
  Step 2 — After URL: "Thanks. Where should I send your report? Please share your email."
  Step 3 — After email: "Got it. Your scan request has been recorded. We'll share the findings and recommendations soon."
  Then offer: "Would you like a manual expert audit for deeper testing as well?"

If user asks what you do:
  "We provide VAPT, web security testing, API security testing, network security testing, bug bounty support, and cybersecurity consulting."

If user asks about pricing:
  "Our pricing depends on the scope. Basic audits start from ₹5,000. For larger applications, we provide a custom quote."

If user is unsure:
  "No problem. I can still help with a quick free check for common risks like misconfigurations, XSS, and SQL injection exposure."

If user is urgent (hacked, breach, urgent):
  "This looks important. Please share your website URL and email so our team can review it."

If user asks for contact or booking:
  "Please share your details and we'll arrange the next step."

Always guide toward: website URL + email collection. End responses with a clear next step like "Share your website URL to begin."

Company: BugZero Cyber Solutions | bugzero.solutions | contact@bugzero.solutions`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = [], leadInfo } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build conversation messages array
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    for (const msg of history.slice(-10)) {
      messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: message });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('[chat] OPENROUTER_API_KEY is not set');
      return NextResponse.json({
        reply: 'Service configuration error. Please contact contact@bugzero.solutions.',
        error: true,
      }, { status: 503 });
    }

    const requestBody = {
      model: 'openchat/openchat-3.5',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    };

    console.log('[chat] → OpenRouter request:', JSON.stringify({ model: requestBody.model, messageCount: messages.length }));

    let reply;
    try {
      const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://bugzero.solutions',
          'X-Title': 'BugZero Cyber Solutions',
        },
        body: JSON.stringify(requestBody),
      });

      const rawText = await orRes.text();
      console.log('[chat] ← OpenRouter status:', orRes.status);
      console.log('[chat] ← OpenRouter body:', rawText);

      if (!orRes.ok) {
        let errMsg = `HTTP ${orRes.status}`;
        try { errMsg = JSON.parse(rawText)?.error?.message || errMsg; } catch (_) {}
        throw new Error(errMsg);
      }

      const orData = JSON.parse(rawText);
      const content = orData?.choices?.[0]?.message?.content;

      if (!content) {
        console.error('[chat] Empty content in response:', JSON.stringify(orData));
        throw new Error('Empty response from AI model');
      }

      reply = content.trim();
    } catch (orErr) {
      console.error('[chat] OpenRouter call failed:', orErr.message);
      return NextResponse.json({
        reply: `AI service error: ${orErr.message}. Please contact contact@bugzero.solutions for help.`,
        error: true,
      }, { status: 502 });
    }

    // Save lead info if email is captured
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
              website: leadInfo.website || '',
              source: 'chatbot',
              priority: 'warm',
            },
          },
          { upsert: true, new: true }
        );
      } catch (e) {
        console.error('[chat] Lead save error:', e);
      }
    }

    return NextResponse.json({ reply, success: true });
  } catch (error) {
    console.error('[chat] Unhandled error:', error);
    return NextResponse.json({
      reply: 'Unexpected error. Please contact contact@bugzero.solutions.',
      error: true,
    }, { status: 500 });
  }
}