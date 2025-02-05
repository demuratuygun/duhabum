'use client'
import {  useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Calculator from "@/modules/components/dialogue/Calculator";
import Control from "@/modules/components/dialogue/Control";
import Text from '@/modules/components/Text';
import Select from "@/modules/components/dialogue/Select";
import AskText from "@/modules/components/dialogue/AskText";
import { motion } from "framer-motion";

import crypto from "crypto";


function hashData(data:string) {
  if(data) return crypto.createHash("sha256")?.update(data).digest("hex");
}


interface InfoProps { text:string, turnPage: (param: number) => void }
const Info:React.FC<InfoProps> = ({ text, turnPage }) => {
  return(
    <>
      <div className="noSelect" style={{ fontWeight: 400, fontSize: '1.5rem', lineHeight: '1.9rem', fontFamily: "'Saira', sans-serif", color: '#DFDFDFCD', margin: '1rem', maxWidth:'300px', textAlign: 'center' }}>
        <Text text={text} />
      </div>
      <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}

interface TDEEProps { BMR:number, value: number, setList: (keys:string[],  theList:any[], direction:number) => void }
const TDEE:React.FC<TDEEProps> = ({ BMR, value, setList }) => {

  const activityLevels = [
    {level: 1, title:"Hareketsiz (Sedanter)", text: "Günün büyük kısmını oturarak geçirenler", factor:1.4, value: 10, unit:"dk'dan az"},
    {level: 2, title:"Hafif Aktif", text: "Günlük rutininiz bazı yürüyüşler içeriyorsa. Öğrenci, ofis çalışanı", factor:1.5, value: 25, unit:"dk'dan a"},
    {level: 3, title:"Orta Düzeyde Aktif", text: "Görece hareketli veya gün içinde aktif olmayi gerektiren bir rutinin varsa", factor:1.6, value: 40, unit:"dk'dan az"},
    {level: 4, title:"Çok Aktif", text: "Fiziksel olarak efor gerektiren bir rutininiz varsa", factor:1.8,  value: 60, unit:"dk'dan az"},
    {level: 5, title:"Son Derece Aktif", text: "fiziksel olarak zorlu bir rutininiz varsa", factor:2, value: 90, unit:"dk'dan çok "},
  ]

  const [TDEE, setTDEE] = useState(2423);
  const [level, setLevel] = useState(value-1);

  const calculateTDEE = ( values:number[] ) => {
    let val = values[0]-1;
    setLevel(val);
    return activityLevels[val].factor * BMR;
  }

  return(
    <>
        <Calculator key={'TDEE'} display={{label: "TDEE", unit: "Kalori / Gün", val: TDEE}}
          Values={[{label:"seviye", val:level+1, unit:"", range:[1,5]}]} 
          calculate={calculateTDEE} 
          setObject={(theList:any[], direction:number) => setList(["PAL", "TDEE"], theList, direction)}
        />
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{delay:0.5, duration:1}} className="noSelect" style={{ position:"absolute", left: 0, bottom: "8rem", height:"180px", width:"100%", display:"flex", alignItems: "center", justifyContent: "center", fontWeight: 200, color: "#DFDFDFa0", textAlign: "center", fontSize: "1.1rem", lineHeight: "1.36rem"}}>
          <div style={{ width: '320px', padding: '0px 1em' }}>
            <span style={{ fontWeight: 500, color: "#DFDFDFe0", maxWidth:"400px" }}>{activityLevels[level]["title"]}</span><br/><br/>{activityLevels[level]["text"]}
          </div>
        </motion.div>

      
    </>
  )

}







export default function Success() {
    
    const router = useRouter();
    const [data, setData] = useState<any>({
      gender: "ERKEK",
      height: 178,
      weight: 78,
      years: 19
    });
    const [page, setPage] = useState(0);
  
  
  
    const setObject = (theObj:any, direction:number) => {
      setData( (prevData: any) => {
        let d = {...prevData};
        for (const [key, value] of Object.entries(theObj)) d[key] = value;
        localStorage.setItem('data', JSON.stringify(d));
        return d;
      })
      setPage( prevPage => prevPage+direction);
    }
  
    const setList = (keys:string[], theList:any[], direction:number) => {

      setData( (prevData: any) => {
        let d = {...prevData};
        keys.forEach((element, i) => {
           d[element] = theList[i].val;
        });
        localStorage.setItem('data', JSON.stringify(d));
  
        return d;
      })
      setPage( prevPage => prevPage+direction);
    }
  
    const turnPage = (dir:number) => {
      setPage( prevPage => prevPage+dir)
    } 
  
    useEffect(() => {

      console.log(data);
  
      if( page<0 ) router.back();
      else if( page>= questions.length ) router.push("/");
  
      const createDocument = async () => {
  
          try {
            const response = await fetch('/api/record', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
      
            let resdata;
  
            try {
              resdata = await response.json();
            } catch (error) {
              console.error('Failed to parse JSON response:', error);
              resdata = { error: 'Failed to parse JSON response' };
            }
      
            if (response.ok) {
              console.log(`Document created successfully! Document ID: ${resdata.documentId}`);
            } else {
              console.log(`Error creating document: ${resdata.error}`);
            }

          } catch (error) {
            console.error('Network error:', error);
            console.log('Network error occurred. Please try again.');
          }
      }
      
      if ( page==questions.length-1 ) 
        createDocument();
  
    }, [page]);
  
    useEffect(() => {
      console.log(data);

      const event_id = `${Date.now()}`;

      if (typeof window !== 'undefined' && window.fbq && data.checkout?.option) {
        window.fbq('track', 'Purchase', {
          content_name: data.checkout.option.duration+' Aylık Duhabum '+data.checkout.option.plan+' Paketi',
          content_ids: data?.package_id??1,
          content_type: 'product',
          value: data.checkout.option.price, // value of the package/product Math.floor(discounts.reduce((a,b)=>a*(100-b.rate)/100, plan.price))
          currency: 'TL',
          event_id
        });
      }

      const sendConversionEvent = async () => {
        try {
          const response = await fetch("/api/sendEvent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event_name: "Purchase",
              event_time: Math.floor(Date.now() / 1000), // Current timestamp
              user_data: {
                em: [hashData(data.email)], 
                ph: [hashData(data.phone)],
              },
              custom_data: {
                currency: "TL",
                value: data.checkout?.option.price, 
              },
              event_id
            }),
          });
      
          const result = await response.json();
          console.log("Meta CAPI response:", result);
        } catch (error) {
          console.error("Error sending Meta CAPI event:", error);
        }
      };

      sendConversionEvent();
      
      
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView', { page_path: window.location.pathname });
      }
      
      let d:any = JSON.parse(localStorage.getItem('data')??`{}`);
      console.log(d);
      d.code = "";
      setData({...data, ...d});
    }, [])
    
    const calculateBMR = (values:number[]) => {
      //if( data['gender'] && data['gender']=='man' )
        return 88.362 + (13.397 * values[0]) + (4.799 * values[1]) - (5.677 * values[2]);
      //BMR=447.593+(9.247×weight in kg)+(3.098×height in cm)−(4.330×age in year for woman
    }

  
    const questions = [
            data['name']?
            <Info text="Ödemeniz başarıyla alınmıştır. Soracagimiz sorulara gore antreman plani olusturulacaktir lutfen dikkatli cevap verin" turnPage={turnPage} />
            :
            <AskText setObject={( theList, direction) => setObject( theList, direction) }
              key="name" question="iletişim bilgileri"
              entries={[
              { value: data["name"]??"", key:"name", example:[ 'isim soyisim', 'duha duman'], verify:"" },
              { value: data["email"]??"", key:"email", example:[ 'eposta girin'], verify:'' },
              { value: data["phone"]??"", key:"phone", example:[ 'telefon girin', '0 555 555 55 55'], verify:'' }
              ]} 
            />,
            <AskText key="goal" setObject={( theList, direction) => setObject( theList, direction)}
              question="Duhabum Koçluk Hizmeti ile Hedefiniz Nedir?"
              entries={[ { value: data["goal"]??"", key:"goal", example:[ 'örneğin; kilo verip kas oranımı korumak', 'dengeli kilo alıp kas kütlesi eklemek'], verify:'', long:true } ]} 
            />,
            <Select key="reach" defaultValue={data["reach"]??""} usekey="reach" question="Duhabum Koçluğa Nereden Ulastiniz?" options={['instagram', 'youtube', 'tiktok', 'diğer']} setObject={( theList, direction) => setObject( theList, direction)}/>,
            <Select key="gender" defaultValue={data["gender"]??""} usekey="gender" question="cinsiyetiniz" options={['ERKEK', 'KADIN']} setObject={( theList, direction) => setObject( theList, direction)}/>,
            <Calculator key="BMR" 
              display={{label: "BMR", unit: "Kalori / Gün", val: calculateBMR([data["weight"]??78, data["height"]??178, data["years"]??19])}}
              Values={[
                {val:data["weight"]??78, unit:"kg", label:"kilo", range:[30,300]}, 
                {val:data["height"]??178, unit:"cm", label:"boy", range:[100,260]}, 
                {val:data["years"]??19, unit:"yıl", label:"yaş", range:[6,100]}]} 
              calculate={calculateBMR} 
              setObject={(theList:any[], direction:number) => setList(["weight", "height", "years", "BMR"], theList, direction)}
            />,
            <Info text="Toplam Enerji Harcaması: vücudunuzun bir günde yaktığı toplam kalori miktarını hesaplayalım" turnPage={turnPage} />,
            <TDEE BMR={calculateBMR([data.weight, data.height, data.years])??1762} value={data["PAL"]??2} setList={setList} />,
            <Calculator key="meal" Description="Günde ortalama Kaç öğün tüketiyorsunuz?"
              Values={[ {val:data["meals"]??2, unit:"öğün", label:"günde", range:[0,12]} ]} 
              setObject={(theList:any[], direction:number) => setList(["meals"], theList, direction)}
            />,
            <AskText key="protein" setObject={( theList, direction) => setObject( theList, direction)}
              question="protein, yağ, karbonhidrat sebze veya yeşillik olarak sık tükettiğiniz gıdaları bütçeni dikkate alarak yazar mısın"
              entries={[
                { value: data["protein"]??"", key:"protein", example:[ 'protein kaynakların', 'hindi, yumurta, tavuk', 'balik, kirmizi et'], verify:'' },
                { value: data["carbohydrates"]??"", key:"carbohydrates", example:[ 'karbonhidrat kaynakların', 'makarna, bulgur, ekmek', 'pirinç, yulaf'], verify:'' },
                { value: data["vegetable"]??"", key:"vegetable", example:[ 'sebze ve yeşillik', 'marul, salatalik', 'brokoli, biber' ], verify:'' },
                { value: data["fats"]??"", key:"fats", example:[ 'yağ kaynakların', 'tereyagi ', 'zeytinyagi' ], verify:'' },
              ]} 
            />,
            <AskText key="supplement" setObject={( theList, direction) => setObject( theList, direction)}
              question="Supplement Kullaniyor Musunuz? Kullandiklarinizi Yazar Misiniz?"
              entries={[ { value: data["supplement"]??"", key:"supplement", example:[ 'kullanmıyorum', 'protegin tozu', 'creatine omega 3', 'vitamin hapı'], verify:'' },]} 
            />,
            <Calculator key="budget" Description="Toplam beslenme veya supplement için ayırdığın veya ayırabileceğin aylık bütçe"
              Values={[ {val:data["budget"]??1000, unit:"tl", label:"bütçe", step:200, range:[0,99999]} ]} 
              setObject={(theList:any[], direction:number) => setList(["budget"], theList, direction)}
            />,
            <AskText key="allergy" setObject={( theList, direction) => setObject( theList, direction)}
              question="Besin Alerjiniz Var Mi?"
              entries={[ { value: data["allergy"]??"", key:"allergy", example:[ 'Alerjen', 'ör. yumurta', 'fıstık', 'süt, soya' ], verify:'' },]} 
            />,
            <AskText key="disease" setObject={( theList, direction) => setObject( theList, direction)}
              question="Kronik Hastaliginiz Var Mi?"
              entries={[ { value: data["disease"]??"", key:"disease", example:[ 'ör. Kronik rahatsızlık', 'Şeker Hastalığı', 'Yüksek Tansiyon', 'Kalp Yetmezliği', 'Astim, Epilepsi' ], verify:'' },]} 
            />,
            <AskText key="injury" setObject={( theList, direction) => setObject( theList, direction)}
              question="Daha önce yaşadığınız bir sakatlık var mı?"
              entries={[ { value: data["injury"]??"", key:"injury", example:[ 'ör. kas-iskelet sorunları', 'Menisküs Yırtığı', 'Omuz Çıkığı, Bel Ağrısı', 'Ön Çapraz Bağ (ACL) Yırtığı' ], verify:'' },]} 
            />,
            <Calculator key="GymHistory" Description="Daha önce spor salonuna gittin mi gittiysen kaç ay"
              Values={[ {val:data["GymHistory"]??0, unit:"ay", label:"", range:[0,300]} ]} 
              setObject={(theList:any[], direction:number) => setList(["GymHistory"], theList, direction)}
            />,
            <Calculator key="GymCurrently" Description="kac aydir Aktif Olarak GYMe gidiyorsun?"
              Values={[ {val:data["GymCurrently"]??0, unit:"ay", label:"", range:[0,300]} ]} 
              setObject={(theList:any[], direction:number) => setList(["GymCurrently"], theList, direction)}
            />,
            <AskText key="chest" setObject={( theList, direction) => setObject( theList, direction)}
              question="Her kas grubu icin formunu en iyi bildiğiniz 2 egzersiz yazar mısın"
              entries={[ 
                { value: data["chest"]??"", key:"chest", example:[ 'göğüs', 'Bench Press, Machine Chest Fly' ], verify:'' },
                { value: data["shoulder"]??"", key:"shoulder", example:[ 'ör. omuz', 'Smith Machine Shoulder Press', 'Dumbbell Lateral Raise' ], verify:'' },
                { value: data["back"]??"", key:"back", example:[ 'ör. sırt', 'Lat Pulldown, Barbell Row' ], verify:'' },
              ]} 
            />,
            <AskText key="forearm" setObject={( theList, direction) => setObject( theList, direction)}
              question="Her kas grubu icin formunu en iyi bildiğiniz 2 egzersiz yazar mısın"
              entries={[ 
                { value: data["forearm"]??"", key:"forearm", example:[ 'ör. ön kol', 'Dumbell Curl, Hammer Curl' ], verify:'' },
                { value: data["reararm"]??"", key:"reararm", example:[ 'ör. arka kol', 'Pushdown (halat)', 'Cable Triceps Pushdown' ], verify:'' },
                { value: data["leg"]??"", key:"leg", example:[ 'ör. bacak', 'Leg Press, Leg extension' ], verify:'' }
              ]} 
            />,
            <Calculator key="GymDays" Description="haftada kac gun kac dakika spora ayırmayı planlıyorsun"
              Values={[ 
                {val:data["GymDaysinWeek"]??5, unit:"gün", label:"haftada", range:[1,7]}, 
                {val:data["GymTimeinDay"]??90, unit:"dk", label:"günde", step:10, range:[0,300]} ]} 
              setObject={(theList:any[], direction:number) => setList(["GymDaysinWeek", "GymTimeinDay"], theList, direction)}
            />,
            <Info text="tesekkür ederiz size en kısa sürede whatsapp üzerinden dönüş sağlayacağız " turnPage={turnPage} />
    ];



    return (
        
        <main className={"center flex-col md:flex-row"} style={{ fontSize: "1.1rem" }}>
        
            { questions[page] }

        </main>
    );
}