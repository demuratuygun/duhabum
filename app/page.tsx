import Logo from '@/modules/icons/Logo';
import Header from '@/modules/components/Header';
import Light from "@/modules/components/Ligth";

import IntroFrame from "@/modules/frames/Intro";
import MessageFrame from '@/modules/frames/Message';
import PackageFrame from '@/modules/frames/Package';
import TransitionFrame from '@/modules/frames/Transitions';
import ContactFrame from '@/modules/frames/Contact';



export default function Home() {
  return (
    <main style={{ width: "100vw", overflow: 'clip' }}>

      <div style={{ position: "fixed", top: "-200px", left: "calc(25vw - 400px)", rotate: "-12deg", zIndex: 10 }}><Light/></div>
      <div style={{ position: "fixed", top: '0px', right: "0px", width: "100vw", margin: "0px", zIndex: 900 }}><Header/></div>
      <div style={{ position: "fixed", right: 30, bottom: 30, zIndex:900 }}><Logo type='big'/></div>

      <div style={{ position: "absolute", top: 0, left:0, display: 'flex', flexDirection: 'column', gap: "200px", width: '100%', overflow: 'clip' }}>
        <IntroFrame />
        <MessageFrame />
        <PackageFrame />
        <TransitionFrame />
        <ContactFrame />
      </div>
        
    </main>
  );
}
