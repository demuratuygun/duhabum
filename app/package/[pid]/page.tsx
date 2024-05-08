'use client'
import Package from "@/modules/components/Package";
import { motion } from "framer-motion";
import packages from '../../../content/package.json';
import { useRouter } from "next/navigation";
import Arrow from "@/modules/icons/cancel";



export default function Form({params}:{params:{pid:number}}) {
  const router = useRouter()

  return (

    <main className={"center flex-col md:flex-row mt-28"}>
      
      <div className={"fixed top-4 left-4 z-50"} onClick={() => router.back()}><Arrow/></div>
      
      
      
      <div style={{display: 'flex', flexDirection: "column", gap: 15}}>
        
        <input type="text" placeholder="isim"/>
        <input type="text" placeholder="soyisim"/>
        <div></div>
        <input type="text" placeholder="telefon"/>
        <input type="text" placeholder="e posta"/>
        <div><button style={{float: "right", marginTop: "14px"}}>katıl</button></div>
      </div>
      
      <Package pack={packages.tr[params.pid]} />

    </main>

      
      



  );
}
