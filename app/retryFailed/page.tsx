'use client'
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from '@/modules/icons/Logo';
import Control from "@/modules/components/dialogue/Control";
import Text from '@/modules/components/Text';



export default function Failed({ searchParams }: { searchParams: any }) {
    
    const { fail_message } = searchParams;
    const router = useRouter();

    const generateLink = async () => {

        var data = JSON.parse(localStorage.getItem('data')??'{}');
        if (Object.keys(data).length === 0) return;

        if (!data?.checkout?.option?.duration || 
          !data?.checkout?.option?.plan || 
          !data?.checkout?.option?.price) {
          return 'paket tanimli degil';
        }
    
        var amount = Math.floor(
          (data.discounts??[]).reduce(
            (a:number,b:any)=>a*(100-b.rate)/100, 
            data.checkout.option.price)
        );
    
        const response = await fetch('/api/GenerateLink', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: `Duhabum ${data.checkout.option.duration} aylık ${data.checkout.option.plan} Plan`, 
              price: amount*100,
              email: data.email
            })
        });
        let generateLinkRespond = await response.json();
        console.log(generateLinkRespond);
        router.push(generateLinkRespond.link);
    
    }

    useEffect( () => {
        console.log(searchParams);
        setTimeout( generateLink, 4000);
    }, [] )


    return (
        <main className={"center flex-col md:flex-row"} style={{ fontSize: "1.1rem" }}>
        
            <div style={{ fontWeight: 400, fontSize: '1.5rem', lineHeight: '1.9rem' }}>
                <div>Ödeme basarisiz oldu :/ tekrar dener misiniz</div>
                <div>{fail_message}</div>
            </div>

        </main>
    );
}