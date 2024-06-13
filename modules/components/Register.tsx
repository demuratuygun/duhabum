import { ChangeEvent, useEffect, useRef, useState } from "react";



const Register:React.FC = () => {
  
  const [warn, setWarn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailverifyed, setEmailverifyed] = useState(false);

  const firstfocus = useRef<HTMLInputElement>(null);

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const verifyEmail = (email:ChangeEvent<HTMLInputElement>):void => {
    setEmailverifyed(regexEmail.test(email.target.value));
    setEmail(email.target.value);
  }

  useEffect(() => {
    firstfocus.current?.focus();
  }, []);

  useEffect(()=> setWarn(false), [email, password])

  return(
    <>
    <div style={{display: 'flex', flexDirection: "column", gap: 15}}>

      <input className={emailverifyed?"verifyed":""} ref={firstfocus} type="text" placeholder="eposta" onChange={verifyEmail}/>
      <input style={{color: password.length>4? "#fff":"#EF2586"}} type="password" placeholder="parola belirle" onChange={e=> setPassword(e.target.value)}/>
      
      {warn?
      <div style={{ padding: "1rem" }}>
        {emailverifyed? "lütfen geçerli bir parola belirleyin":"lütfen geçerli bir eposta adresi girin"}
      </div>:null}

    </div>
    <button onClick={() => { if( emailverifyed && password.length>4 ) alert("next");else setWarn(true)}}>next</button>
    </>
  )
}