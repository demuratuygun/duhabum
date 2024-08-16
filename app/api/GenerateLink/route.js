import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const merchant_id = process.env.MERCHANT_ID;
const merchant_key = process.env.MERCHANT_KEY;
const merchant_salt = process.env.MERCHANT_SALT;

export async function POST(req) {

    const request = new NextRequest(req);
    const data = await request.json();
    
    const { 
        name, 
        price, 
        currency = 'TL', 
        max_installment='12', 
        link_type = 'product', 
        lang = 'tr', 
        get_qr = '0', 
        email = '', 
        min_count = '1', 
        max_count = '1',
        callback_link = '', 
        callback_id = '', 
        debug_on = '1' 
    } = data;

    const now = new Date();
    now.setHours(now.getHours() + 6);
    const expiry_date = now.toISOString().slice(0, 19).replace('T', ' ');

    let required = name + price + currency + max_installment + link_type + lang + min_count;
    const paytr_token = crypto.createHmac('sha256', merchant_key).update(required + merchant_salt).digest('base64');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            merchant_id,
            name,
            price,
            currency,
            max_installment,
            link_type,
            lang,
            get_qr,
            min_count,
            email,
            expiry_date,
            max_count,
            callback_link,
            callback_id,
            debug_on,
            paytr_token,
        })
    };

    try {
        const response = await fetch('https://www.paytr.com/odeme/api/link/create', options);
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: response.status });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}