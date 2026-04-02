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

function getRuleBasedReply(message) {
  const m = message.toLowerCase();

  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('namaste')) {
    return "Hello! I'm BugZero's AI Security Assistant. We help businesses find and fix security vulnerabilities before attackers do.\n\nWould you like a free security scan for your website? Share your URL to get started.";
  }
  if (m.includes('service') || m.includes('offer') || m.includes('what do you') || m.includes('what can')) {
    return "We provide:\n• VAPT (Vulnerability Assessment & Penetration Testing)\n• Web Application Security Testing\n• API Security Testing\n• Network Security Testing\n• Bug Bounty Program Support\n• Cybersecurity Consulting\n\nWhich service interests you? Share your website URL to begin.";
  }
  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('rate') || m.includes('fee') || m.includes('charge')) {
    return "Our pricing depends on scope:\n• Basic web audit: from ₹5,000\n• Full VAPT: custom quote\n• API security testing: from ₹8,000\n• Ongoing consulting: monthly retainers available\n\nShare your website URL and I'll help get you an accurate quote.";
  }
  if (m.includes('vapt') || m.includes('penetration') || m.includes('pentest')) {
    return "Our VAPT service covers:\n• Reconnaissance & information gathering\n• Vulnerability scanning\n• Manual exploitation testing\n• Detailed report with remediation steps\n\nPricing starts at ₹5,000 depending on scope. Share your website URL to get a custom quote.";
  }
  if (m.includes('free scan') || m.includes('free check') || m.includes('scan my') || m.includes('check my')) {
    return "We offer a free basic security check! To get started, please share your website URL. We'll look for common issues like misconfigurations, exposed endpoints, and known vulnerabilities.";
  }
  if (m.includes('hack') || m.includes('breach') || m.includes('compromised') || m.includes('attacked') || m.includes('urgent')) {
    return "This sounds urgent. Our team can help immediately.\n\nPlease share:\n1. Your website URL\n2. Your email address\n\nWe'll prioritize your case and respond as soon as possible.";
  }
  if (m.includes('contact') || m.includes('reach') || m.includes('email') || m.includes('phone') || m.includes('talk')) {
    return "You can reach us at:\n📧 contact@bugzero.solutions\n🌐 bugzero.solutions\n\nOr share your email here and we'll reach out to you directly.";
  }
  if (m.includes('team') || m.includes('who are') || m.includes('about you') || m.includes('experience')) {
    return "BugZero Cyber Solutions is a team of certified security professionals specializing in offensive security and vulnerability research. We help startups and enterprises protect their digital assets.\n\nWant to know more? Visit bugzero.solutions or share your website URL for a free scan.";
  }
  if (m.includes('started') || m.includes('get started') || m.includes('begin') || m.includes('how to')) {
    return "Getting started is simple:\n1. Share your website URL\n2. We run a free initial scan\n3. You receive a report with findings\n4. We discuss a remediation plan\n\nShare your website URL to begin right now.";
  }
  if (m.includes('report') || m.includes('result') || m.includes('finding')) {
    return "Our security reports include:\n• Executive summary (for non-technical stakeholders)\n• Detailed vulnerability list with CVSS scores\n• Step-by-step remediation guidance\n• Re-test verification after fixes\n\nShare your website URL to get started.";
  }

  return "Thanks for reaching out to BugZero Cyber Solutions!\n\nWe specialize in VAPT, web security testing, and cybersecurity consulting. Basic audits start from ₹5,000.\n\nTo get started, please share your website URL and I'll help assess your security needs.";
}

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

    let reply;

    if (apiKey && !apiKey.startsWith('sk-or-v1-your')) {
      // --- OpenRouter (paid / configured) ---
      const requestBody = {
        model: 'mistralai/mistral-7b-instruct:free',
        messages,
        max_tokens: 500,
        temperature: 0.7,
      };

      console.log('[chat] → OpenRouter request:', JSON.stringify({ model: requestBody.model, messageCount: messages.length }));

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

        if (!orRes.ok) {
          let errMsg = `HTTP ${orRes.status}`;
          try { errMsg = JSON.parse(rawText)?.error?.message || errMsg; } catch (_) {}
          throw new Error(errMsg);
        }

        const orData = JSON.parse(rawText);
        const content = orData?.choices?.[0]?.message?.content;
        if (!content) throw new Error('Empty response from AI model');
        reply = content.trim();
      } catch (orErr) {
        console.error('[chat] OpenRouter failed, falling back to Pollinations:', orErr.message);
        reply = null;
      }
    }

    if (!reply) {
      // --- Pollinations.ai (completely free, no API key needed) ---
      console.log('[chat] → Pollinations.ai request (free fallback)');
      try {
        const pollRes = await fetch('https://text.pollinations.ai/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'openai',
            messages,
            max_tokens: 500,
            temperature: 0.7,
            private: true,
          }),
        });

        if (!pollRes.ok) {
          throw new Error(`Pollinations HTTP ${pollRes.status}`);
        }

        const pollData = await pollRes.json();
        const pollContent = pollData?.choices?.[0]?.message?.content;
        if (!pollContent) throw new Error('Empty response from Pollinations');
        reply = pollContent.trim();
        console.log('[chat] ← Pollinations OK');
      } catch (pollErr) {
        console.error('[chat] Pollinations failed:', pollErr.message, '— using rule-based reply');
        reply = getRuleBasedReply(message);
      }
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