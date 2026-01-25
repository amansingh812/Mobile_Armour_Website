import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/mailer';

export async function GET(request: NextRequest) {
  try {
    console.log('[test-email] Testing email notification system...');
    
    const result = await sendLeadNotificationEmail({
      type: 'ENQUIRY',
      name: 'Test User',
      phone: '9900604665',
      email: 'test123@gmail.com',
      brand: 'Google',
      model: 'Pixel 9',
      message: 'This is a test email from the Mobile Armour system.',
    });

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
        recipientEmail: process.env.LEAD_NOTIFICATION_EMAIL || process.env.SMTP_FROM,
        senderEmail: process.env.SMTP_FROM,
        note: 'Please check your email inbox or spam folder'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email. Check server logs for details.',
        recipientEmail: process.env.LEAD_NOTIFICATION_EMAIL || process.env.SMTP_FROM,
        senderEmail: process.env.SMTP_FROM,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('[test-email] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      senderEmail: process.env.SMTP_FROM,
      recipientEmail: process.env.LEAD_NOTIFICATION_EMAIL || process.env.SMTP_FROM,
    }, { status: 500 });
  }
}
