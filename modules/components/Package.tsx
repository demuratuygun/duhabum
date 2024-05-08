
type PackageType = {
  plan:string;
  price:number;
  duration:string;
  content:string[];
}

export default function Package({pack, click}:{pack:PackageType, click?:Function}) {
  return (
      <div style={{ margin: '1rem', width: "20rem", padding: "3.2rem 3rem 2.4rem 3rem" }} className={click==null?"":'box'}>
        <div className="text">{pack.plan}</div>
        <div className="text" style={{ fontSize: "2.7rem", fontWeight: 500}}> ₺{pack.price} <span style={{ fontSize: "1.2rem" }}>{pack.duration}</span></div>
        <ul style={{ margin: "1rem 0rem 1rem 1.6rem", paddingBottom: "0.8rem", listStyleImage: "url('check.svg')" }}>
            {pack.content.map( item => 
                <li style={{opacity: 0.7, lineHeight: "2.4rem", paddingLeft: "3px"}}>{item}</li> 
            )}
        </ul>
        {click==null? null: <button onClick={() => click()}>katıl</button>}
      </div>
  );
}
