import Image from 'next/image';
import styles from './frames.module.css';
import SocialMedia from '../components/Social';

export default function ContactFrame() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>

        <Image style={{ paddingTop: '50px' }} src="/backindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>

        <div style={{ display: "flex", flexDirection: "row", margin: "4%", paddingBottom: "10%", zIndex: 900 }}> 
            {[1,1,1].map( i => 
            <div style={{ display: "flex", flexDirection: "column", margin: "1rem", width: "250px", padding: "2.2rem 2rem" }} className='box'>
                <Image style={{ marginBottom: "1.5rem" }} src={"/profiles/"+i+".png"} height={96} width={96} alt="duha bum in dark"/>
                <div className='text' style={{ fontSize: "1.5rem", fontWeight: 500 }}> mehmet ozgor </div>
                <div className='text' style={{ fontSize: "1rem", opacity: 0.7 }}> bir ayda etkisini gosterdi harika tek kelimeyle </div>
            </div>
            )}
        </div>

        <div style={{ position: "absolute", bottom: "5%", left: "10%" }}>
            <SocialMedia />
        </div>
        
        
    </div>
  );
}
