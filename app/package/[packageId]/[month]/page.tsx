'use client'
import Package from "@/modules/components/Package";
import { motion, useScroll } from "framer-motion";
import packages from '../../../../content/package.json';
import { useRouter } from "next/navigation";
import Arrow from "@/modules/icons/cancel";


import styles from './package.module.css';
import Display from "@/modules/components/dialogue/Display";
import PickNumber from "@/modules/components/dialogue/PickNumber";
import Next from "@/modules/icons/Next";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { describe } from "node:test";
import CreditCard from "@/modules/components/dialogue/CreditCard";
import Calculator from "@/modules/components/dialogue/Calculator";
import Control from "@/modules/components/dialogue/Control";
import Text from '@/modules/components/Text';
import Select from "@/modules/components/dialogue/Select";
import AskText from "@/modules/components/dialogue/AskText";
import Login from "@/modules/components/Login";
import MakeOffer from "@/modules/components/dialogue/MakeOffer";
import Checkout from "@/modules/components/dialogue/Checkout";




interface InputProps { turnPage: (param: number) => void; name: string; }
const Input:React.FC<InputProps> = ({turnPage, name}) => {
  const [myCard, setMyCard] = useState(true);
  

  return(
    <>
    
    <div style={{ maxWidth: "100vw", padding: "4%", display: 'flex', flexDirection: "column", gap: 15 }}>
      
      <CreditCard name={name}/>
      
      <div style={{ marginTop: "2rem", width:"100%", lineHeight:"1.5rem" }}>

        <div style={{ opacity: 0.5, width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
          <div onClick={()=>setMyCard(true)} className="text noSelect">Duhabum Essential kocluk 6 ay</div>
          <div style={{ minWidth: '6rem', textAlign: "right" }} onClick={()=>setMyCard(false)} className="text noSelect">5500₺</div>
        </div>
        <div style={{ opacity: 0.5, width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
          <div onClick={()=>setMyCard(true)} className="text noSelect">%15 ogrenci indirimi</div>
          <div style={{ minWidth: '6rem', textAlign: "right" }} onClick={()=>setMyCard(false)} className="text noSelect">-775 ₺</div>
        </div>
        <div style={{ width: "100%", fontSize:"2rem", fontWeight:500 ,textAlign: "right", padding: '1.8rem 0.5rem', marginTop: '0.6rem', borderTop:"1px solid #2a2a2a" }} className="text"> 
          4775<span style={{fontWeight:500, paddingLeft:7}}>₺</span>
        </div>
      </div>

    </div>
    <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}



interface InfoProps { text:string, turnPage: (param: number) => void }
const Info:React.FC<InfoProps> = ({ text, turnPage }) => {
  return(
    <>
      <p style={{ fontWeight: 400, fontSize: '1.5rem', lineHeight: '1.9rem' }}>
        <Text text={text} />
      </p>
      <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}





interface TDEEProps { BMR:number, value: number, setList: (keys:string[],  theList:any[], direction:number) => void }
const TDEE:React.FC<TDEEProps> = ({ BMR, value, setList }) => {

  const activityLevels = [
    {level: 1, title:"Hareketsiz (Sedanter)", text: "Günün büyük kısmını oturarak geçirenler", factor:1.4, value: 10, unit:"dk'dan az"},
    {level: 2, title:"Hafif Aktif", text: "Günlük rutininiz bazı yürüyüşler içeriyorsa. Öğrenci, ofis çalışanı", factor:1.5, value: 25, unit:"dk'dan a"},
    {level: 3, title:"Orta Düzeyde Aktif", text: "Görece hareketli veya gün içinde ayakta olmayi gerektiren bir rutinin varsa, Öğretmen, Kasiyer", factor:1.6, value: 40, unit:"dk'dan az"},
    {level: 4, title:"Çok Aktif", text: "Fiziksel olarak efor gerektiren bir rutininiz varsa, temizlik görevlisi, perekende çalışanı", factor:1.8,  value: 60, unit:"dk'dan az"},
    {level: 5, title:"Son Derece Aktif", text: "fiziksel olarak zorlu bir rutininiz varsa, Profesyonel sporcular, ağır fiziksel işlerde çalışanlar", factor:2, value: 90, unit:"dk'dan çok "},
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
          setObject={(theList:any[], direction:number) => setList(["PAL"], theList, direction)}
        />
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{delay:0.5, duration:1}} className="noSelect" style={{ position:"absolute", left: 0, bottom: "8rem", height:"180px", width:"100%", display:"flex", alignItems: "center", justifyContent: "center", fontWeight: 200, color: "#DFDFDFa0", textAlign: "center", fontSize: "1.1rem", lineHeight: "1.36rem"}}>
          <div style={{ width: '320px', padding: '0px 1em' }}>
            <span style={{ fontWeight: 500, color: "#DFDFDFe0", maxWidth:"400px" }}>{activityLevels[level]["title"]}</span><br/>{activityLevels[level]["text"]}
          </div>
        </motion.div>

      
    </>
  )

}



export default function Form({params}:{params:{packageId:number, month:string}}) {

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
      console.log(d);
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
      console.log(d);
      return d;
    })
    setPage( prevPage => prevPage+direction);
  }

  const turnPage = (dir:number) => {
    setPage( prevPage => prevPage+dir)
  } 

  useEffect(() => {
    if( page<0 ) router.back();
      else if( page>= questions.length ) router.push("/"); 
  }, [page]);
  
  const calculateBMR = (values:number[]) => {
    //if( data['gender'] && data['gender']=='man' )
      return 88.362 + (13.397 * values[0]) + (4.799 * values[1]) - (5.677 * values[2]);
    //BMR=447.593+(9.247×weight in kg)+(3.098×height in cm)−(4.330×age in year for woman
  }

  const questions = [
          <MakeOffer plan={packages.tr[params.packageId]} months={parseInt(params.month)} setObject={( theList, direction) => setObject( theList, direction)}/>,
          <Checkout setObject={( theList, direction) => setObject( theList, direction)} data={data.checkout??{}}/>,
          <AskText setObject={( theList, direction) => setObject( theList, direction)}//Basal Metabolizma Hizi: vücudun dinlenme halindeyken kullandığı minimum enerji
            question="iletişim bilgileri"
            entries={[
              { value: data["name"]??"", key:"name", example:[ 'isim soyisim', 'duha duman'], verify:"^[a-zA-Z ]{3,}$" },
              { value: data["phone"]??"", key:"phone", example:[ 'telefon girin', '0 555 555 55 55'], verify:'^\\d{10,}$' }
            ]} key="name"
          />,
          <Input turnPage={turnPage} name={data["name"]??""} />,
          <Info text="Soracagimiz sorulara gore antreman plani olusturulacaktir lutfen dikkatli cevap verin" turnPage={turnPage} />,
          <AskText key="goal" setObject={( theList, direction) => setObject( theList, direction)}
            question="Duhabum Koçluk Hizmeti ile Hedefiniz Nedir?"
            entries={[ { value: data["goal"]??"", key:"goal", example:[ 'örneğin; kilo verip kas oranımı korumak', 'dengeli kilo alıp kas kütlesi eklemek'], verify:'', long:true } ]} 
          />,
          <Select key="reach" defaultValue={data["reach"]??""} usekey="reach" question="Duhabum Koçluga Nereden Ulastiniz?" options={['instagram', 'youtube', 'tiktok', 'diğer']} setObject={( theList, direction) => setObject( theList, direction)}/>,
          <Select key="gender" defaultValue={data["gender"]??""} usekey="gender" question="cinsiyetiniz" options={['ERKEK', 'KADIN']} setObject={( theList, direction) => setObject( theList, direction)}/>,
          <Calculator key="BMR" 
            display={{label: "BMR", unit: "Kalori / Gün", val: calculateBMR([data["weight"]??78, data["height"]??178, data["years"]??19])}}
            Values={[
              {val:data["weight"]??78, unit:"kg", label:"kilo", range:[30,300]}, 
              {val:data["height"]??178, unit:"cm", label:"boy", range:[100,260]}, 
              {val:data["years"]??19, unit:"yıl", label:"yaş", range:[6,100]}]} 
            calculate={calculateBMR} 
            setObject={(theList:any[], direction:number) => setList(["weight", "height", "years"], theList, direction)}
          />,
          <Info text="Toplam Enerji Harcaması: vücudunuzun bir günde yaktığı toplam kalori miktarı" turnPage={turnPage} />,
          <TDEE BMR={calculateBMR([data.weight, data.height, data.years])??1762} value={data["PAL"]??2} setList={setList} />,
          <Calculator key="meal" Description="Günde ortalama Kaç öğün tüketiyorsunuz?"
            Values={[ {val:data["meals"]??2, unit:"öğün", label:"günde", range:[0,12]} ]} 
            setObject={(theList:any[], direction:number) => setList(["meals"], theList, direction)}
          />,
          <AskText key="protein" setObject={( theList, direction) => setObject( theList, direction)}
            question="protein, yağ, karbonhidrat sebze veya yeşillik olarak sık tuketiğiniz gıdaları bütçeni dikkate alarak yazar mısın"
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
          <Calculator key="budget" Description="Toplam beslenme veya supplement için ayırdığın veya ayırabileceiğin aylık bütçe"
            Values={[ {val:data["budget"]??1000, unit:"tl", label:"bütçe", step:200, range:[0,99999]} ]} 
            setObject={(theList:any[], direction:number) => setList(["budget"], theList, direction)}
          />,
          <AskText key="allergy" setObject={( theList, direction) => setObject( theList, direction)}
            question="Besin Alerjiniz Var Mi?"
            entries={[ { value: data["allergy"]??"", key:"allergy", example:[ 'Alerjen', 'yumurta', 'fıstık', 'süt, soya' ], verify:'' },]} 
          />,
          <AskText key="disease" setObject={( theList, direction) => setObject( theList, direction)}
            question="Kronik Hastaliginiz Var Mi?"
            entries={[ { value: data["disease"]??"", key:"disease", example:[ 'Kronik rahatsızlık', 'Şeker Hastalığı', 'Yüksek Tansiyon', 'Kalp Yetmezliği', 'Astim, Epilepsi' ], verify:'' },]} 
          />,
          <AskText key="injury" setObject={( theList, direction) => setObject( theList, direction)}
            question="Daha önce yasadiginiz bir sakatlık var mı?"
            entries={[ { value: data["injury"]??"", key:"injury", example:[ 'kas-iskelet sorunları', 'Menisküs Yırtığı', 'Omuz Çıkığı, Bel Ağrısı', 'Ön Çapraz Bağ (ACL) Yırtığı' ], verify:'' },]} 
          />,
          <Calculator key="history" Description="Daha once spor salonuna gittin mi gittiysen kaç ay"
            Values={[ {val:data["GymHistory"]??0, unit:"ay", label:"", range:[0,300]} ]} 
            setObject={(theList:any[], direction:number) => setList(["GymHistory"], theList, direction)}
          />,
          <Calculator key="gym" Description="kac aydir Aktif Olarak GYMe gidiyorsun?"
            Values={[ {val:data["GymCurrently"]??0, unit:"ay", label:"", range:[0,300]} ]} 
            setObject={(theList:any[], direction:number) => setList(["GymCurrently"], theList, direction)}
          />,
          <AskText key="chest" setObject={( theList, direction) => setObject( theList, direction)}
            question="Her kas grubu icin formunu en iyi bildiginiz 2 egzersiz yazar mısın"
            entries={[ 
              { value: data["chest"]??"", key:"chest", example:[ 'göğüs', 'Bench Press, Machine Chest Fly' ], verify:'' },
              { value: data["shoulder"]??"", key:"shoulder", example:[ 'omuz', 'Smith Machine Shoulder Press', 'Dumbbell Lateral Raise' ], verify:'' },
              { value: data["back"]??"", key:"back", example:[ 'sırt', 'Lat Pulldown, Barbell Row' ], verify:'' },
            ]} 
          />,
          <AskText key="forearm" setObject={( theList, direction) => setObject( theList, direction)}
            question="Her kas grubu icin formunu en iyi bildiginiz 2 egzersiz yazar mısın"
            entries={[ 
              { value: data["forearm"]??"", key:"forearm", example:[ 'ön kol', 'Dumbell Curl, Hammer Curl' ], verify:'' },
              { value: data["reararm"]??"", key:"reararm", example:[ 'arka kol', 'Pushdown (halat)', 'Cable Triceps Pushdown' ], verify:'' },
              { value: data["leg"]??"", key:"leg", example:[ 'bacak', 'Leg Press, Leg extension' ], verify:'' }
            ]} 
          />,
          <Calculator key="GymDays" Description="haftada kac gun kac dakika spora ayirmayi planliyorsun"
            Values={[ 
              {val:data["GymDaysinWeek"]??5, unit:"gün", label:"haftada", range:[1,7]}, 
              {val:data["GymTimeinDay"]??90, unit:"dk", label:"günde", step:10, range:[0,300]} ]} 
            setObject={(theList:any[], direction:number) => setList(["GymDaysinWeek", "GymTimeinDay"], theList, direction)}
          />,
          <Info text="tesekkür ederiz size en kısa sürede whatsapp üzerinden dönüş sağlayacağız " turnPage={turnPage} />
  ];

  //<Start title="Basal Metabolizma Hizi" text="vücudun dinlenme halindeyken kullandığı minimum enerji" turnPage={turnPage} />:
  return (

    <main className={"center flex-col md:flex-row"} style={{ fontSize: "1.1rem" }}>
      
      { questions[page] }

    </main>
  
  );
}

  // <AskText  setObject={( theList, direction) => setObject( theList, direction)}
  //   question="Supplement Kullaniyor Musunuz? Kullandiklarinizi Yazar Misiniz?"
  //   entries={[
  //     { key:"supplement", example:['Yok', 'Whey Protein 2000 Gr', 'Protein Bar 50 Gr'], verify:'.{2,}' }
  //   ]} 
  // />