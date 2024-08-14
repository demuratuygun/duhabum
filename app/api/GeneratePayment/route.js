import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import Promotioins from '../../../content/promotions.json';
import Packages from '../../../content/package.json';


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

    // asssigning discounts according to code parameter
    let discounts = [];
    Object.entries(Promotioins.codes).forEach( (key,value) => { 
      if(key==data.code) discounts=value 
    } );

    // verify and assign the plan
    let plan;
    Object.values(Promotioins.offers).forEach( pack => {
        if( pack.plan==data.checkout.option.plan && pack.duration==data.checkout.option.duration )
            plan = pack;
    })
    Packages.tr.forEach( pack => {
        if( pack.plan==data.checkout.option.plan) {
            for( let i=0; i<pack.duration.length; i++ ) 
                if( pack.duration[i] == data.checkout.option.duration )
                    plan = {pack, price: pack.prices[i]};
        }
    })

    // evaluate and verify amount
    var amount = Math.floor(discounts.reduce((a,b)=>a*(100-b.rate)/100, plan.price));
    
    // verify installment ratios
    if( data.installment_count>1 ) {
      const itoken = createHmac('sha256', merchant_key).update(merchant_id + JSON.stringify(data.ratios) + merchant_salt).digest('base64');
      if( itoken != data.itoken )
        return NextResponse.json({error:'taksit oranlari degistirilmis'});
      else {
        let ratio = data.ratios[data.installment_count-2];
        amount = Math.floor( (1+ratio/100) * amount );
      }
    }
    amount = amount+".00";


    // generate basket
    const basket = JSON.stringify([
      [`Duhabum ${data.checkout.option.duration} aylık ${data.checkout.option.plan} Plan`, amount, 1] // Product (Name - Unit Price - Quantity)
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
      installment_count: data.installment_count,
      merchant_ok_url: 'https://www.duhabum.com/paymentSuccess',
      merchant_fail_url: 'https://www.duhabum.com/paymentFailed',
      debug_on: 1,
      client_lang: 'tr',
      payment_type: 'card',
      non_3d: '0',
      card_type: data.card_type??"",
      non3d_test_failed: '0',
      user_basket: basket
    };


    // Generate hash string
    const hashSTR = `${merchant_id}${paymentDetails.user_ip}${merchant_oid}${paymentDetails.email}${paymentDetails.payment_amount}${paymentDetails.payment_type}${paymentDetails.installment_count}${paymentDetails.currency}${paymentDetails.test_mode}${paymentDetails.non_3d}`;
    const token = createHmac('sha256', merchant_key).update(hashSTR + merchant_salt).digest('base64');

    // Include the token in the payment details
    paymentDetails.paytr_token = token;

    // save the user to database
    const client = await clientPromise;
    const db = client.db('duhabum');
    const basketcollection = db.collection('basket');


    await basketcollection.updateOne(
        { _id: merchant_oid },
        { $set: {
            merchant_oid,
            name: data.name,
            email: data.email,
            phone: data.phone,
            duration: data.checkout.option.duration,
            plan: data.checkout.option.plan,
            amount: amount,
            code: data.code==''? undefined:data.code,
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
