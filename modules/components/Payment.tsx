'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Control from './dialogue/Control';
import CreditCard from './dialogue/CreditCard';
import PickNumber from './dialogue/PickNumber';


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
    option: {duration:number, price:number, plan: string}
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

const padNumber = (val: number|string) => {
    return (val+'').replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }


export default function Payment({ data, name, setObject}:{ data:any, name:string, setObject:(param: any, direction: number) => void }) {

    const checkout: checkoutType = data.checkout;
    const [card, setCard] = useState<any>({});
    const [amount, setAmount] = useState(0);
    const [focusCard, setFocusCard] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState<PaymentDetailsType>();
    const [installment, setInstallment] = useState<number>(1);

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

        const amount = Math.floor((data.discounts??[]).reduce((a:number,b:discount)=>a*(100-b.rate)/100, checkout.option.price));
        data.total = amount;
        setAmount(amount);

        generatePayment();
        //notify();

    }, []);


    const  getBIN = async (binNumber:string) => {

        const response = await fetch('/api/getBIN', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bin_number: binNumber})
        });

        let binResponse = await response.json();
        console.log(binResponse)
        
    }


    const  notify = async () => {

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                merchant_oid:'IN1722502773926429012',
                status: 'success',
                hash: ''
            })
        });

        let Response = await response.text();
        console.log(Response)
        
    }



    const turnPage = (direction: number) => {
        
        async function makePayment() {

            if(paymentRequest) {

                let paymentDetails:PaymentDetailsType = {...paymentRequest};
                
                paymentDetails.cc_owner = card.cc_owner;
                paymentDetails.card_number = card.card_number.replace(/\s+/g, '');;
                paymentDetails.expiry_month = card.expiry_date.split('/')[0];
                paymentDetails.expiry_year = card.expiry_date.split('/')[1];
                paymentDetails.cvv = card.cvv;
                paymentDetails.debug_on = 1;

                console.log(paymentDetails);

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

                console.log(form)
                document.body.appendChild(form);
                form.submit();

            }

            //setObject( {}, direction)
        }

        
        if( card.cvv ) makePayment();
        else if( direction > 0) setFocusCard(prevFocusCard => !prevFocusCard);
        else setObject( {}, -1);

    };
    
    return (
        <>

        <div style={{ maxWidth: "100vw", padding: "4%", display: 'flex', flexDirection: "column", gap: 15, paddingBottom:'6rem' }}>
            
            <div style={{ width: "100%", fontSize:"3rem", fontWeight:300 ,display: "flex", justifyContent:'space-between', alignItems:"baseline", padding: "1rem" }} className="text">
                <div style={{ opacity:0.5 }} className="text noSelect">{padNumber(Math.floor(amount/checkout.option.duration))} ₺ x {checkout.option.duration} ay</div>
                <div>{padNumber(paymentRequest?.payment_amount.slice(0,-3)??amount)}<span style={{fontWeight:300, paddingLeft:7}}>₺</span></div>
            </div>

            <CreditCard name={name??""} allValid={(card)=> setCard(card)} focusTo={focusCard} getBIN={getBIN}/>
            
            <PickNumber key={"pickInstallments"}
                value={installment}
                label='taksit'
                unit='ay'
                range={[1,12]}
                onChange={(val:number) => setInstallment(val)}
            />

        </div>
    
        <Control turnPage={(dir) => turnPage(dir)} />
    
        </>
      );
    }