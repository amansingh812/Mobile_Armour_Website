import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    console.log('[send-lead-email] Sending email notification for lead...');

    // Send email notification without submitting to Google Sheets
    const result = await sendLeadNotificationEmail({
      type: type || 'ENQUIRY',
      name: data.name,
      phone: data.phone,
      email: data.email,
      brand: data.brand,
      model: data.model,
      message: data.message || data.description,
      productName: data.productName,
      quantity: data.quantity,
      deliveryAddress: data.deliveryAddress,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
    });

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Email notification sent successfully!'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send email notification'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('[send-lead-email] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
