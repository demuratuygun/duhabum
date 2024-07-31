import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

export async function POST(req) {
  try {
    const request = new NextRequest(req);
    const data = await request.json();

    // Get the bin_number from the request body
    const bin_number = data.bin_number;
    console.log(bin_number)

    // Generate the paytr_token
    const paytr_token = createHmac('sha256', merchant_key).update(bin_number + merchant_id + merchant_salt).digest('base64');

    const response = await fetch('https://www.paytr.com/odeme/api/bin-detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify({
        merchant_id: merchant_id,
        bin_number: bin_number,
        paytr_token: paytr_token,
      }),
    });

    console.log(response.body)

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Error response from external API:', errorResponse);
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();

    if (responseData.status === 'success') {
      return NextResponse.json(responseData);
    } else {
      return NextResponse.json(responseData, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
