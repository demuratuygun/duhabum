
import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

export async function POST(req) {

  try {

    const text = await req.text();
    const data = Object.fromEntries(new URLSearchParams(text));

    const {
      merchant_oid,
      status,
      total_amount,
      hash
    } = data;
    
    if (!merchant_oid || !status || !total_amount) {
      return new Response('Missing required fields: '+merchant_oid+status+total_amount+hash);
    }

    // Generate hash string
    const hashSTR = `${merchant_oid}${merchant_salt}${status}${total_amount}`;
    const token = createHmac('sha256', merchant_key).update(hashSTR).digest('base64');

    console.log(JSON.stringify(data));

    // Verify the hash
    //if (token !== hash) 
    //  return new Response('Invalid hash: '+token +" "+ hash);

    const client = await clientPromise;
    const db = client.db('duhabum');
    const basketCollection = db.collection('basket');
    const purchaseCollection = db.collection('purchase');

    // Check if the order exists in the basket
    const order = await basketCollection.findOne({ _id: merchant_oid });
    if (!order) return new Response('Order not found');

    if (status === 'success') {

      const result = await purchaseCollection.updateOne(
        { _id: merchant_oid },
        {
          $set: {
            ...order,
            status,
            total_amount,
            payment_date: new Date()
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        // Delete the order from the basket collection
        await basketCollection.deleteOne({ _id: merchant_oid });
      }
      // Respond with "OK" to acknowledge the successful payment
      return new Response('OK');
    } else {
      // If payment failed, keep the order in the basket and log the failure reason
      console.error(`Payment failed`);
      return new Response('NOT success');
    }

  } catch (error) {
    console.error('Server Error:', error);
    return new Response('Failed to process payment notification: '+req.body);
  }
}

export async function GET(req) {

  console.log("get")
  return new Response('get OK');

}