import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

const generateUniqueTimestamp = () => {
  const now = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000000);
  return `ID${now}${randomComponent}`;
};

export async function POST(req) {
  try {
    const request = new NextRequest(req);
    const data = await request.json();

    const bin_number = data.bin_number;

    // Generate the paytr_token for bin detail request
    const paytr_token = createHmac('sha256', merchant_key)
      .update(bin_number + merchant_id + merchant_salt)
      .digest('base64');

    const binParams = new URLSearchParams();
    binParams.append('merchant_id', merchant_id);
    binParams.append('bin_number', bin_number);
    binParams.append('paytr_token', paytr_token);

    // Request bin details from PAYTR
    const binResponse = await fetch('https://www.paytr.com/odeme/api/bin-detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: binParams,
    });

    const binRes = await binResponse.json();

    if (!binRes.status || binRes.status !== 'success') {
      console.error('Error in BIN detail response:', binRes);
      return NextResponse.json(
        { error: 'BIN detail request failed', details: binRes },
        { status: binResponse.status }
      );
    }

    // Generate token for installment request
    const request_id = generateUniqueTimestamp();
    const installment_token = createHmac('sha256', merchant_key)
      .update(merchant_id + request_id + merchant_salt)
      .digest('base64');

    const installParams = new URLSearchParams();
    installParams.append('merchant_id', merchant_id);
    installParams.append('request_id', request_id);
    installParams.append('paytr_token', installment_token);

    // Request installment rates from PAYTR
    const installResponse = await fetch('https://www.paytr.com/odeme/taksit-oranlari', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: installParams,
    });

    const installRes = await installResponse.json();

    if (!installRes.status || installRes.status !== 'success') {
      console.error('Error in installment rates response:', installRes);
      return NextResponse.json(
        { error: 'Installment rates request failed', details: installRes },
        { status: installResponse.status }
      );
    }

    // Combine BIN details and installment rates
    Object.keys(installRes.oranlar).forEach((key) => {
      if (key === binRes.brand) {
        binRes.ratios = Object.values(installRes.oranlar[key]);
      }
    });

    // Generate token for the response
    binRes.itoken = createHmac('sha256', merchant_key)
      .update(merchant_id + JSON.stringify(binRes.ratios) + merchant_salt)
      .digest('base64');

    return NextResponse.json(binRes);

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}
