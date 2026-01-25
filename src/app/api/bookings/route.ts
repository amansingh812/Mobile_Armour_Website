import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotificationEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    const { type, data } = bookingData;

    // Get current date in the required format
    const currentDate = new Date().toLocaleDateString('en-CA');
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Create URL search params object for form data to maintain compatibility with Google Apps Script
    const formData = new URLSearchParams();
    formData.append('DATE', currentDate);
    formData.append('TIME', currentTime);
    formData.append('TYPE', type); // REPAIR_BOOKING, PRODUCT_ORDER, or ENQUIRY

    // Add common fields
    if (data.name) formData.append('NAME', data.name);
    if (data.phone) formData.append('PHONE', data.phone);
    // Some sheets use a column typo 'EMIAL' (as seen in form-quote.tsx). Send both EMAIL and EMIAL for compatibility.
    if (data.email) {
      formData.append('EMAIL', data.email || '');
      formData.append('EMIAL', data.email || '');
    }

    // Add type-specific fields
    switch (type) {
      case 'REPAIR_BOOKING':
        formData.append('BRAND', data.brand || '');
        formData.append('MODEL', data.model || '');
        formData.append('DESCRIPTION', data.problem || '');
        formData.append('PREFERRED_DATE', data.preferredDate || '');
        formData.append('PREFERRED_TIME', data.preferredTime || '');
        break;

      case 'PRODUCT_ORDER':
        formData.append('PRODUCT_NAME', data.productName || '');
        formData.append('QUANTITY', data.quantity || '1');
        formData.append('DELIVERY_ADDRESS', data.deliveryAddress || '');
        formData.append('DESCRIPTION', `Product Order: ${data.productName} (Qty: ${data.quantity})`);
        break;

      case 'ENQUIRY':
        formData.append('DESCRIPTION', data.message || '');
        if (data.brand) formData.append('BRAND', data.brand);
        if (data.model) formData.append('MODEL', data.model);
        break;
    }

    // Use the same Google Apps Script URL from your existing quote form
    const scriptURL = 'https://script.google.com/macros/s/AKfycby6QqWh0-AJ-YETsbPYHtwPmmLxN5QjkVCgFycAxaxrmQNmr1tXpHGohLCMt_sCZixU/exec';

    console.log('Sending booking data:', formData.toString());

    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    // Send email notification immediately (don't await to avoid slowing down response)
    console.log('[bookings] Triggering email notification for lead...');
    sendLeadNotificationEmail({
      type: type,
      name: data.name,
      phone: data.phone,
      email: data.email,
      brand: data.brand,
      model: data.model,
      message: data.message || data.problem,
      productName: data.productName,
      quantity: data.quantity,
      deliveryAddress: data.deliveryAddress,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
    }).catch(err => console.error('Email notification failed:', err));

    // Since we're using no-cors mode, we can't access response properties
    // So we'll assume success if no error is thrown
    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully!',
      type: type
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit booking. Please try again or contact us directly on WhatsApp.' 
      },
      { status: 500 }
    );
  }
}
