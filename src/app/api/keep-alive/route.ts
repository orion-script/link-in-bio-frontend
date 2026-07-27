import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (!backendUrl) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }

  try {
    // Ping the backend's health endpoint to keep the Render instance awake
    const res = await fetch(`${backendUrl}/health`, { cache: 'no-store' });
    
    if (res.ok) {
      return NextResponse.json({ status: 'Awake', timestamp: new Date().toISOString() });
    } else {
      return NextResponse.json({ status: 'Pinged but returned error', code: res.status }, { status: res.status });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ status: 'Failed to ping', error: message }, { status: 500 });
  }
}
