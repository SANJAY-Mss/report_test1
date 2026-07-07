import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail SMTP
    // For production, set SMTP_USER and SMTP_PASS in your .env file
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '', // App password, NOT regular password
      },
    });

    const mailOptions = {
      from: `"ReportGuard Contact" <${process.env.SMTP_USER}>`,
      to: 'kittyismystery@gmail.com',
      replyTo: email,
      subject: `[ReportGuard Contact] ${subject || 'New Message'} — from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 16px;">
          <div style="background: white; padding: 32px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 20px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 16px 8px 0; color: #6b7280; font-size: 14px; vertical-align: top; width: 80px;">Name</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 16px 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Subject</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px;">${subject || '—'}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <div style="color: #374151; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Sent via ReportGuard Contact Form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
