
import { Baloo_Tamma_2 } from 'next/font/google';
import { render } from '@/lib/render/render';
import { styleText } from 'util';


//{ "style": { "backgroundImage": "url('https://i.pinimg.com/736x/8d/02/78/8d027851735c3781e97676ed3d9d2276.jpg')", } },

const data = {
  "theme": "nordic",
  style: { '--primary-color': '#000',   "--primary-variant": '#F2EEEE', '--background-color': '#fff' },
  "items": [
  
    //{ id:'marqqkdf', ui: 'Marquee', text:['60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!'] },
    // Yoğun İş Hayatına Rağmen , Sadece Günde 40 dakika ile  12 Haftada Göbek ve Bel Yağlarını Eritip Fit Bir Vücuda Sahip Ol!
    // %100 değişim garantisi aksi taktirde paran iade!

    { "id": "garanti", "ui": "h2", "text": "Yoğun İş Hayatına Rağmen, Sadece Günde 40 dakika ile  12 Haftada Göbek ve Bel Yağlarını Eritip Fit Bir Vücuda Sahip Ol!", style: { textAlign: "center", } },
    { "id": "garanti", "ui": "h5", "text": "100% SONUC GARANTISI AKSI TAKDIRDE PARANIZ IADE!", style: { textAlign: "center", } },
    { "id": "ui_23", "ui": "video", "src": "https://duhasite.b-cdn.net/vslvideo.mp4", "title": "Öğrenci Yorumları", style:{ objectFit:'contain',  } },

    { id:'32hgjrds', ui:'card', data:[
      { "id": "ui_13", "ui": "h5", "text": "Son 7 Kontenjan! Benimle Değişimine Başla" },
      { "id": "ui_13.1", "ui": "button", "text": "Şimdi başvur!", "href": "/action" },
    ]},

    { "id": "ui_15", "ui": "h3", "text": "İşte öğrencilerimin değişimleri" },
    { "id": "ui_16", "ui": "slider", "data": [
        { "id": "ui_17", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/1.JPG", "alt": "Öğrenci 1 once" },
        { "id": "ui_18", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/2.jpeg", "alt": "Öğrenci 1 sonra" },
        { "id": "ui_17w", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/3.png", "alt": "Öğrenci 2 once" },
        { "id": "ui_18w", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/4.png", "alt": "Öğrenci 2 sonra" },
        { "id": "ui_17e", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/5.png", "alt": "Öğrenci 3 once" },
        { "id": "ui_18e", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/6.png", "alt": "Öğrenci 3 sonra" },
        { "id": "ui_18e", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/7.png", "alt": "Öğrenci 3 sonra" },
        { "id": "ui_17", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/8.JPG", "alt": "Öğrenci 1 once" },
        { "id": "ui_17", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/9.JPG", "alt": "Öğrenci 1 once" },
        { "id": "ui_18", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/10.jpeg", "alt": "Öğrenci 1 sonra" },
        { "id": "ui_18", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/11.jpeg", "alt": "Öğrenci 1 sonra" },
        { "id": "ui_18", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/12.jpeg", "alt": "Öğrenci 1 sonra" },
        { "id": "ui_18", "ui": "img", "src": "https://duhasite.b-cdn.net/transitions/13.jpeg", "alt": "Öğrenci 1 sonra" },
    ]},

    { "id": "ui_23", "ui": "video", "src": "https://duhasite.b-cdn.net/proof.mp4", "title": "Öğrenci Yorumları", style:{ objectFit:'contain',  } },
    { "id": "ui_13", "ui": "h5", "text": "Son 7 Kontenjan! Benimle Değişimine Başla" ,style:{paddingBottom:0} },
    { "id": "ui_13.1", "ui": "button", "text": "Şimdi başvur!", "href": "/action" },



    { "id": 'fsgjslf', "ui": 'slider', "data": [
        { id:'32rds', ui:'card', href:'https://maps.app.goo.gl/8Gocvbk1UWfBJLiU6', data:[ 
          { "id": "ui_5", "ui": "p", "text": [
            { style:{ backgroundImage:"url('https://lh3.googleusercontent.com/a-/ALV-UjVCW56AcXqgVwPr8gLi4KGKJdpJs1tAAHSrz8cuBFo0r9C3Vav0=w72-h72-p-rp-mo-ba3-br100')", width:'4rem', height:'4rem', marginBottom:'1rem' }, nl:true}, { t:'Furkan Ata KÖKSAL', style:{ fontWeight:500 }, nl:true}, 
            { t:'★★★★★', style:{  textAlign:'right', color:'#ED6E02'}}, { t:'', style:{color:'#CDD0D5'}, nl:true,}, 
            { t:"Uzun zamandır birçok yöntem denememe rağmen istediğim sonuçları bir türlü alamıyordum. Duha ile çalışmaya başladıktan sonra hem sağlıklı beslenmeyi öğrendim hem de sporu hayatımın bir parçası haline getirdim. Samimiyeti, bilgisi ve her..."}] 
          },
        ] },
        { id:'32rdsd', ui:'card', href:'https://maps.app.goo.gl/XcGyNLLMBmZcZBWn8', data:[ 
          { "id": "ui_5", "ui": "p", "text": [
            { style: { backgroundImage:"url('https://lh3.googleusercontent.com/a-/ALV-UjVLxQqmAYsQIBrrmWoN3n0eaTpc-3_2tdBsBKV7IyUGxARxa4w=w72-h72-p-rp-mo-br100')", width:'4rem', height:'4rem', marginBottom:'1rem' }, nl:true}, { t:'burcu gündogdu', style:{ fontWeight:500 }, nl:true}, 
            { t:'★★★★★', style:{color:'#ED6E02'}}, { t:'', style:{color:'#CDD0D5'}, nl:true,}, 
            { t:"Daha önce birkaç defa başka hocalarla çalışmıştık fakat Duha hocam kadar ilgili, takip eden, şartları göre beslenme programımızı değiştiren, hatta biz unutsak dahi kendisinin bizi ulaşıp son durumlarimizi öğrenen bir hocamiz..."}] 
          },
        ] },
    ]},

    { "id": "ui_24", "ui": "h3", "text": "Öğrencilerimden gelen yorumlar" },
    {
      "id": "ui_25",
      "ui": "slider",
      "data": [
        { "id": "ui_8f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/1.jpeg", "alt": "Image 1" },
        { "id": "ui_9f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/2.jpeg", "alt": "Image 1" },
        { "id": "ui_10f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/3.jpeg", "alt": "Image 1" },
        { "id": "ui_11f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/4.jpeg", "alt": "Image 2" },
        { "id": "ui_12f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/5.jpeg", "alt": "Image 1" },
        { "id": "ui_13f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/6.jpeg", "alt": "Image 1" },
        { "id": "ui_14f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/7.jpeg", "alt": "Image 1" },
        { "id": "ui_15f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/8.jpeg", "alt": "Image 2" },
        { "id": "ui_16f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/9.jpeg", "alt": "Image 1" },
        { "id": "ui_17f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/10.jpeg", "alt": "Image 1" },
        { "id": "ui_18f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/11.jpeg", "alt": "Image 1" },
        { "id": "ui_19f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/12.jpeg", "alt": "Image 2" },
        { "id": "ui_20f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/13.jpeg", "alt": "Image 2" },
        { "id": "ui_21f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/14.jpeg", "alt": "Image 2" },
        { "id": "ui_22f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/15.jpeg", "alt": "Image 2" },
        { "id": "ui_23f", "ui": "img", "src": "https://duhasite.b-cdn.net/whatsappSS/16.jpeg", "alt": "Image 2" }
      ]
    },

    { "id": "ui_3245", "ui": "h3", "text": "Yoğun İş Temponuza Uygun, %100 Sana Özel Sistem" },
    { "id": "ui_3246", "ui": "h5", "text": {t:"Sadece Yoğun İş İnsanları İçin Tasarlandı", style:{backgroundColor: "#ff0"}} },
    { "id": "ui_3247", "ui": "h6", "text": "Ofis yoğunluğu, toplantılar, seyahatler, görevler derken kendinize vakit ayıramıyor musunuz?" },
    { "id": "ui_3248", "ui": "p", "text": "Bu sistem sizin hayatınıza uyum sağlamak için sıfırdan tasarlandı. Antrenmanlarınız, beslenmeniz, kardiyonuz ve gelişiminiz tek bir merkezden, tamamen size özel olarak planlanır ve birebir takip edilir." },


    { "id": "ui_34", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/10.webm", "title": "Günlük Takip Sistemi", noConrtol:true, style:{ width:'100%', height: 700 }},

    { "id": "ui_01", "ui": "h3", "text": "🏋️‍♂️Antrenmanınızı Sadece Uygulayın – Planlamayı Biz Yapalım!" },
    { "id": "ui_02", "ui": "p", "text": "✔ Evde ya da salonda uygulanabilen kişisel antrenman programı" },
    { "id": "ui_03", "ui": "p", "text": "✔ Zamanınıza göre kısa ama etkili egzersiz planları ile vakit kaybına son!" },
    { "id": "ui_04", "ui": "p", "text": "✔ Her hareketin videolu anlatımı ile egzersizlerini en doğru form’da uygula" },

    { "id": "ui_46", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/13.webm", "title": "Beslenme Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
    
    { "id": "ui_05", "ui": "h3", "text": "🍽 Beslenme Kararsızlığını Ortadan Kaldırın" },
    { "id": "ui_06", "ui": "p", "text": "✔ Ofiste, seyahatte ya da dışarda – her duruma uygun alternatifler" },
    { "id": "ui_07", "ui": "p", "text": "✔ Ne zaman, ne kadar, ne yiyeceğiniz net" },
    { "id": "ui_08", "ui": "p", "text": "✔ Alerji, intolerans ve rutinlerinize özel planlama" },
    { "id": "ui_09", "ui": "p", "text": "✔ Bilgi karmaşası yok: sadece uygula!" },

    { "id": "ui_46", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/9.webm", "title": "Beslenme Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
    
    { "id": "ui_10", "ui": "h3", "text": "🫀 Hedefe Uygun Kardiyo Planlaması" },
    { "id": "ui_11", "ui": "p", "text": "✔ Yağ yakımı veya dayanıklılık hedefinize özel hazırlanır." },
    { "id": "ui_12", "ui": "p", "text": "✔ Süre, yoğunluk ve içerik tamamen sizin fiziksel yapınıza ve zamanlamanıza göre uyarlanır" },
    { "id": "ui_13", "ui": "p", "text": "✔ Bu özel sistem ile saatlerce koşu bandında durmana hiç gerek yok 😊" },

    {  "id": "ui_50", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/12.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
    
    { "id": "ui_14", "ui": "h3", "text": "💊 Karmaşık Supplement Dünyasında Netlik" },
    { "id": "ui_15", "ui": "p", "text": "✔ Hedefinize uygun takviye desteği (isteğe bağlı)" },
    { "id": "ui_16", "ui": "p", "text": "✔ Ne zaman, ne kadar, ne kullanacağınız net" },
    { "id": "ui_17", "ui": "p", "text": "✔ Sade, etkili ve ihtiyaç odaklı planlama" },

    {  "id": "ui_50", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/takippsistemi.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
    
    { "id": "ui_18", "ui": "h3", "text": "🧠 Disiplin Sorununa Birebir Takiple Çözüm" },
    { "id": "ui_19", "ui": "p", "text": "✔ Günlük WhatsApp takibiyle kontrol ve yönlendirme" },
    { "id": "ui_20", "ui": "p", "text": "✔ Öğün fotoğraflarınızla beslenme kontrolü" },
    { "id": "ui_21", "ui": "p", "text": "✔ Antrenman ve kardiyo kontrolü" },
    { "id": "ui_22", "ui": "p", "text": "✔ Her gün destek, her hafta gelişim!" },

    {  "id": "ui_50", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/14.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
    
    { "id": "ui_23", "ui": "h3", "text": "🎯 Form Analizi & Haftalık Gelişim Takibi" },
    { "id": "ui_24", "ui": "p", "text": "✔ Haftalık ölçümlerle gelişiminiz rakamlarla netleşir" },
    { "id": "ui_25", "ui": "p", "text": "✔ Haftalık ilerlemenize göre programınız revize edilir" },
    
    {  "id": "ui_50", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/sesligoruntulu%20konusma.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},

    { "id": "ui_26", "ui": "h3", "text": "📞 Premium Görüşme Desteği" },
    { "id": "ui_27", "ui": "p", "text": "✔ Belirli aralıklarla birebir video veya sesli görüşmeler" },
    { "id": "ui_28", "ui": "p", "text": "✔ Hedef güncellemesi, motivasyon artışı ve soru-cevap desteği" },
    { "id": "ui_29", "ui": "p", "text": "✔ Yüz yüze gibi rehberlik – mesafe yok" },

    { "id": "ui_67", "ui": "img", "src": "https://duhasite.b-cdn.net/alpha/ozelWpGrubu.png", "alt": "Özel Duhabum WhatsApp Grubu", style: {height:'90vh', margin:'4rem 0rem'} },
    
    { "id": "ui_30", "ui": "h3", "text": "🔒 Sınırsız WhatsApp Desteği" },
    { "id": "ui_31", "ui": "p", "text": "✔ Gün içinde tüm sorularınıza dönüş" },
    { "id": "ui_32", "ui": "p", "text": "✔ Antrenman sırasında şüphe mi var? Videonu gönder – analiz edelim" },
    
    { "id": "ui_33", "ui": "h3", "text": "👥 Özel WhatsApp Destek Grubu", style: {marginTop: '3rem'} },
    { "id": "ui_34", "ui": "p", "text": "✔ En iyi dönüşümler ve ilham verici hikayeler paylaşılır." },
    { "id": "ui_35", "ui": "p", "text": "✔ Duyurular ve içerikler sunulur." },
    { "id": "ui_36", "ui": "p", "text": "✔ Bu grup, disiplinli kalmanı sağlar ve motivasyonunu artırır" },
    
    { "id": "ui_37", "ui": "h3", "text": "🔒 %100 Değişim Garantisi", style: {marginTop: '3rem'} },
    { "id": "ui_38", "ui": "p", "text": "✔ Sisteme %90 ve üzeri sadakat gösterip;" },
    { "id": "ui_39", "ui": "p", "text": "✔ Beslenme, antrenman ve kardiyo fotoğraflarınızı düzenli olarak gönderirseniz," },
    { "id": "ui_40", "ui": "p", "text": "✔ Haftalık ölçümlerinizi paylaşırsanız," },
    { "id": "ui_41", "ui": "p", "text": "✔ Ve tüm planlamaya uyum sağladığınız halde vücudunuzda hiçbir değişim olmazsa," },



    { "id": "ui_29", "ui": "h3", "text": "Koşulsuz para iadesi sağlıyoruz.", style: {marginTop: '5rem'} },
    { "id": "ui_13", "ui": "h5", "text": "💡 Sıfır risk. Net sistem. Gerçek sonuç." ,style:{paddingBottom:0} },

    { "id": "ui_13", "ui": "h5", "text": "Son 7 Kontenjan! Benimle Değişimine Başla" ,style:{paddingBottom:0} },
    { "id": "ui_13.1", "ui": "button", "text": "Şimdi başvur!", "href": "/action" },
    
    
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



/*


    //{ "id": "ui_2", "ui": "h5", "text": "Hey Sen!" }, { "id": "ui_268", "ui": "h2", "text": [ {t:"Uzun zamandır aynaya baktığında daha fit, 💪 "},{t:"daha güçlü bir sen görmek istiyorsun, değil mi?"}]},
    //{ "id": "ui_13.17", "ui": "button", "text": "Hemen Başla!", "href": "/action" },
      


    { "id": "ui_3", "ui": "p", "text": "Ancak bir türlü istediğin o vücuda ulaşamıyor musun?" },
    { "id": "ui_4", "ui": "p",  "text": "Peki sana, sadece 12 haftada hayal ettiğin vücuda ulaşacağını söylesem ve bunun garantisini versem. Bu, hayatında her şeyi değiştirmez miydi?" },
    { "id": "ui_5", "ui": "p", "text": "Eğer son soruya cevabın evet ise, 12 haftalık bu challenge senin hayatını tamamen değiştirecek! Benim ve 200'den fazla öğrencimin hayatını değiştirdiği gibi, ve bunun sana garantisini veriyorum!" },
    { "id": "ui_5.1", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/1.webm", "title": "Merhaba, ben Duha! Fitness serüvenim 3 yıl önce başladı", noConrtol:true, style:{ width: '100%', aspectRatio:1.55 } },



    //{ "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "https://duhasite.b-cdn.net/duhaO.png", "style": { "paddingTop": "15rem", "marginTop": "10vh", "width": "150px", "height": "150px", "borderRadius": "4rem" } },
    { "id": "ui_5.2", "ui": "h3", "text": [{t:"Merhaba,", nl:true}," ben Duha!"], style: { flex:'0 0 66%', minWidth: '100%' }},
    { "id": "ui_5.3", "ui": "p", "text": "Fitness serüvenim 3 yıl önce başladı. Eskiden lisanslı bir futbolcuydum, ancak bir maç sırasında ayağımın çatlamasıyla hayatım altüst oldu." },
    { "id": "ui_5.4", "ui": "p", "text": "Futbolu bırakmak zorunda kalmak benim için büyük bir yıkımdı. Kendimi kaybolmuş hissediyordum… Ama pes etmek yerine, bu zor dönemi bir fırsata çevirmeye karar verdim." },
    { "id": "ui_5.5", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/7.webm", "title": "yesil bayramic spor takim fotografi", noConrtol:true, style:{ width: '100%',aspectRatio:1.66 }},
    { "id": "ui_9", "ui": "p", "text": "İyileşme sürecimde tüm enerjimi fitness ve sağlıklı yaşama adadım. Kendime meydan okuyarak sosyal medyada 12 haftalık bir dönüşüm challenge’ı başlattım." },


    
    { "id": "ui_10", "ui": "p", "text": "12 haftanın sonunda yaşadığım inanılmaz değişim TikTok’ta viral oldu! İnsanlar bana sürekli nasıl başardığımı soruyordu." },
    { "id": "ui_14", "ui": "p", "text": "Bu ilgi, beni bu özel formülü başkalarıyla paylaşmaya motive etti. Bugüne kadar 200’den fazla öğrencime uyguladım ve hepsi mükemmel sonuçlar aldı!" },
    { "id": "ui_11", "ui": "h6", "text": [{t:["İşte 12 haftada gerçekleşen o viral değişimim!"] }] },

    { ui:'gallery', id:'ui_15hg', maxColWidth:[400], data: [[
      { "id": "ui_11.1", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/5.webm", "title": "12 haftada gerçekleşen o viral değişimim", noConrtol:true, style:{ height: '100%',  }},
    ]]},
    
    


      { "id": "ui_22", "ui": "h4", "text": "Öğrencilerimin Deneyimleri" },
      { "id": "ui_23", "ui": "video", "src": "https://duhasite.b-cdn.net/proof.mp4", "title": "Öğrenci Yorumları", style:{ objectFit:'contain',  } },
            

      


      { "id": "ui_28", "ui": "h2", "text": "Bu Özel Sistem Nasıl Çalışıyor?" },
      
      { "id": "ui_29", "ui": "h3", "text": "Özel Antrenman Planlaması" },
      { "id": "ui_31", "ui": "p", "text": "✔ Evde veya salonda uygulayabileceğin, sana özel antrenman programı oluşturulur." },
      { "id": "ui_32", "ui": "p", "text": "✔ Egzersiz Video Destekleri ile her hareketin doğru formda yapılmasını sağlayacak detaylı video anlatımları sunulur." },
      { "id": "ui_33", "ui": "p", "text": "✔ Günlük rutinleriniz, egzersiz geçmişiniz ve antrenman sıklığınız dikkate alınarak özel bir planlama yapılır." },

      { "id": "ui_34", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/10.webm", "title": "Günlük Takip Sistemi", noConrtol:true, style:{ width:'100%', height: 700 }},



    /*
      { "id": "ui_19", "ui": "h4", "text": "Değişime Sen de Katıl!" },
      { "id": "ui_20", "ui": "h2", "text": "bir dokunusla hayatini degistir!" },
      { "id": "ui_21", "ui": "button", "text": "Tıkla Başlayalım", "href": "/action" },

      { "id": "ui_25ih", "ui": "h4", "text": "Erteleme, Hemen Başla!" },
      { "id": "ui_26", "ui": "h2", "text": "Harekete Geç son 7 kisi!" },
      { "id": "ui_27", "ui": "button", "text": "Tıkla Başlayalım", "href": "/action" },
    



      { "id": "ui_35", "ui": "h2", "text": "Özel Kardiyo Planlaması" },
      { "id": "ui_37", "ui": "h6", "text": [{t:'✔ '},{t:"Yağ yakımı veya dayanıklılık artırma ", style: {color:'#0005'}},"hedeflerine yönelik özel kardiyo programı oluşturulur."] },
      { "id": "ui_38", "ui": "h6", "text": "✔ Günlük rutinleriniz ve tercih ettiğiniz egzersiz türleri dikkate alınır." },
      { "id": "ui_39", "ui": "h6", "text": "✔ Kardiyo yoğunluğu ve süresi, hedeflerinize ve fiziksel durumunuza göre belirlenir." },
      { "id": "ui_13.1", "ui": "button", "text": "Hemen Başla!", "href": "/action" },

      { "id": "ui_40", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/9.webm", "title": "Özel Kardiyo Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
       


      { "id": "ui_41", "ui": "h2", "text": "Beslenme Planlaması" },
      { "id": "ui_43", "ui": "h6", "text": "✔ Günlük rutin ve beslenme alışkanlıklarınıza göre özel plan yapılır." },
      { "id": "ui_44", "ui": "h6", "text": "✔ Alerji, intolerans ve sağlık durumunuz göz önünde bulundurulur." },
      { "id": "ui_45", "ui": "h6", "text": "✔ Hedeflerinize (yağ yakımı, kas kazanımı, sağlık) uygun beslenme programı oluşturulur." },

      { "id": "ui_46", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/13.webm", "title": "Beslenme Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},



      { "id": "ui_47", "ui": "h2", "text": "Supplement Planlaması" },
      { "id": "ui_49", "ui": "h6", "text": "✔ Belirlenen ihtiyaçlara göre, uygun supplementler seçilir ve kullanım talimatları verilir." },
        
      {  "id": "ui_50", "ui": "video", "src": "https://duhasite.b-cdn.net/alpha/12.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},

      

      { "id": "ui_51", "ui": "h4", "text": "Günlük Birebir Takip Sistemi" },
      { "id": "ui_52", "ui": "p", "text": "WhatsApp üzerinden gönderdiğiniz fotoğraflarla tüm planlamanız takip edilir" },
      { "id": "ui_54", "ui": "p", "text": "Beslenme Takibi: Öğün fotoğraflarıyla uyum kontrolü" },
      { "id": "ui_55", "ui": "p", "text": "Antrenman Takibi: Egzersiz fotoğraflarıyla form ve ilerleme takibi" },
      { "id": "ui_56", "ui": "p", "text": "Kardiyo Takibi: Süre ve yoğunluk kontrolü" },

      { "id": "ui_57", "ui": "h4", "text": "Videolu ve Sesli Görüşme Desteği" },
      { "id": "ui_59", "ui": "p", "text": "Video veya sesli görüşmeler ile birebir destek sağlanır" },
      { "id": "ui_60", "ui": "p", "text": "Form kontrolü, program revizyonu ve sorularınız için belirli aralıklarla görüşmeler yapılır." },
      { "id": "ui_61", "ui": "p", "text": "Kardiyo Takibi: Süre ve yoğunluk kontrolü" },

      { "id": "ui_62", "ui": "h4", "text": "Özel WhatsApp Grubu" },
      { "id": "ui_63", "ui": "p", "text": "WhatsApp üzerinden gönderdiğiniz fotoğraflarla tüm planlamanız takip edilir" },

      { "id": "ui_65", "ui": "p", "text": "En iyi dönüşümler ve ilham verici hikayeler paylaşılır." },
      { "id": "ui_66", "ui": "p", "text": "Sadece üyelere özel duyurular ve içerikler sunulur." },
          
      { "id": "ui_67", "ui": "img", "src": "https://duhasite.b-cdn.net/alpha/ozelWpGrubu.png", "alt": "Özel Duhabum WhatsApp Grubu", style: {height:'90vh', margin:'4rem 0rem'} },
      { "id": "ui_68", "ui": "h4", "text": "Ölçüm ve Form Kontrolü" },

      { "id": "ui_70", "ui": "p", "text": "Haftalık vücut ölçümleriyle gelişim takip edilir" },
      { "id": "ui_71", "ui": "p", "text": "Form analizi yapılarak gerektiğinde planlama revize edilir." },


      { "id": "ui_72", "ui": "h4", "text": "WhatsApp Üzerinden Sınırsız İletişim" },

      { "id": "ui_74", "ui": "p", "text": "Gün içinde sorularınıza kesin dönüş sağlanır." },
      { "id": "ui_75", "ui": "p", "text": "Antrenmanlarda hata payını en aza indirmek için video çekilip gönderilir, hareket formu analizi yapılır." },


      {id:'sgsgfsdfsd', ui:'card', href:'/alpha#ui_29', data:[
        { "id": "ui_13", "ui": "h4", "text": "Erteleme, Hemen Başla!", style: {paddingBottom:'0.5rem'} },
        { "id": "ui_12", "ui": "h5s", "text": "Harekete Geç son 7 kisi!", style: {paddingBottom:'2rem'} },
        { "id": "ui_13.1", "ui": "button", "text": "Hemen Başla!", "href": "/action" },
      ]},


      { "id": "ui_77", "ui": "h3", "text": "%100 DEĞİŞİM GARANTİSİ AKSİ TAKTİRDE PARAN İADE!" },
      { "id": "ui_78", "ui": "p", "text": "WhatsApp üzerinden gönderdiğiniz fotoğraflarla günlük takibiniz yapılır. Programa tam uyum sağlamanıza rağmen vücudunuzda değişim olmazsa ödediğiniz tutar koşulsuz şartsız %100 iade edilir." },,

      { "id": "ui_76", "ui": "img", "src": "https://duhasite.b-cdn.net/alpha/paraIadesi.png", "alt": "100% para iadesi" },

      { "id": "ui_79", "ui": "h3", "text": "Ve Dahası…" },
      { "id": "ui_80", "ui": "p", "text": "Her ay 20.000 TL değerinde büyük ödül!" },
      { "id": "ui_81", "ui": "button", "text": "Hemen Kayıt Ol!", "href": "/action" }
*/