import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const recipients = {
  aarush: 'aarush.divakarla@gmail.com',
  prasen: 'prasen.pani@gmail.com',
  toby: 'tobyf@bentonvillek12.org',
} as const;

function reply(status: number, message: string, request: NextRequest) {
  if (request.headers.get('accept')?.includes('application/json')) {
    return NextResponse.json({ ok: status === 200, message }, { status, headers: { 'Cache-Control': 'no-store' } });
  }
  if (status === 200) return NextResponse.redirect(new URL('/thanks', request.url), 303);
  return new NextResponse(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) return reply(403, 'Please submit from the TechPosure website.', request);
    } catch {
      return reply(403, 'Invalid origin.', request);
    }
  }
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return reply(415, 'Unsupported submission format.', request);
  if (Number(request.headers.get('content-length') || 0) > 24000) return reply(413, 'Your message is too long.', request);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 24000) return reply(413, 'Your message is too long.', request);
  const body = new URLSearchParams(raw);
  if (body.get('bot-field')) return reply(400, 'Unable to accept this submission.', request);
  const read = (key: string) => (body.get(key) || '').trim();
  const name = read('name');
  const email = read('email');
  const organization = read('organization');
  const message = read('message');
  const contact = read('contact');
  if (!name || name.length > 100 || !organization || organization.length > 160 ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 20 || message.length > 5000 ||
    !(contact === 'team' || contact in recipients)) {
    return reply(400, 'Please check the required fields and message length.', request);
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return reply(503, 'The contact form is temporarily unavailable. Please use a direct email link below.', request);
  }
  const to = contact === 'team' ? Object.values(recipients) : [recipients[contact as keyof typeof recipients]];
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to,
        reply_to: email,
        subject: `TechPosure inquiry for ${contact === 'team' ? 'the team' : contact}`,
        text: `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply(502, 'Your message could not be delivered. Please try a direct email link below.', request);
    return reply(200, 'Your inquiry has been sent.', request);
  } catch {
    return reply(502, 'Your message could not be delivered. Please try a direct email link below.', request);
  }
}

export function GET(request: NextRequest) {
  return reply(405, 'Please submit the contact form.', request);
}
