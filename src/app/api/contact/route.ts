import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ── Option 1: Resend ─────────────────────────────────────────────────────
    // Uncomment and install resend: npm install resend
    //
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: process.env.RESEND_FROM_EMAIL ?? 'noreply@ark-design.vercel.app',
    //   to: process.env.CONTACT_TO_EMAIL ?? 'ark303777@gmail.com',
    //   replyTo: body.email,
    //   subject: `New project inquiry from ${body.name} — ${body.service}`,
    //   html: `
    //     <h2>New Project Inquiry</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Company:</strong> ${body.company ?? 'Not provided'}</p>
    //     <p><strong>Service:</strong> ${body.service}</p>
    //     <p><strong>Budget:</strong> ${body.budget ?? 'Not specified'}</p>
    //     <hr />
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message.replace(/\n/g, '<br />')}</p>
    //   `,
    // });

    // ── Option 2: Log to console (development) ───────────────────────────────
    console.log('[Contact Form]', {
      name: body.name,
      email: body.email,
      company: body.company,
      service: body.service,
      budget: body.budget,
      messageLength: body.message.length,
    });

    return NextResponse.json(
      { success: true, message: 'Message received. We\'ll be in touch within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
