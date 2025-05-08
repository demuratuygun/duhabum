
import { Baloo_Tamma_2 } from 'next/font/google';
import { render } from '@/lib/render/render';


//{ "style": { "backgroundImage": "url('https://i.pinimg.com/736x/8d/02/78/8d027851735c3781e97676ed3d9d2276.jpg')", } },

const data = {
  "theme": "nordic",
  style: { '--primary-color': '#000',   "--primary-variant": '#F2EEEE', '--background-color': '#fff' },
  "items": [
  
    //{ id:'marqqkdf', ui: 'Marquee', text:['60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!'] },

    { "id": "garanti", "ui": "h3", "text": "100% SONUC GARANTISI AKSI TAKDIRDE PARANIZ IADE!", style: { textAlign: "center", } },

      {'id': 'dda', ui: 'form', 

        data: [
            
            { "id": "aciklama", "ui": "p", "text": "hemen katil", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
            
            { "id": "isim", "ui": "input", "name": "isim", "value": "", "examples": ["isim soyisim", "duha bum"], "verify": "^[\\p{L} ]{2,70}$", "explanation": "gecerli bir isim soyisim girin" },

            //{ "id": "kilo", "ui": 'number', "name": "kilo", "value": 67, unit: "kg", range: [30, 300] },
            { "id": "tel", "ui": "input", "type": "phone", "name": "phone", "value": "", "examples": ["telefon girin", "0 555 555 55 55"], "verify": "^[0-9 ]*$" },
            { "id": "email", "ui": "input", "name": "email", "value": "", "examples": ["eposta girin"], "verify": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
            
            { "id": "ui_32fdfgdf", "ui": "button", "type": "submit", text:'devam' },  

      ], tree: {

        "query": { "ui": "select", "id": "isim",  },
        "branches": [
          { "if":"/.*", leave: 
            {id: 'form2', ui: 'form', data: [
                { "id": "yas", "ui": "select", "question": "Yaş grubunuz", verify:{max:1}, "options": [
                    // { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "width": "150px", "height": "150px", margin:'0.3rem' } },
                    { id: 'yas_1', ui:'p', text: "18 ve altı" },
                    { id: 'yas_2', ui:'p', text: "18-24" },
                    { id: 'yas_3', ui:'p', text: "24-34" },
                    { id: 'yas_4', ui:'p', text: "35+" }
                  ] 
                },
                { "id": "hedef", "ui": "select", "question": "Oncelikli hedefiniz nedir", verify:{max:1}, "options": [
                    { id: 'hedef_1', ui:'p', text: "yag oranimi dusurmek ve fit bir vucut elde etmek" },
                    { id: 'hedef_2', ui:'p', text: "kilo alip kas kutlemi arttirmak" },
                    { id: 'hedef_3', ui:'p', text: "formumu koruyup fit kalmak" },
                    { id: 'hedef_4', ui:'p', text: "saglikli bir yasam tarzina gecmek" },
                  ] 
                },
                
                { "id": "ui_32fdfgdf", "ui": "button", "type": "submit", text:'devam' },  

            
            ], tree: {
                "query": { "ui": "select", "id": "hedef",  },
                "branches": [
                  { "if":"/.*", leave: 
                    {id: 'form3', ui: 'form', data: [
                        { "id": "beslenme", "ui": "select", "question": "Saglikli bir seklide fitness hedeflerinizi gerceklestirebilmek icin aylik maksimum ne kadar beslenme butcenize yatirim yapabilirsiniz", verify:{max:1}, "options": [
                            { id: 'yatrim_1', ui:'p', text: "beslenme butcemden yana bir problemim yok (20000 uzeri tl)" },
                            { id: 'yatrim_2', ui:'p', text: "tum gereklilikleri yerine getirebilirim (15000-20000 tl)" },
                            { id: 'yatrim_3', ui:'p', text: "orta seviyede ihtiyacimi karsilayabilirim (10000-15000 tl)" },
                            { id: 'yatrim_4', ui:'p', text: "temel olarak protein ihtiyacimi karsilayabilirim (6000-10000 tl)" },
                            { id: 'yatrim_5', ui:'p', text: "yukaridakiler gibi bir butcem yok (6000-10000 tl)" },
                        ] },
                        { "id": "ui_32fdyui", "ui": "button", "type": "submit", text:'devam' },  

                    ], tree: {
                        "query": { "ui": "select", "id": "beslenme",  },
                        "branches": [
                            { "if":"/.*", leave: 
                            {id: 'form4', ui: 'form', data: [
                                { "id": "garanti", "ui": "h3", "text": "100% sonuc garantisi aksi paraniz iade!", style: { textAlign: "center", } },
                                { "id": "onay", "ui": "select", "question": "Size hedeflerinize ulaşma konusunda %100 destek olacağımız bu 12 haftalık süreçte, kendinize toplam 7.850 TL’lik bir yatırım yapmaya hazır mısınız?", verify:{max:1}, "options": [
                                    { id: 'onay_1', ui:'p', text: "evet bu yatirimi yapmaya hazirim" }, // meta converiosn google anytics lead olarak isartle
                                    { id: 'onay_2', ui:'p', text: "kredi kartina taksitlendirerek bu yatirimi yapabilirim" }, // meta converiosn google anytics lead olarak isartle
                                    { id: 'onay_3', ui:'p', text: "emin degilim" },
                                    { id: 'onay_4', ui:'p', text: "boyle bir butcem yok" },
                                  ] 
                                },
                                { "id": "ui_32fdyui", "ui": "button", "type": "submit", text:'devam' },  
                            ], tree: {
                                "query": { "ui": "select", "id": "onay",  },
                                "branches": [
                                    { "if":"/.*", leave: {ui: 'form', id:'sonuc', data: [
                                      { "id": "sonuc", "ui": "h3", "text": "teşekkür ederiz en kısa sürede sizinle iletişime geçeceğiz", style: { textAlign: "center", } },

                                    ]}

                                   } 
                                ]
                            }}
                             }
                        ]
                    } }
                  }
                ]
            }}
          
          }
        ]
      }
      },

      
    
  ]
}









// Load the Baloo Tamma 2 font
const balooTamma2 = Baloo_Tamma_2({
  weight: ['400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'], // Specify the subsets you need
  variable: '--font-baloo-tamma-2', // Define a CSS variable
});

export default function main() {
  return (

    <main className={`${balooTamma2.variable}`} style={{ ...data.style??{}, position:'relative', maxWidth:'100vw', overflowY:'hidden', textAlign: 'left'} as React.CSSProperties}>
      
      { data.items.map((item) => 
        render(item)
      )}

      {/* <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '340px', backgroundColor: '#F1E8E7', borderRadius:'1.2rem', display:"flex", alignItems:'center', justifyContent:'left', boxShadow: '0 0 10px 0 #0005', padding: '16px 35px' }}>
        <Image src={'/duhaO.png'} alt="me" width={40} height={40} style={{ borderRadius:'1rem', top: 20, left:-18, position:'absolute' }}/>
        <div style={{   }}>
          <div style={{fontWeight:450, }}>duhabum</div>
          <div style={{color: '#666'}}>merhaba, nasil yardimci olabilirim? </div>
          <div style={{ backgroundColor:'#0001', width:'100%', padding:'10px 16px', margin:'8px -12px 0px -12px', borderRadius:'13px', display:'flex', alignItems:'center', color:'#555' }}>yardim et</div>
        </div>
        
      </div> */}
    
    </main>

  );
}
