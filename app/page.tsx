import Logo from '@/modules/icons/Logo';
import Header from '@/modules/components/Header';
import Light from "@/modules/components/Ligth";

import IntroFrame from "@/modules/frames/Intro";
import MessageFrame from '@/modules/frames/Message';
import PackageFrame from '@/modules/frames/Package';
import Transition from '@/modules/frames/Transitions';
import ContactFrame from '@/modules/frames/Contact';
import { motion } from 'framer-motion';
import Whatsapp from '@/modules/components/Whatsapp';
import Process from '@/modules/frames/Process';
import Countdown from '@/modules/frames/Countdown';


export default function Home() {

  return (
    <main style={{ width: "100vw", overflow: 'clip' }} id="LangingPage">

      <div style={{ position: "fixed", top: "-200px", left: "calc(25vw - 400px)", rotate: "-12deg", zIndex: 10 }}><Light/></div>
      <div style={{ position: "fixed", top: '0px', right: "0px", width: "100vw", margin: "0px", zIndex: 1000 }}><Header/></div>
      <div style={{ position: "fixed", right: 20, top: 30, zIndex:999 }}><Logo type=''/></div>
      <Whatsapp />
      
      <div style={{ position: "absolute", top: 0, left:0, display: 'flex', flexDirection: 'column', gap: "200px", width: '100%', overflow: 'clip' }}>
        
        
        <IntroFrame />
        <Transition />
        <PackageFrame />
        <MessageFrame />
        <Process />
        <ContactFrame />

      </div>
        
    </main>
  );
}
