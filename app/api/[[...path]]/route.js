import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

function getPath(request) {
  const url = new URL(request.url);
  const fullPath = url.pathname;
  // Remove '/api' prefix
  return fullPath.replace(/^\/api/, '') || '/';
}

export async function GET(request) {
  const path = getPath(request);

  try {
    if (path === '/health') {
      return NextResponse.json({ status: 'ok', service: 'BugZero API', timestamp: new Date().toISOString() });
    }

    if (path === '/leads') {
      await connectDB();
      const leads = await Lead.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: leads });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const path = getPath(request);

  try {
    if (path === '/contact') {
      await connectDB();
      const body = await request.json();

      const { name, email, phone, company, message, service, source } = body;

      if (!name || !email) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      }

      const lead = await Lead.create({
        name,
        email,
        phone: phone || '',
        company: company || '',
        message: message || '',
        service: service || '',
        source: source || 'contact_form',
        status: 'new',
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Thank you! We will get back to you within 2 hours.',
        data: { id: lead._id }
      }, { status: 201 });
    }

    if (path === '/newsletter') {
      await connectDB();
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      const lead = await Lead.create({
        name: 'Newsletter Subscriber',
        email,
        source: 'newsletter',
        status: 'new',
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to our newsletter!',
        data: { id: lead._id }
      }, { status: 201 });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
