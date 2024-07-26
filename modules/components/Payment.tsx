'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Control from './dialogue/Control';
import CreditCard from './dialogue/CreditCard';


interface discount {
    name: string,
    rate: number
}

interface packagetype {
    plan: string, 
    default:number, 
    prices: number[], 
    duration: number[], 
    unit:string  
}

interface checkoutType {
    code: string,
    discounts:discount[],
    plan: packagetype,
    option: {duration:number, price:number, plan: string},
    installment: number,
    installmentRate: number
}

interface PaymentDetailsType {
    merchant_id: string;
    user_ip: string;
    merchant_oid: string;
    email: string;
    payment_amount: string;
    currency: string;
    test_mode: string;
    user_name: string;
    user_address: string;
    user_phone: string;
    merchant_ok_url: string;
    merchant_fail_url: string;
    debug_on: number;
    client_lang: string;
    payment_type: string;
    non_3d: string;
    card_type: string;
    installment_count: string;
    non3d_test_failed: string;
    user_basket: string;
    token: string;
    cc_owner?: string,
    card_number?: string,
    expiry_month?: string,
    expiry_year?: string,
    cvv?: string
}

export default function Payment({ data, name, setObject}:{ data:any, name:string, setObject:(param: any, direction: number) => void }) {

    const checkout: checkoutType = data.checkout;
    const [card, setCard] = useState<any>({});
    const [focusCard, setFocusCard] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState<PaymentDetailsType>();


    useEffect(() => {
        
        async function generatePayment() {

            const response = await fetch('/api/GeneratePayment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            let generatePaymentRespond = await response.json();
            setPaymentRequest(generatePaymentRespond);
            console.log(generatePaymentRespond)
        
        }

        generatePayment();

    }, [])



    const turnPage = (direction: number) => {
        
        async function makePayment() {

            if(paymentRequest) {

                let paymentDetails:PaymentDetailsType = {...paymentRequest};
                
                paymentDetails.cc_owner = card.cc_owner;
                paymentDetails.card_number = card.card_number.replace(/\s+/g, '');;
                paymentDetails.expiry_month = card.expiry_date.split('/')[0];
                paymentDetails.expiry_year = card.expiry_date.split('/')[1];
                paymentDetails.cvv = card.cvv;

                console.log(paymentDetails)

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://www.paytr.com/odeme';

                for (const [key, value] of Object.entries(paymentDetails)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = value;
                    form.appendChild(hiddenField);
                }

                document.body.appendChild(form);
                //form.submit();

            }

            //setObject( {}, direction)
        }

        
        if( card.cvv ) makePayment();
        else if( direction > 0) setFocusCard(prevFocusCard => !prevFocusCard);
        else setObject( {}, -1)
    };

    const monthlyPayment = Math.floor((checkout.discounts??[]).reduce((a,b)=>a*(100-b.rate)/100, checkout.option.price)*checkout.installmentRate/checkout.installment)

    return (
        <>

        <div style={{ maxWidth: "100vw", padding: "4%", display: 'flex', flexDirection: "column", gap: 15, paddingBottom:'7rem' }}>
            <div style={{ width: "100%", fontSize:"3rem", fontWeight:300 ,display: "flex", justifyContent:'space-between', alignItems:"baseline", padding: "1rem" }} className="text"> 
                <div style={{ opacity:0.5 }} className="text noSelect">{monthlyPayment} ₺ x {checkout.installment} ay</div>
                <div>{monthlyPayment*checkout.installment}<span style={{fontWeight:300, paddingLeft:7}}>₺</span></div>
            </div>
            <CreditCard name={name??""} allValid={(card)=> setCard(card)} focusTo={focusCard}/>
        </div>
    
        <Control turnPage={(dir) => turnPage(dir)} />
     
        </>
      );
    }