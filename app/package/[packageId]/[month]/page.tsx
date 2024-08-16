'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll } from "framer-motion";

import Calculator from "@/modules/components/dialogue/Calculator";
import Control from "@/modules/components/dialogue/Control";
import Text from '@/modules/components/Text';
import Select from "@/modules/components/dialogue/Select";
import AskText from "@/modules/components/dialogue/AskText";
import MakeOffer from "@/modules/components/dialogue/MakeOffer";
import Checkout from "@/modules/components/dialogue/Checkout";
import Payment from "@/modules/components/Payment";
import packages from '../../../../content/package.json';

const useLink = true;



export default function Form({params}:{params:{packageId:number, month:string}}) {

  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(0);




  const setObject = (theObj:any, direction:number) => {
    setData( (prevData: any) => {
      let d = {...prevData};
      for (const [key, value] of Object.entries(theObj)) d[key] = value;
      console.log(d);
      localStorage.setItem('data', JSON.stringify(d));
      return d;
    })
    setPage( prevPage => prevPage+direction);
  }

  

  const generateLink = async () => {

    if (!data?.checkout?.option?.duration || 
      !data?.checkout?.option?.plan || 
      !data?.checkout?.option?.price) {
      return 'paket tanimli degil';
    }

    var amount = Math.floor((data.discounts??[]).reduce((a:number,b:any)=>a*(100-b.rate)/100, data.checkout.option.price));

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
    
    if( page<0 ) router.back();
    if( useLink && page== questions.length-1 ) {
      generateLink();
    }
    else if( page>= questions.length ) router.push("/");

  }, [page]);

  useEffect(() => {
    let d:any = JSON.parse(localStorage.getItem('data')??'{}');
    setData({...data, ...d});
  }, [])
  

  /*
            <AskText setObject={( theList, direction) => setObject( theList, direction) }
            key="name" question="iletişim bilgileri"
            entries={[
              { value: data["name"]??"", key:"name", example:[ 'isim soyisim', 'duha duman'], verify:"" },
              { value: data["email"]??"", key:"email", example:[ 'eposta girin', 'adsoyad@gmail.com'], verify:"" },
              { value: data["phone"]??"", key:"phone", example:[ 'telefon girin', '0 555 555 55 55'], verify:"" }
            ]} 
          />,
  */

  const questions = [
          <MakeOffer plan={packages.tr[params.packageId]} months={parseInt(params.month)} setObject={( theList, direction) => setObject( theList, direction)}/>,
          <Checkout setObject={( theList, direction) => setObject( theList, direction)} data={data.checkout??{}}/>,
          useLink?
          <div>Ödeme sayfasına yönlendiriliyorsunuz</div>
          :
          <Payment data={data} setObject={( theList, direction) => setObject( theList, direction)} name={data["name"]??""} />,
          ];


  return (

    <main className={"center flex-col md:flex-row"} style={{ fontSize: "1.1rem" }}>
      { questions[page] }
    </main>
  
  );
}
