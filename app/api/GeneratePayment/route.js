import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;


const generateUniqueTimestamp = () => {
  const now = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000000);
  return `IN${now}${randomComponent}`;
};

export async function POST(req) {
  try {

    if (!process.env.MERCHANT_KEY) {
        throw new Error('Missing environment variable: MERCHANT_KEY');
    }
    const request = new NextRequest(req);
    const data = await request.json();
    
    // Generate a unique merchant order ID
    const merchant_oid = generateUniqueTimestamp(); // Unique order number
    const amount = Math.floor((data.checkout.discounts??[]).reduce((a,b)=>a*(100-b.rate)/100, data.checkout.option.price))+".00";
    const basket = JSON.stringify([
      [`Duhabum ${data.checkout.option.duration} aylık ${data.checkout.option.plan} Plan`, amount, 1], // Product 1 (Name - Unit Price - Quantity)
    ]);

    // Payment details
    const paymentDetails = {
      merchant_id,
      user_ip: request.ip || request.headers.get('X-Forwarded-For'),
      merchant_oid,
      currency: 'TL',
      test_mode: '0',
      payment_amount: amount,
      email: data.email,
      user_name: data.name,
      user_address: 'test test test',
      user_phone: data.phone,
      installment_count: '0',
      merchant_ok_url: 'https://www.duhabum.com/paymentSuccess',
      merchant_fail_url: 'https://www.duhabum.com/paymentFailed',
      debug_on: 1,
      client_lang: 'tr',
      payment_type: 'card',
      non_3d: '0',
      card_type: '',
      non3d_test_failed: '0',
      user_basket: basket
    };


    // Generate hash string
    const hashSTR = `${merchant_id}${paymentDetails.user_ip}${merchant_oid}${paymentDetails.email}${paymentDetails.payment_amount}${paymentDetails.payment_type}${paymentDetails.installment_count}${paymentDetails.currency}${paymentDetails.test_mode}${paymentDetails.non_3d}`;
    const tokenSTR = hashSTR + merchant_salt;
    const token = createHmac('sha256', merchant_key).update(tokenSTR).digest('base64');

    // Include the token in the payment details
    paymentDetails.paytr_token = token;
    paymentDetails.token = hashSTR;

    // save the user to database
    const client = await clientPromise;
    const db = client.db('duhabum');
    const users = db.collection('users');
    const basketcollection = db.collection('basket');

    await users.updateOne(
        { _id: data.phone },
        {
          $set: {
            phone: data.phone,
            name: data.name,
            email: data.email,
            code: data.code ?? undefined,
            createdAt: new Date()
          }
        },
        { upsert: true }
    );

    await basketcollection.updateOne(
        { _id: merchant_oid },
        { $set: {
            phone: data.phone,
            ...data.checkout,
            merchant_oid,
            code: data.code==''? undefined:data.code,
            hashString: hashSTR,
            createdAt: new Date()
          }
        },
        { upsert: true }
    )

    return NextResponse.json(paymentDetails);
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to generate a payment' }, { status: 500 });
  }
}