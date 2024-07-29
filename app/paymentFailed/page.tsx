'use client'
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from '@/modules/icons/Logo';
import Control from "@/modules/components/dialogue/Control";
import Text from '@/modules/components/Text';



export default function Failed({ params }: { params: { title: string } }) {
    
    const router = useRouter();


    return (
        <div >
            <div style={{ fontWeight: 400, fontSize: '1.5rem', lineHeight: '1.9rem' }}>
                <Text text={"Ödeme işlemi başarısız oldu :/ "} />
            </div>
            <Control turnPage={(dir:number) => router.push("/") }/>
        </div>
    );
}