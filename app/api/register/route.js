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
    const { merchant_oid, total_amount, status, hash, failed_reason_code, failed_reason_msg, payment_type, currency, payment_amount } = data; 
    console.log(data);

    // save the user to database
    const client = await clientPromise;
    const db = client.db('duhabum');
    const basket = db.collection('basket');
    const purchase = db.collection('purchase');

    const basketItem = await basket.findOneAndDelete({ _id: merchant_oid });
    console.log("basketItem.value test")


    if ( basketItem && basketItem.value) {

        console.log("basketItem.value exists")
        
        // Generate the hash to compare with the received hash
        const hashString = basketItem.value.hashString;
        console.log(hashString)
        let token = merchant_oid + merchant_salt + status + total_amount;
        const calculatedHash = createHmac('sha256', merchant_key).update(token).digest('base64');
    
        // Validate the hash
        if (hash != calculatedHash) {
            console.error("PAYTR notification failed: bad hash", hash, calculatedHash);
            throw new Error("PAYTR notification failed: bad hash "+ hash+" / "+ calculatedHash);
        } else if( callback.status == 'success' ) {
             const purchaseItem = {
                ...basketItem.value,
                payment_type, currency, total_amount, failed_reason_code, failed_reason_msg,
                purchaseDate: new Date(), // Add additional fields here
                status: status, // Example additional fiel
            };
            await purchase.insertOne(purchaseItem);
            return new NextResponse('OK');
        } else return new NextResponse('not ok');

       
    } else {
        return new NextResponse('Basket item with merchant_oid not found', { status: 404 });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return new NextResponse( 'Failed to generate a payment', { status: 500 });
  }
}

