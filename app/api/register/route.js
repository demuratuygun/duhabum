import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

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
    const request = new NextRequest(req);
    const data = await request.json();
    const { merchant_oid, total_amount, status, hash, failed_reason_code, failed_reason_msg, payment_type, currency, payment_amount } = data; 
    console.log(data);

    // save the user to database
    const client = await clientPromise;
    const db = client.db('duhabum');
    const basket = db.collection('basket');
    const purchase = db.collection('purchase');

    const basketItem = await basket.findOneAndDelete({ _id: merchant_oid });

    if (basketItem.value) {
        
        // Generate the hash to compare with the received hash
        const hashString = basketItem.value.hashString;
        const calculatedHash = createHmac('sha256', merchant_key).update(hashString + merchant_salt).digest('base64');
    
        // Validate the hash
        if (data.hash !== calculatedHash) {
            console.error('Hash mismatch', data.hash, calculatedHash);
            return NextResponse.text('Invalid hash', { status: 400 });
        }


        const purchaseItem = {
            ...basketItem.value,
            payment_type, currency, total_amount, failed_reason_code, failed_reason_msg,
            purchaseDate: new Date(), // Add additional fields here
            status: status, // Example additional fiel
        };
        await purchase.insertOne(purchaseItem);
        return NextResponse.text('OK');

    } else {
        return NextResponse.text('Basket item not found', { status: 404 });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to generate a payment' }, { status: 500 });
  }
}

