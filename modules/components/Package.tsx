import { useState } from 'react';
import styles from './component.module.css';
import PickNumber from './dialogue/PickNumber';


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

  const padNumber = (val: string) => {
    return val.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }

  const handleDurationChange = (value: number) => {
    setDuration(value);
  }

  const mothlyFullPrice = pack.prices[0]/pack.duration[0];
  const mothlyPrice = Math.floor(pack.prices[pack.duration.indexOf(duration)] / duration);

  return (
    <div style={{position:"relative"}}>

    {pack.plan=="Premium"?
      <div style={{ width:"calc(100% - 2rem)", height:'12rem', position:"absolute", top:'1rem', left:'1rem', backgroundColor:"#0000", borderRadius:"12px 12px 0px 0px", overflow:"hidden", border: "#0009 solid 1px" }}>
        <div style={{ width:'100%', height:'200%', position:'absolute', top:'-4rem', backgroundImage: 'radial-gradient(#C9C9C988, #C9C9C911 80%)' }}></div>
      </div>
    :null}


    <div className={click == null ? "noSelect" : 'box noSelect'}
      style={{ margin: '1rem', width: "20rem", padding: "3.2rem 3rem 2.4rem 3rem", position: 'relative' }}
    >

      {duration == 1 ? null :
        <div style={{ zIndex:100, position: "absolute", top: '-0.8rem', width: "calc(100% - 6rem)", display:'flex', justifyContent:'center' }}>
          <div style={{ width:'fit-content', backgroundColor: pack.plan=="Premium"?'#B7FE04':'#444', color: pack.plan=="Premium"?"#000":"#fffb", padding: '0.1rem 1rem', borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 500 }}>
            aylik %{Math.ceil((1- (pack.prices[pack.duration.indexOf(duration)]/pack.duration[pack.duration.indexOf(duration)]/mothlyFullPrice))*100)  } daha az
          </div>
        </div>
      }

      { pack.duration[1] > pack.duration[0] ?
        <div className='noSelect' style={{zIndex:100, width: "100%", textAlign: "center", fontSize: "0.8rem" }}>
          <PickNumber label={pack.plan} value={duration} unit={pack.unit} range={{ values: pack.duration }} onChange={handleDurationChange} />
        </div>
        : <div className="text" style={{ textAlign: "center", zIndex:100 }}>{pack.plan}</div>
      }
      <div className="text" style={{ zIndex:100, fontSize: "2.7rem", fontFamily: "1rem", textAlign: "center", fontWeight: 500, padding: 0 }}>
        <span> ₺ {padNumber(mothlyPrice + "")} </span>
        {pack.duration.length > 1 ? <span style={{ fontWeight: 300, fontSize: "1.4rem", color: "#DFDFDF80" }}>{' / ' + pack.unit}</span> : null}
      </div>

      <div className="text" style={{ zIndex:100, fontSize: "1rem", textAlign: "center", position: "relative", top: -11 }}>
        <span style={{ fontWeight: 300, color: "#DFDFDF80" }}> toplam <span style={{ fontWeight: 500, fontSize: "1.2rem" }}>{padNumber(pack.prices[pack.duration.indexOf(duration)] + "")}</span> </span>
      </div>

      <ul style={{ margin: "1rem 0rem 1rem 1.6rem", paddingBottom: "0.8rem", listStyleImage: "url('check.svg')", color: "#DFDFDF80", fontWeight: 500 }}>
        { pack.content.map((item, i) =>
          item != '100% gelişim garantisi' || duration > 2 ?
            <li key={i} 
              className={ item=="100% gelişim garantisi"? styles.gradientText:''} 
              style={{ paddingBottom:'0.9rem', paddingLeft: "3px" }}>
                {item}
            </li>
            : null
        )}
      </ul>

      {click == null ? null : <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><button onClick={() => click(duration)}>katıl</button></div>}
    
    </div>

    </div>
  );
}
