'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css';
import PickNumber from './dialogue/PickNumber';
import Text from './Text';
import Promotions from './../../content/promotions.json';

type PackageType = {
  plan: string;
  prices: number[];
  duration: number[];
  content: string[];
  unit: string;
  default: number;
}

export default function Package({ pack, click }: { pack: PackageType, click?: (month:number)=>void }) {
  
  const [duration, setDuration] = useState(pack.default);
  const [label, setLabel] = useState('süre');


  const padNumber = (val: string) => {
    return val.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }

  const handleDurationChange = (value: number) => {
    let label = '%'+Math.ceil((1- (pack.prices[pack.duration.indexOf(value)]/pack.duration[pack.duration.indexOf(value)]/mothlyFullPrice))*100)+" farkla";
    setLabel(value==1? 'yalnız' : label);
    setDuration(value);
  }

  const mothlyFullPrice = pack.prices[0]/pack.duration[0];
  const mothlyPrice = Math.floor(pack.prices[pack.duration.indexOf(duration)] / duration);
  

  return (
    <div style={{position:"relative"}}>



    { // Premium background ---
    
    pack.plan=="Premium"?
      <div style={{ width:"calc(100% - 2rem)", height:'calc(50% - 2rem)', position:"absolute", top:'1rem', left:'1rem', backgroundColor:"#0000", borderRadius:"12px 12px 0px 0px", overflow:"hidden", border: "#0009 solid 1px" }}>
        <div style={{ width:'100%', height:'130%', position:'absolute', top:'-10rem', backgroundImage: 'radial-gradient(#C9C9C988, #C9C9C911 80%)' }}></div>
      </div>
    :null}

    {pack.plan=="Premium"? //filter: 'hue-rotate(160deg)',
      <div style={{ margin: '1rem', position:"absolute", left:0, top: 0, background: "url('/waves.gif') no-repeat center", backgroundSize:"cover", opacity:0.25, zIndex:1, width: "calc(100% - 2rem)", height: "calc(100% - 2rem)", borderRadius:"14px" }}></div>
    :null}





    <div className={click == null ? "noSelect" : 'box noSelect'}
      style={{ margin: '1rem', width: "20rem", padding: "3.2rem 3rem 2.4rem 3rem", position: 'relative', zIndex:100 }}>
      
      { duration == 1 ? null :
        <div style={{ zIndex:100, position: "absolute", top: '-0.8rem', width: "calc(100% - 6rem)", display:'flex', justifyContent:'center' }}>
          <div style={{ width:'fit-content', textAlign:"center", backgroundColor: '#B7FE04', color: "#222", padding: '0.3rem 1rem', borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 500, lineHeight:'1rem' }}>
            { pack.plan=="Premium"? "Son 2 Kontenjan ": "Son 3 Kontenjan" }
          </div>
        </div>
      }

      <div className="text" style={{ fontSize:'1.4rem', textAlign: "center", zIndex:100 }}>{pack.plan}</div>

      <div className="text" style={{ position:'relative', zIndex:100, fontSize: "2.7rem", fontFamily: "1rem", textAlign: "center", fontWeight: 500, padding: 0 }}>
        <span> ₺ {padNumber(mothlyPrice + "")} </span>
        { duration > 1 ? 
        <span style={{ fontWeight: 300, fontSize: "1.4rem", color: "#DFDFDF80" }}>
          {' / ' + pack.unit}
          <div style={{position:"absolute", top:'0.16rem', left:'9.7rem', fontSize:'1.2rem', fontWeight:350, textDecoration:'line-through', color:"#B7FE0466" }}> 
            {/*"₺"+padNumber(Math.floor(pack.prices[0] / (pack.duration[0])) + "")*/} 
          </div>
        </span> : null
        }
      </div>


      <div key={'subtitle-0'} className="text" style={{ zIndex:100,opacity:0.6, textAlign: "center", position: "relative", top: -8, fontWeight: 300, fontSize:"1.2rem", color: "#DFDFDF80" }}>
        {duration==1? 
          <div key="toplam">toplam {padNumber(pack.prices[pack.duration.indexOf(duration)]+'')}</div>
          : 
          <div key="yerine"><span style={{textDecoration:'line-through'}}>{padNumber(pack.prices[0]*duration+"")}</span> yerine ₺ {padNumber(pack.prices[pack.duration.indexOf(duration)]+'')}</div>
        }
      </div>

      <div key={'subtitle-1'} className="text" style={{ zIndex:100, textAlign: "center", position: "relative", top: -8, fontWeight: 300, fontSize:"0.75rem", color: "#DFDFDF80" }}>
        *taksit seçeneklerimiz mevcuttur
      </div>

      
      { pack.duration.length==1? null:
        <div className='noSelect' style={{zIndex:100, width: "100%", textAlign: "center", fontSize: "0.9rem" }}>
          <PickNumber label={"süre"} value={duration} unit={pack.unit} range={{ values: pack.duration }} onChange={handleDurationChange} />
        </div>
      }



      <ul style={{ margin: "1rem 0rem 1rem 1.6rem", paddingBottom: "0.8rem", listStyleImage: "url('check.svg')", color: "#bbb", fontWeight: 500 }}>
        { pack.content.map((item, i) =>
          item != '100% gelişim garantisi' || duration > 2 ?
            <li key={i} 
              //className={ (pack.plan=="Premium" && ( i<=2)) || (pack.plan=="Essential" && ( i<=0)) ? styles.gradientText:''} 
              style={{ paddingBottom:'0.9rem', paddingLeft: "3px" }}>
                {item}
            </li>
            : null
        )}
      </ul>
      


      {click == null ? null : 
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button style={{ border: pack.plan=="Premium"? '#fff4 solid 1px':'' }} onClick={() => click(duration)}>katıl</button>
        </div>}
    
    </div>

    </div>
  );
}
