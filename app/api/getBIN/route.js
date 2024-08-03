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

    // Get the bin_number from the request body
    const bin_number = data.bin_number;
    console.log(bin_number)

    // Generate the paytr_token
    const paytr_token = createHmac('sha256', merchant_key).update(bin_number + merchant_id + merchant_salt).digest('base64');

    const params = new URLSearchParams();
    params.append('merchant_id', merchant_id);
    params.append('bin_number', bin_number);
    params.append('paytr_token', paytr_token);

    const response = await fetch('https://www.paytr.com/odeme/api/bin-detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });
    
    const binRes = await response.json();
    if (!binRes.status) {  
      console.error('Error response from external API:', await response.text());
      throw new Error(`Error: ${response.statusText}`);
    }
    
    console.log(binRes);



    let request_id = generateUniqueTimestamp();
    const installment_token = createHmac('sha256', merchant_key).update(merchant_id + request_id + merchant_salt).digest('base64');

    const installParams = new URLSearchParams();
    installParams.append('merchant_id', merchant_id);
    installParams.append('request_id', request_id);
    installParams.append('paytr_token', installment_token);

    const installResponse = await fetch('https://www.paytr.com/odeme/taksit-oranlari', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: installParams
    });
    
    const installRes = await installResponse.json();
    

    if (installRes.status!='success') {  
      console.error('Error response from external API:', await response.text());
      throw new Error(`Error: ${response.statusText}`);
    }
    

    
    Object.keys(installRes.oranlar).forEach( (key) => {
      if( key == binRes.brand ) binRes.ratios = Object.values(installRes.oranlar[key]);
    });

    binRes.itoken = createHmac('sha256', merchant_key).update(merchant_id + JSON.stringify(binRes.ratios) + merchant_salt).digest('base64');


    if (binRes.status === 'success') {
      return NextResponse.json(binRes);
    } else {
      return NextResponse.json(binRes, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
