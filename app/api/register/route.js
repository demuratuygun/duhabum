import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

export async function POST(req) {
  try {
    const request = new NextRequest(req);
    const data = await request.json();

    const {
      merchant_oid,
      status,
      total_amount,
      hash,
      failed_reason_code,
      failed_reason_msg,
    } = data;

    // Generate hash string
    const hashSTR = `${merchant_oid}${merchant_salt}${status}${total_amount}`;
    const token = createHmac('sha256', merchant_key).update(hashSTR).digest('base64');

    console.log(JSON.stringify(data));

    // Verify the hash
    //if (token !== hash) 
    //  throw new Error('Invalid hash', token, hash);
    

    const client = await clientPromise;
    const db = client.db('duhabum');
    const basketCollection = db.collection('basket');
    const purchaseCollection = db.collection('purchase');

    // Check if the order exists in the basket
    const order = await basketCollection.findOne({ _id: merchant_oid });

    if (!order) {
      throw new Error('Order not found');
    }

    if (status === 'success') {
      // Delete the order from the basket collection
      await basketCollection.deleteOne({ _id: merchant_oid });

      // Add the order to the purchase collection
      await purchaseCollection.insertOne({
        ...order,
        status,
        total_amount,
        payment_date: new Date(),
      });

      // Respond with "OK" to acknowledge the successful payment
      return new Response('OK');
    } else {
      // If payment failed, keep the order in the basket and log the failure reason
      console.error(`Payment failed: ${failed_reason_code} - ${failed_reason_msg}`);
      return new Response('OK');
    }
  } catch (error) {
    console.error('Server Error:', error);
    return new Response('Failed to process payment notification', { status: 500 });
  }
}


export async function GET(req) {

  console.log("get")
  return new Response('OK');

}