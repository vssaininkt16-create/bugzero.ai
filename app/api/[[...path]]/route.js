export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

function getPath(request) {
  const url = new URL(request.url);
  const fullPath = url.pathname;
  return fullPath.replace(/^\/api/, '') || '/';
}

export async function GET(request) {
  const path = getPath(request);

  try {
    if (path === '/health') {
      return NextResponse.json({ status: 'ok', service: 'BugZero API', timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
