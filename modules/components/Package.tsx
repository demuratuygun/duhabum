import { useState } from 'react';
import styles from './component.module.css';
import PickNumber from './dialogue/PickNumber';

type PackageType = {
  plan:string;
  prices:number[];
  duration:number[];
  content:string[];
  unit:string;
  default:number;
}

export default function Package({pack, click}:{pack:PackageType, click?:Function}) {

  const [duration, setDuration] = useState(pack.default);

  const padNumber = (val:string) => {
    return val.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }

  return (
      <div style={{ margin: '1rem', width: "20rem", padding: "3.2rem 3rem 2.4rem 3rem" }} className={click==null?"noSelect":'box noSelect'}>
        
        <div className="text" style={{ textAlign:"center" }}>{pack.plan}</div>
        
        <div className="text" style={{ fontSize: "2.7rem", fontFamily:"1rem", textAlign:"center", fontWeight: 500, padding: 0 }}> 
          <span>₺ {padNumber(pack.prices[duration]*duration+"")}</span>
        </div>

        { pack.duration[1]>pack.duration[0]?
        <div className='noSelect' style={{ width: "100%", textAlign:"center", fontSize: "0.8rem", }}>
          <div className="text" style={{ fontSize: "1.2rem", textAlign:"center", position:"relative", top: -11 }}>
            <span style={{ fontWeight:500, color:"#DFDFDF80" }}>₺ {padNumber(pack.prices[duration]+"")} </span>
            <span style={{ fontWeight:300, color:"#DFDFDF80" }}>{' / '+pack.unit}</span>
          </div>
          <PickNumber label='süre' value={duration} unit={pack.unit} range={pack.duration} onChange={(change:number) => setDuration(change)}/>
        </div>
        :null
        }

        <ul style={{ margin: "1rem 0rem 1rem 1.6rem", paddingBottom: "0.8rem", listStyleImage: "url('check.svg')", color:"#DFDFDF80" }}>
            {pack.content.map( (item, i) => 
                item!='100% gelişim garantisi'|| duration>2?
                <li key={i} style={{ lineHeight: "2.2rem", paddingLeft: "3px"}}>{item}</li> : null
            )}
        </ul>
        
        {click==null? null: <div style={{ width:"100%", display:"flex", justifyContent: "center"}}><button onClick={() => click()}>katıl</button></div>}
      </div>
  );
}