'use client'
import Package from "@/modules/components/Package";
import { motion } from "framer-motion";
import packages from '../../../content/package.json';
import { useRouter } from "next/navigation";
import Arrow from "@/modules/icons/cancel";

import Image from 'next/image';
import styles from './package.module.css';
import Display from "@/modules/components/dialogue/Display";
import PickNumber from "@/modules/components/dialogue/PickNumber";
import Next from "@/modules/icons/Next";
import { useEffect, useState } from "react";
import { describe } from "node:test";


interface InputProps { turnPage: (param: number) => void }
const Register:React.FC<InputProps> = ({turnPage}) => {
  const [gender, setGender] = useState("man");

  return(
    <>
    <div style={{display: 'flex', flexDirection: "column", gap: 15}}>

      <div style={{ margin:"3rem 1rem", fontFamily:"'Sarpanch', sans-serif", fontWeight:800, fontSize:"2.5rem",lineHeight:"1.75rem" }}><span style={{fontSize:"1.2rem"}}>{" BASIC"}</span><br/> DUHABUM </div>
      <input type="text" placeholder="eposta"/>
      <input type="password" placeholder="parola belirle"/>
      <div style={{margin: "1rem", padding: "0.3rem"}}>
        <span style={{ opacity: gender=="man"?1:0.4}} onClick={()=>setGender("man")} className="text noSelect">erkek</span>
        <span style={{ paddingLeft: '1rem', opacity: gender=="woman"?1:0.4}} onClick={()=>setGender("woman")} className="text noSelect">kadin</span>
      </div>
      
    </div>
    <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}


interface InputProps { turnPage: (param: number) => void }
const Input:React.FC<InputProps> = ({turnPage}) => {
  const [myCard, setMyCard] = useState(true);
  

  return(
    <>
    <div style={{display: 'flex', flexDirection: "column", gap: 15}}>
      
      <div style={{ position:"relative", borderRadius: "8px", backgroundColor: "#5554", width: "24rem", height: "16rem", maxWidth: "90%", margin:"5%" }}>
        <Image style={{margin: "2rem"}} src="/chip.png" height={38} width={50} alt="duha bum in dark"/>
        <div style={{ margin: "1.5rem 1rem", position: 'absolute', bottom: 0 }}>
          <input className="creditcard" type="text" placeholder="ISIM SOYISIM"/>
          <input className="creditcard" type="text" placeholder="xxxx xxxx xxxx xxxx"/>
        </div>
      </div>

      <div style={{margin:"0px 5%"}}>
        <input className="creditcard" style={{ minWidth:"110px", width:"6rem", float:"left"}} type="text" placeholder="AY YIL"/>
        <input className="creditcard" style={{ minWidth:"110px", width:"6rem", float:"right", textAlign:"right"}} type="text" placeholder="CVV"/>
      </div>
      
      <div style={{marginTop: "2rem", margin:"5%" }}>
        {myCard? null:<><input style={{ minWidth:"100px", width:"24rem" }} type="text" placeholder="ISIM SOYISIM"/><br/></>}
        <input style={{ minWidth:"100px", width:"24rem" }} type="text" placeholder="TELEFON"/>
        <div style={{margin: "0rem 1rem", padding: "0.3rem"}}>
          <span style={{ opacity: myCard?1:0.4}} onClick={()=>setMyCard(true)} className="text noSelect">kart benim</span>
          <span style={{ paddingLeft: '1rem', opacity: myCard?0.4:1}} onClick={()=>setMyCard(false)} className="text noSelect">baskasinin</span>
        </div>
      </div>

    </div>
    <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}




interface CTRProps { turnPage: (param: number) => void }
const Control:React.FC<CTRProps> = ({ turnPage }) => {
  return(
    <div style={{position: "fixed" , right: "5rem", display:"flex", flexDirection:"row", rotate:"90deg"}}>
      <span style={{ rotate:"180deg", opacity: 0.5, paddingLeft: "5rem" }} onClick={() => turnPage(-1)}><Next/></span>
      <span onClick={() => turnPage(1)}><Next/></span>
    </div>
  )
}



interface InfoProps { title:string, text:string, turnPage: (param: number) => void }
const Info:React.FC<InfoProps> = ({ title, text, turnPage }) => {
  return(
    <>
      <div className="noSelect" style={{ fontWeight: 200, color: "#DFDFDF99", textAlign: "left", padding: "36px 30px", fontSize: "1.3rem", lineHeight: "1.8rem", marginBottom:"1rem", maxWidth:"30rem"}}>
        <span style={{ fontWeight: 500, position:"relative", bottom:20, color: "#DFDFDF", textAlign: "left" }}>{title}</span><br/>{text}
      </div>
      <Control turnPage={(dir) => turnPage(dir)}/>
    </>
  )
}



interface BMRProps { setObject: (param: any, direction:number) => void }
const BMR:React.FC<BMRProps> = ({ setObject }) => {

  const [BMR, setBMR] = useState(1762);

  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(74);
  const [years, setYears] = useState(19);

  useEffect( () => {
    setBMR( 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * years) )
  }, [height, weight, years] );

  const turnPage = (direction: number) => {
    setObject({"height": height, "weight": weight, "years": years, "BMR":BMR}, direction);
  }

  return(
    <>
      <div className={styles.container}>
        <Display value={BMR} label="BMR" unit="Kalori / Gün" />
        
        <PickNumber value={height} label="boy" unit="cm"  range={[100, 270]} onChange={(diff:number) => setHeight(prevHeight=>prevHeight+diff)}/>
        <PickNumber value={weight} label="kilo" unit="kg" range={[30, 300]} onChange={(diff:number) => setWeight(prevWeight=>prevWeight+diff)} />
        <PickNumber value={years} label="yaş" unit="yıl" range={[10, 100]} onChange={(diff:number) => setYears(prevYears=>prevYears+diff)} />

      </div>

      <Control turnPage={turnPage}/>
    </>
  )

}



interface TDEEProps { BMR:number, setObject: (param: any, direction:number) => void }
const TDEE:React.FC<TDEEProps> = ({ BMR, setObject }) => {

  const activityLevels = [
    {level: 1, title:"Hareketsiz (Sedanter)", text: "Masa başı işte çalışanlar, günün büyük kısmını oturarak geçirenler", factor:1.2, value: 10, unit:"dk'dan az"},
    {level: 2, title:"Hafif Aktif", text: "Günlük rutininiz bazı yürüyüşler içeriyorsa. Öğrenciler, ofis çalışanları", factor:1.375, value: 25, unit:"dk'dan a"},
    {level: 3, title:"Orta Düzeyde Aktif", text: "Gun icinde ayakta olmayi gerektiren bir rutinin varsa, Öğretmenler, kasa görevlisi", factor:1.55, value: 40, unit:"dk'dan az"},
    {level: 4, title:"Çok Aktif", text: "Fiziksel olarak efor gerektiren bir rutininiz varsa, posta taşıyıcıları, perekende çalışanları", factor:1.725,  value: 60, unit:"dk'dan az"},
    {level: 5, title:"Son Derece Aktif", text: "fiziksel olarak zorlu bir rutininiz varsa, Profesyonel sporcular, ağır fiziksel işlerde çalışanlar", factor:1.9, value: 90, unit:"dk'dan çok "},

  ]

  const [TDEE, setTDEE] = useState(2423);

  const [level, setLevel] = useState(1);
  const [title, setTitle] = useState("Hafif Aktif");
  const [text, setText] = useState("Günlük rutin yürüyüş içerir veya haftada bir veya iki kez yoğun egzersiz yapılır. Çoğu öğrenci bu kategoriye girer.");


  useEffect( () => {
    setTDEE( BMR* activityLevels[level]["factor"] )  
  }, [level] );

  const turnPage = (direction: number) => {
    setObject({"level": level}, direction);
  }

  return(
    <>
      <div className={styles.container} style={{paddingBottom:"6rem"}}>
        <Display value={TDEE} label="TDEE" unit="Kalori / Gün" />
        <PickNumber value={activityLevels[level]["level"]} range={[1, 5]} label="seviye" unit="" onChange={(diff:number) => setLevel(prevLevel=> prevLevel+diff)}/>
        <div className="noSelect" style={{ position:"absolute", top: "calc(50% + 4rem)", maxWidth:"20rem", padding: "36px 30px", fontWeight: 200, color: "#DFDFDFa0", textAlign: "center", fontSize: "1.1rem", lineHeight: "1.36rem"}}>
          <span style={{ fontWeight: 500, color: "#DFDFDFe0" }}>{activityLevels[level]["title"]}</span><br/>{activityLevels[level]["text"]}
        </div>
      </div>

      <Control turnPage={turnPage}/>
    </>
  )

}



interface ASKProps { title:string, setObject: (param: any, direction:number) => void }
const ASKhistory:React.FC<ASKProps> = ({ title, setObject }) => {

  const [ask, setAsk] = useState(title);
  const [GYM, setGYM] = useState(6);
  const [trainer, setTrainer] = useState(0);

  const turnPage = (direction: number) => { setObject({"trainer": trainer, "GYM":GYM}, direction) }

  return(
    <>
      <div className={styles.container}>
        <div className="noSelect" style={{ textAlign: "center", top:"3rem", paddingBottom: "5rem", fontWeight: 500, color: "#DFDFDF", fontSize: "1.4rem", lineHeight: "1.8rem" }}>{ask}</div>
        <PickNumber value={GYM} label="salon" unit="ay"  range={[0, 200]} onChange={(diff:number) => setGYM(prevGYM=>prevGYM+diff)}/>
        <PickNumber value={trainer} label="koçluk" unit="ay"  range={[0, 200]} onChange={(diff:number) => setTrainer(prevTrainer=>prevTrainer+diff)}/>

      </div>
      <Control turnPage={turnPage}/>
    </>
  )

}


interface ASKProps { title:string, setObject: (param: any, direction:number) => void }
const ASKweekly:React.FC<ASKProps> = ({ title, setObject }) => {

  const [ask, setAsk] = useState(title);
  const [GYM, setGYM] = useState(5);
  const [trainer, setTrainer] = useState(100);

  const turnPage = (direction: number) => { setObject({"trainer": trainer, "GYM":GYM}, direction) }

  return(
    <>
      <div className={styles.container}>
        <div className="noSelect" style={{ textAlign: "center", top:"3rem", paddingBottom: "5rem", fontWeight: 500, color: "#DFDFDF", fontSize: "1.4rem", lineHeight: "1.8rem" }}>{ask}</div>
        <PickNumber value={GYM} label="haftada" unit="gun"  range={[0, 7]} onChange={(diff:number) => setGYM(prevGYM=>prevGYM+diff)}/>
        <PickNumber value={trainer} label="günde" unit="saat" step={10} range={[0, 360]} onChange={(diff:number) => setTrainer(prevTrainer=>prevTrainer+diff)}/>

      </div>
      <Control turnPage={turnPage}/>
    </>
  )

}



interface ASKProps { title:string, setObject: (param: any, direction:number) => void }
const ASKbudget:React.FC<ASKProps> = ({ title, setObject }) => {

  const [ask, setAsk] = useState(title);
  const [GYM, setGYM] = useState(2000);
  const [trainer, setTrainer] = useState(100);

  const turnPage = (direction: number) => { setObject({"trainer": trainer, "GYM":GYM}, direction) }

  return(
    <>
      <div className={styles.container}>
        <div className="noSelect" style={{ textAlign: "center", top:"3rem", paddingBottom: "5rem", fontWeight: 500, color: "#DFDFDF", fontSize: "1.4rem", lineHeight: "1.8rem" }}>{ask}</div>
        <PickNumber value={GYM} label="butce" unit="tl" step={200} range={[0, 100000]} onChange={(diff:number) => setGYM(prevGYM=>prevGYM+diff)}/>
      </div>
      <Control turnPage={turnPage}/>
    </>
  )

}




export default function Form({params}:{params:{pid:number}}) {

  const router = useRouter()

  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(0);


  const setObject = (theObj:any, direction:number) => {
    setData( (prevData: any) => {
      let d = {...prevData};
      for (const [key, value] of Object.entries(theObj)) d[key] = value;
      return d;
    })
    setPage( prevPage => prevPage+direction);
  }

  const turnPage = (dir:number) => {
    setPage( prevPage => {
      let page = prevPage+dir;
      if( page<0 ) router.back();
      else if( page> 9 ) router.push("/"); 
      return page;
    })
  } 

  return (

    <main className={"center flex-col md:flex-row"}>
      
      {/* <Input params={params}/> */}
      
      { page==0? <Register turnPage={turnPage} />:
        page==1? <Info title="Basal Metabolizma Hizi" text="vücudun dinlenme halindeyken kullandığı minimum enerji" turnPage={turnPage} />:
        page==2? <BMR setObject={setObject} />:
        page==3? <Info title="Toplam Enerji Harcaması" text="vücudunuzun bir günde yaktığı toplam kalori miktarı" turnPage={turnPage} />:
        page==4? <TDEE BMR={data["BMR"]??1762} setObject={setObject} />:
        page==5? <ASKhistory title="Daha once spor salonuna gittin mi veya koçluk hizmeti aldın mı aldıysan kaç ay" setObject={setObject}/>:
        page==6? <ASKweekly title="haftada kac gun kac dakika spora ayirmayi planliyorsun" setObject={setObject}/>:
        page==7? <ASKbudget title="Toplam beslenme veya supplement icin ayirdigin butce" setObject={setObject}/>:
        page==8? <Input turnPage={turnPage} />:
        page==9? <Info title="tesekkur ederiz" text="size en kisa surede whatsapp uzerinden donus saglayacagiz" turnPage={turnPage} />:
        null
        
      }

    </main>
  
  );
}
