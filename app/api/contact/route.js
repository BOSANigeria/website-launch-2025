import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 20) {
      return NextResponse.json(
        { error: 'Message must be at least 20 characters long' },
        { status: 400 }
      );
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email app password
      },
    });

    // Email content for you (receiving the message)
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Where you want to receive messages
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0;">New Contact Message</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            
            <h3 style="color: #333; margin-top: 30px;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #D4AF37; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #e8e8e8; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This message was sent from the BOSAN contact form on ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply email for the user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting BOSAN',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0;">BOSAN</h1>
            <p style="margin: 10px 0 0 0;">Bar Organization of Students Alumni Network</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible.</p>
            
            <div style="background-color: white; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Your Message Summary:</h4>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #333;">Contact Information</h3>
              <p><strong>Office:</strong> Nigerian Law School Complex, Victoria Island, Lagos, Nigeria</p>
              <p><strong>Phone:</strong> +234 704 444 4124</p>
              <p><strong>Email:</strong> bosanigeria@gmail.com</p>
              <p><strong>Office Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #e8e8e8; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}