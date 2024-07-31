import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';


export async function POST(req) {
  try {

    const request = new NextRequest(req);
    const data = await request.json();
    const { email, isStudent } = data; 
    console.log(data);

    // save the user to database
    const client = await clientPromise;
    const db = client.db('duhabum');
    const emails = db.collection('emails');

    await emails.insertOne({...data});
    return new NextResponse('OK');


  } catch (error) {
    console.error('Server Error:', error);
    return new NextResponse( 'Failed to generate a payment', { status: 500 });
  }
}

