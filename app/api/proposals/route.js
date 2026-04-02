export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, website, services, companySize, budget, timeline, description } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const proposalId = 'BZ-PROP-' + Date.now().toString(36).toUpperCase();

    // Build proposal data
    const selectedServices = (services || []).map(s => {
      const pricing = {
        'Web Application VAPT': '₹25,000',
        'API Security Testing': '₹20,000',
        'Network Security Assessment': '₹35,000',
        'Cloud Security Audit': '₹40,000',
        'Mobile App Security': '₹30,000',
        'Bug Bounty Management': 'Custom',
        'Security Code Review': 'Custom',
        'Database Security': 'Custom',
        'Compliance Consulting': 'Custom',
        'Cybersecurity Training': 'Contact Us',
      };
      return { name: s, startingPrice: pricing[s] || 'Custom' };
    });

    const proposal = {
      proposalId,
      date: new Date().toISOString(),
      client: { name, email, company: company || '', website: website || '' },
      services: selectedServices,
      companySize: companySize || 'Not specified',
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      description: description || '',
    };

    // Save as HOT lead
    const supabase = createAdminClient();
    await supabase.from('leads').insert({
      name, email, company: company || '', website: website || '',
      service: (services || []).join(', '),
      budget: budget || '',
      message: `Proposal request: ${proposalId}. Size: ${companySize}. Timeline: ${timeline}. ${description}`,
      source: 'proposal_generator',
      status: 'new',
      priority: 'hot',
    });

    // Send proposal email
    sendEmail({
      to: email,
      subject: `Your Security Proposal ${proposalId} - BugZero Cyber Solutions`,
      body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#00d4ff">Your Security Proposal</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest! Here's your proposal summary:</p>
        <p><strong>Proposal ID:</strong> ${proposalId}</p>
        <p><strong>Services:</strong> ${selectedServices.map(s => s.name).join(', ')}</p>
        <p><strong>Timeline:</strong> ${timeline || 'To be discussed'}</p>
        <p>Our team will send you a detailed proposal within 24 hours.</p>
        <p><a href="https://bugzero.solutions/contact" style="color:#00d4ff">Schedule a call</a> to discuss further.</p>
        <p>Stay Secure!<br/><strong>Team BugZero</strong></p>
      </div>`,
      type: 'proposal',
      metadata: { proposalId },
    }).catch(err => console.error('Proposal email error:', err));

    return NextResponse.json({ success: true, data: proposal }, { status: 201 });
  } catch (error) {
    console.error('POST /api/proposals error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
