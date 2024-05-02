import Image from 'next/image';
import styles from './frames.module.css';

export default function TransitionFrame() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>

        <Image className={styles.picture3} src="/snapindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>
        <div className={styles.title} style={{fontSize: '3rem', position: 'relative', top: 0, left: 0, maxWidth: "none"}}>
            6 aylik degisim 
        </div>

        <div style={{ display: "flex", flexDirection: "row", margin: "4%", zIndex: 900 }}> 
            {[1,2,1].map( i => 
            <div style={{ display: "flex", flexDirection: "row", margin: "8px", width: "190px" }}>
                <Image style={{ margin: "7px" }} src={"/transitions/"+i+"before.png"} height={75} width={120} alt="duha bum in dark"/>
                <Image style={{ margin: "7px" }} src={"/transitions/"+i+"after.png"} height={75} width={120} alt="duha bum in dark"/>
            </div>
            )}
        </div>
        
        
    </div>
  );
}
