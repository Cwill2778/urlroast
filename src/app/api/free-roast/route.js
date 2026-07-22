import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req) {
  try {
    const { url, email, audience } = await req.json();

    if (!url || !email) {
      return NextResponse.json({ error: 'URL and Email are required' }, { status: 400 });
    }

    // Ensure the table exists (safe to run multiple times, though usually done in a migration script)
    await sql`
      CREATE TABLE IF NOT EXISTS free_leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        audience VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert the lead
    await sql`
      INSERT INTO free_leads (email, url, audience)
      VALUES (${email}, ${url}, ${audience})
    `;

    // Since it's a "free mini-roast", we just redirect them to the roast page 
    // with a "free" tier query param so the AI knows to just give a score.
    const host = req.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const domain = `${protocol}://${host}`;
    
    const successUrl = `${domain}/roaster/results?url=${encodeURIComponent(url)}&audience=${encodeURIComponent(audience)}&tier=free`;

    return NextResponse.json({ url: successUrl });
  } catch (error) {
    console.error('Free roast error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
