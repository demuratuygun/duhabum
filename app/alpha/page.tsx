
import { Baloo_Tamma_2 } from 'next/font/google';
import { render } from '@/lib/render/render';


//{ "style": { "backgroundImage": "url('https://i.pinimg.com/736x/8d/02/78/8d027851735c3781e97676ed3d9d2276.jpg')", } },

const data = {
  "theme": "nordic",
  style: { '--primary-color': '#000',   "--primary-variant": '#F2EEEE', '--background-color': '#fff' },
  "items": [

      
    //{ id:'marqqkdf', ui: 'Marquee', text:['60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!', '60.000₺ değerınde BÜYÜK ÖDÜL!'] },

    { "id": "garanti", "ui": "h3", "text": "100% SONUC GARANTISI AKSI TAKDIRDE PARANIZ IADE!", style: { textAlign: "center", } },

    
   

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



      {'id': 'dda', ui: 'form', 
        data: [
        { "id": "aciklama", "ui": "p", "text": "hemen katil", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
        
        { "id": "isim", "ui": "input", "name": "isim", "value": "", "examples": ["isim soyisim", "duha bum"], "verify": "^[\\p{L} ]{2,70}$", "explanation": "gecerli bir isim soyisim girin" },
        { "id": "ui_31rg", "ui": "input", "name": "instagram", "value": "duhabum", "examples": ["instagram kullanici ismi", "duhabum"], "explanation": "gecerli bir email adresi girin"  },
        //{ "id": "kilo", "ui": 'number', "name": "kilo", "value": 67, unit: "kg", range: [30, 300] },
        { "id": "tel", "ui": "input", "type": "phone", "name": "phone", "value": "", "examples": ["telefon girin", "0 555 555 55 55"], "verify": "^[0-9 ]*$" },
        { "id": "email", "ui": "input", "name": "email", "value": "", "examples": ["eposta girin"], "verify": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
  
        { "id": "yas", "ui": "select", "question": "Yaş grubunuz", max:1, "options": [
          // { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "width": "150px", "height": "150px", margin:'0.3rem' } },
          { id: 'yas_1', ui:'p', text: "18 ve altı" },
          { id: 'yas_2', ui:'p', text: "18-24" },
          { id: 'yas_3', ui:'p', text: "24-34" },
          { id: 'yas_4', ui:'p', text: "35+" }
        ] },
  
        { "id": "hedef", "ui": "select", "question": "Oncelikli hedefiniz nedir", max:1, "options": [
          { id: 'hedef_1', ui:'p', text: "yag oranimi dusurmek ve fit bir vucut elde etmek" },
          { id: 'hedef_2', ui:'p', text: "kilo alip kas kutlemi arttirmak" },
          { id: 'hedef_3', ui:'p', text: "formumu koruyup fit kalmak" },
          { id: 'hedef_4', ui:'p', text: "saglikli bir yasam tarzina gecmek" },
        ] },
  
        { "id": "beslenme", "ui": "select", "question": "Saglikli bir seklide fitness hedeflerinizi gerceklestirebilmek icin aylik maksimum ne kadar beslenme butcenize yatirim yapabilirsiniz", max:1, "options": [
          { id: 'beslenme_1', ui:'p', text: "beslenme butcemden yana bir problemim yok (20000 uzeri tl)" },
          { id: 'beslenme_2', ui:'p', text: "tum gereklilikleri yerine getirebilirim (15000-20000 tl)" },
          { id: 'beslenme_3', ui:'p', text: "orta seviyede ihtiyacimi karsilayabilirim (10000-15000 tl)" },
          { id: 'beslenme_4', ui:'p', text: "temel olarak protein ihtiyacimi karsilayabilirim (6000-10000 tl)" },
          { id: 'beslenme_5', ui:'p', text: "o kadar butcem yok (6000-10000 tl)" },
        ] },
  
        { "id": "yatrim", "ui": "select", "question": "Saglikli bir seklide fitness hedeflerinizi gerceklestirebilmek icin aylik maksimum ne kadar beslenme butcenize yatirim yapabilirsiniz", max:1, "options": [
          { id: 'yatrim_1', ui:'p', text: "beslenme butcemden yana bir problemim yok (20000 uzeri tl)" },
          { id: 'yatrim_2', ui:'p', text: "tum gereklilikleri yerine getirebilirim (15000-20000 tl)" },
          { id: 'yatrim_3', ui:'p', text: "orta seviyede ihtiyacimi karsilayabilirim (10000-15000 tl)" },
          { id: 'yatrim_4', ui:'p', text: "temel olarak protein ihtiyacimi karsilayabilirim (6000-10000 tl)" },
          { id: 'yatrim_5', ui:'p', text: "yukaridakiler gibi bir butcem yok (6000-10000 tl)" },
        ] },
  
  
        { "id": "garanti", "ui": "h3", "text": "100% sonuc garantisi aksi paraniz iade!", style: { textAlign: "center", } },
        { "id": "onay", "ui": "select", "question": "Size hedeflerinize ulaşma konusunda %100 destek olacağımız bu 12 haftalık süreçte, kendinize toplam 7.850 TL’lik bir yatırım yapmaya hazır mısınız?", max:1, "options": [
          { id: 'onay_1', ui:'p', text: "evet bu yatirimi yapmaya hazirim" }, // meta converiosn google anytics lead olarak isartle
          { id: 'onay_2', ui:'p', text: "kredi kartina taksitlendirerek bu yatirimi yapabilirim" }, // meta converiosn google anytics lead olarak isartle
          { id: 'onay_3', ui:'p', text: "emin degilim" },
          { id: 'onay_4', ui:'p', text: "boyle bir butcem yok" },
        ] },
  
  
        
        
        { "id": "ui_32fdfgdf", "ui": "button", "type": "submit", text:'dfs' },  
      ], tree: {
        "node": { "ui": "select", "id": "sec",  },
        "branches": [
          { "if":"/18 ve altı|18-24/", 
            "node": { "ui": "number", 'id': "kilo" }, 
            "branches": [
              {'if':60, 'leave': "call_sales_rep" },
              { 'if':98, 'leave': [
                { "id": "aciklama", "ui": "p", "text": "Bu bilgilerle, sana dönüş yapilacaktir", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
              ] }
            ]
          },
          { "if": "/.*/", 
            "node": { "ui": "input", "id": "kilo" }, 
            "branches": [
              { "if": "/ismail/", "leave": "call_support" },
              { "if": "/.*/", "leave": "show_info_page" }
            ]}
        ]
      }
      },

      

      //{ "id": "ui_2", "ui": "h5", "text": "Hey Sen!" }, { "id": "ui_268", "ui": "h2", "text": [ {t:"Uzun zamandır aynaya baktığında daha fit, 💪 "},{t:"daha güçlü bir sen görmek istiyorsun, değil mi?"}]},
      //{ "id": "ui_13.17", "ui": "button", "text": "Hemen Başla!", "href": "/join" },
      
      { id:'32hgjrds', ui:'card', data:[
        { "id": "ui_13", "ui": "h5", "text": "Son 7 Kontenjan!", style: {paddingBottom:'0.5rem'} },
        { "id": "ui_12", "ui": "h6", "text": "Benimle Değişimine Başla", style: {paddingBottom:'1rem'} },
        { "id": "ui_13.1", "ui": "button", "text": "Hemen Başla!", "href": "/join" },
      ]},

      { "id": "ui_3", "ui": "p", "text": "Ancak bir türlü istediğin o vücuda ulaşamıyor musun?" },
      { "id": "ui_4", "ui": "p",  "text": "Peki sana, sadece 12 haftada hayal ettiğin vücuda ulaşacağını söylesem ve bunun garantisini versem. Bu, hayatında her şeyi değiştirmez miydi?" },
      { "id": "ui_5", "ui": "p", "text": "Eğer son soruya cevabın evet ise, 12 haftalık bu challenge senin hayatını tamamen değiştirecek! Benim ve 200'den fazla öğrencimin hayatını değiştirdiği gibi, ve bunun sana garantisini veriyorum!" },
      { "id": "ui_5.1", "ui": "video", "src": "/alpha/1.webm", "title": "Merhaba, ben Duha! Fitness serüvenim 3 yıl önce başladı", noConrtol:true, style:{ width: '100%', aspectRatio:1.55 } },


      //{ "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "paddingTop": "15rem", "marginTop": "10vh", "width": "150px", "height": "150px", "borderRadius": "4rem" } },
      { "id": "ui_5.2", "ui": "h3", "text": [{t:"Merhaba,", nl:true}," ben Duha!"], style: { flex:'0 0 66%', minWidth: '100%' }},
      { "id": "ui_5.3", "ui": "p", "text": "Fitness serüvenim 3 yıl önce başladı. Eskiden lisanslı bir futbolcuydum, ancak bir maç sırasında ayağımın çatlamasıyla hayatım altüst oldu." },
      { "id": "ui_5.4", "ui": "p", "text": "Futbolu bırakmak zorunda kalmak benim için büyük bir yıkımdı. Kendimi kaybolmuş hissediyordum… Ama pes etmek yerine, bu zor dönemi bir fırsata çevirmeye karar verdim." },
      { "id": "ui_5.5", "ui": "video", "src": "/alpha/7.webm", "title": "yesil bayramic spor takim fotografi", noConrtol:true, style:{ width: '100%',aspectRatio:1.66 }},
      { "id": "ui_9", "ui": "p", "text": "İyileşme sürecimde tüm enerjimi fitness ve sağlıklı yaşama adadım. Kendime meydan okuyarak sosyal medyada 12 haftalık bir dönüşüm challenge’ı başlattım." },


    
      { "id": "ui_10", "ui": "p", "text": "12 haftanın sonunda yaşadığım inanılmaz değişim TikTok’ta viral oldu! İnsanlar bana sürekli nasıl başardığımı soruyordu." },
      { "id": "ui_14", "ui": "p", "text": "Bu ilgi, beni bu özel formülü başkalarıyla paylaşmaya motive etti. Bugüne kadar 200’den fazla öğrencime uyguladım ve hepsi mükemmel sonuçlar aldı!" },
      { "id": "ui_11", "ui": "h6", "text": [{t:["İşte 12 haftada gerçekleşen o viral değişimim!"] }] },

      { ui:'gallery', id:'ui_15hg', maxColWidth:[400], data: [[
        { "id": "ui_11.1", "ui": "video", "src": "/alpha/5.webm", "title": "12 haftada gerçekleşen o viral değişimim", noConrtol:true, style:{ height: '100%',  }},

      ]]},
    
    
      { "id": "ui_15", "ui": "h3", "text": "İşte öğrencilerimin değişimleri" },
      { "id": "ui_16", "ui": "slider", "data": [
        { "id": "ui_17", "ui": "img", "src": "/transitions/1before.jpeg", "alt": "Öğrenci 1 once" },
        { "id": "ui_18", "ui": "img", "src": "/transitions/1after.jpeg", "alt": "Öğrenci 1 sonra" },
        { "id": "ui_17w", "ui": "img", "src": "/transitions/2before.jpeg", "alt": "Öğrenci 2 once" },
        { "id": "ui_18w", "ui": "img", "src": "/transitions/2after.jpeg", "alt": "Öğrenci 2 sonra" },
        { "id": "ui_17e", "ui": "img", "src": "/transitions/3before.jpeg", "alt": "Öğrenci 3 once" },
        { "id": "ui_18e", "ui": "img", "src": "/transitions/3after.jpeg", "alt": "Öğrenci 3 sonra" },
      ]},

      { "id": "ui_22", "ui": "h4", "text": "Öğrencilerimin Deneyimleri" },
      { "id": "ui_23", "ui": "video", "src": "/proof.mp4", "title": "Öğrenci Yorumları", style:{ objectFit:'contain',  } },
      
      

      
      { "id": "ui_24", "ui": "h3", "text": "Öğrencilerimden gelen yorumlar" },
      {
        "id": "ui_25",
        "ui": "slider",
        "data": [
          { "id": "ui_8f", "ui": "img", "src": "/whatsappSS/1.jpeg", "alt": "Image 1" },
          { "id": "ui_9f", "ui": "img", "src": "/whatsappSS/2.jpeg", "alt": "Image 1" },
          { "id": "ui_10f", "ui": "img", "src": "/whatsappSS/3.jpeg", "alt": "Image 1" },
          { "id": "ui_11f", "ui": "img", "src": "/whatsappSS/4.jpeg", "alt": "Image 2" },
          { "id": "ui_12f", "ui": "img", "src": "/whatsappSS/5.jpeg", "alt": "Image 1" },
          { "id": "ui_13f", "ui": "img", "src": "/whatsappSS/6.jpeg", "alt": "Image 1" },
          { "id": "ui_14f", "ui": "img", "src": "/whatsappSS/7.jpeg", "alt": "Image 1" },
          { "id": "ui_15f", "ui": "img", "src": "/whatsappSS/8.jpeg", "alt": "Image 2" },
          { "id": "ui_16f", "ui": "img", "src": "/whatsappSS/9.jpeg", "alt": "Image 1" },
          { "id": "ui_17f", "ui": "img", "src": "/whatsappSS/10.jpeg", "alt": "Image 1" },
          { "id": "ui_18f", "ui": "img", "src": "/whatsappSS/11.jpeg", "alt": "Image 1" },
          { "id": "ui_19f", "ui": "img", "src": "/whatsappSS/12.jpeg", "alt": "Image 2" },
          { "id": "ui_20f", "ui": "img", "src": "/whatsappSS/13.jpeg", "alt": "Image 2" },
          { "id": "ui_21f", "ui": "img", "src": "/whatsappSS/14.jpeg", "alt": "Image 2" },
          { "id": "ui_22f", "ui": "img", "src": "/whatsappSS/15.jpeg", "alt": "Image 2" },
          { "id": "ui_23f", "ui": "img", "src": "/whatsappSS/16.jpeg", "alt": "Image 2" }
        ]
      },

      { "id": "ui_28", "ui": "h2", "text": "Bu Özel Sistem Nasıl Çalışıyor?" },
      
      { "id": "ui_29", "ui": "h3", "text": "Özel Antrenman Planlaması" },
      { "id": "ui_31", "ui": "p", "text": "✔ Evde veya salonda uygulayabileceğin, sana özel antrenman programı oluşturulur." },
      { "id": "ui_32", "ui": "p", "text": "✔ Egzersiz Video Destekleri ile her hareketin doğru formda yapılmasını sağlayacak detaylı video anlatımları sunulur." },
      { "id": "ui_33", "ui": "p", "text": "✔ Günlük rutinleriniz, egzersiz geçmişiniz ve antrenman sıklığınız dikkate alınarak özel bir planlama yapılır." },

      { "id": "ui_34", "ui": "video", "src": "/alpha/10.webm", "title": "Günlük Takip Sistemi", noConrtol:true, style:{ width:'100%' }},



    /*
      { "id": "ui_19", "ui": "h4", "text": "Değişime Sen de Katıl!" },
      { "id": "ui_20", "ui": "h2", "text": "bir dokunusla hayatini degistir!" },
      { "id": "ui_21", "ui": "button", "text": "Tıkla Başlayalım", "href": "/join" },

      { "id": "ui_25ih", "ui": "h4", "text": "Erteleme, Hemen Başla!" },
      { "id": "ui_26", "ui": "h2", "text": "Harekete Geç son 7 kisi!" },
      { "id": "ui_27", "ui": "button", "text": "Tıkla Başlayalım", "href": "/join" },
    */



          { "id": "ui_35", "ui": "h2", "text": "Özel Kardiyo Planlaması" },
          { "id": "ui_37", "ui": "h6", "text": [{t:'✔ '},{t:"Yağ yakımı veya dayanıklılık artırma ", style: {color:'#0005'}},"hedeflerine yönelik özel kardiyo programı oluşturulur."] },
          { "id": "ui_38", "ui": "h6", "text": "✔ Günlük rutinleriniz ve tercih ettiğiniz egzersiz türleri dikkate alınır." },
          { "id": "ui_39", "ui": "h6", "text": "✔ Kardiyo yoğunluğu ve süresi, hedeflerinize ve fiziksel durumunuza göre belirlenir." },
          { "id": "ui_13.1", "ui": "button", "text": "Hemen Başla!", "href": "/join" },

          { "id": "ui_40", "ui": "video", "src": "/alpha/9.webm", "title": "Özel Kardiyo Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},
       


          { "id": "ui_41", "ui": "h2", "text": "Beslenme Planlaması" },
          { "id": "ui_43", "ui": "h6", "text": "✔ Günlük rutin ve beslenme alışkanlıklarınıza göre özel plan yapılır." },
          { "id": "ui_44", "ui": "h6", "text": "✔ Alerji, intolerans ve sağlık durumunuz göz önünde bulundurulur." },
          { "id": "ui_45", "ui": "h6", "text": "✔ Hedeflerinize (yağ yakımı, kas kazanımı, sağlık) uygun beslenme programı oluşturulur." },

          { "id": "ui_46", "ui": "video", "src": "/alpha/13.webm", "title": "Beslenme Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},



          { "id": "ui_47", "ui": "h2", "text": "Supplement Planlaması" },
          { "id": "ui_49", "ui": "h6", "text": "✔ Belirlenen ihtiyaçlara göre, uygun supplementler seçilir ve kullanım talimatları verilir." },
        
          {  "id": "ui_50", "ui": "video", "src": "/alpha/12.webm", "title": "Supplement Planlaması", noConrtol:true, style:{ width: '100%', height: 700}},

      

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
          
          { "id": "ui_67", "ui": "img", "src": "/alpha/ozelWpGrubu.png", "alt": "Özel Duhabum WhatsApp Grubu", style: {height:'90vh', margin:'4rem 0rem'} },
          { "id": "ui_68", "ui": "h4", "text": "Ölçüm ve Form Kontrolü" },

          { "id": "ui_70", "ui": "p", "text": "Haftalık vücut ölçümleriyle gelişim takip edilir" },
          { "id": "ui_71", "ui": "p", "text": "Form analizi yapılarak gerektiğinde planlama revize edilir." },


          { "id": "ui_72", "ui": "h4", "text": "WhatsApp Üzerinden Sınırsız İletişim" },

          { "id": "ui_74", "ui": "p", "text": "Gün içinde sorularınıza kesin dönüş sağlanır." },
          { "id": "ui_75", "ui": "p", "text": "Antrenmanlarda hata payını en aza indirmek için video çekilip gönderilir, hareket formu analizi yapılır." },


          {id:'sgsgfsdfsd', ui:'card', href:'/alpha#ui_29', data:[
            { "id": "ui_13", "ui": "h4", "text": "Erteleme, Hemen Başla!", style: {paddingBottom:'0.5rem'} },
            { "id": "ui_12", "ui": "h5s", "text": "Harekete Geç son 7 kisi!", style: {paddingBottom:'2rem'} },
            { "id": "ui_13.1", "ui": "button", "text": "Hemen Başla!", "href": "/join" },
          ]},


          { "id": "ui_77", "ui": "h3", "text": "%100 DEĞİŞİM GARANTİSİ AKSİ TAKTİRDE PARAN İADE!" },
          { "id": "ui_78", "ui": "p", "text": "WhatsApp üzerinden gönderdiğiniz fotoğraflarla günlük takibiniz yapılır. Programa tam uyum sağlamanıza rağmen vücudunuzda değişim olmazsa ödediğiniz tutar koşulsuz şartsız %100 iade edilir." },,

          { "id": "ui_76", "ui": "img", "src": "/alpha/paraIadesi.png", "alt": "100% para iadesi" },

          { "id": "ui_79", "ui": "h3", "text": "Ve Dahası…" },
          { "id": "ui_80", "ui": "p", "text": "Her ay 20.000 TL değerinde büyük ödül!" },
          { "id": "ui_81", "ui": "button", "text": "Hemen Kayıt Ol!", "href": "/register" }
    
    
  ]
}



const data2 = {
  "theme": "nordic",
  "sections": [
    [
      { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "paddingTop": "15rem", "marginTop": "10vh", "width": "150px", "height": "150px", "borderRadius": "4rem" } },
      { "id": "ui_2", "ui": "h5", "style": { "padding": "0.5rem 0% 0rem 0%", "color": "#fff9" }, "text": "Hey Sen!" },
      { "id": "ui_3", "ui": "h2", "text": "Uzun zamandır aynaya baktığında daha fit, daha güçlü bir sen görmek istiyorsun, değil mi?", "class": ["gradientText"] },
      
      //{ "id": "ui_4", "ui": "img", "alt": "uyelerimiz", "src": "/kickerSocialProof.png", "style": { "height": "50px", "width": "330px", "margin": "1rem" } },
      { "id": "ui_5", "ui": "p", "text": "Ancak bir türlü istediğin o vücuda ulaşamıyor musun? Peki sana, sadece 12 haftada hayal ettiğin vücuda ulaşacağını söylesem ve bunun garantisini versem Bu, hayatında her şeyi değiştirmez miydi? Eğer son soruya cevabın evet ise, 12 haftalık bu challenge senin hayatını tamamen değiştirecek! benim ve 200 den fazla öğrencimin hayatını değiştirdiği gibi, ve bunun sana garantisini veriyorum!" },
      { "id": "ui_6", "ui": "button", "text": "hemen katil", href:'/alpha#ui_29' }
    ],
    [
      {
        "id": "ui_7",
        "ui": "slider",
        "data": [
          { "id": "ui_8", "ui": "img", "src": "/whatsappSS/1.jpeg", "alt": "Image 1" },
          { "id": "ui_9", "ui": "img", "src": "/whatsappSS/2.jpeg", "alt": "Image 1" },
          { "id": "ui_10", "ui": "img", "src": "/whatsappSS/3.jpeg", "alt": "Image 1" },
          { "id": "ui_11", "ui": "img", "src": "/whatsappSS/4.jpeg", "alt": "Image 2" },
          { "id": "ui_12", "ui": "img", "src": "/whatsappSS/5.jpeg", "alt": "Image 1" },
          { "id": "ui_13", "ui": "img", "src": "/whatsappSS/6.jpeg", "alt": "Image 1" },
          { "id": "ui_14", "ui": "img", "src": "/whatsappSS/7.jpeg", "alt": "Image 1" },
          { "id": "ui_15", "ui": "img", "src": "/whatsappSS/8.jpeg", "alt": "Image 2" },
          { "id": "ui_16", "ui": "img", "src": "/whatsappSS/9.jpeg", "alt": "Image 1" },
          { "id": "ui_17", "ui": "img", "src": "/whatsappSS/10.jpeg", "alt": "Image 1" },
          { "id": "ui_18", "ui": "img", "src": "/whatsappSS/11.jpeg", "alt": "Image 1" },
          { "id": "ui_19", "ui": "img", "src": "/whatsappSS/12.jpeg", "alt": "Image 2" },
          { "id": "ui_20", "ui": "img", "src": "/whatsappSS/13.jpeg", "alt": "Image 2" },
          { "id": "ui_21", "ui": "img", "src": "/whatsappSS/14.jpeg", "alt": "Image 2" },
          { "id": "ui_22", "ui": "img", "src": "/whatsappSS/15.jpeg", "alt": "Image 2" },
          { "id": "ui_23", "ui": "img", "src": "/whatsappSS/16.jpeg", "alt": "Image 2" }
        ]
      }
    ],
    [
      { "id": "ui_24", "ui": "video", "src": "/Landing page video.mp4", "title": "duhabum ile degisim gosterenler anlatiyor" }
    ],
    [
      { "id": "ui_25", "ui": "video", "src": "/proof.mp4", "title": "duhabum ile degisim gosterenler anlatiyor" }
    ],
    [
      { "id": "ui_27", "ui": "h1", "text": "O yüzden sana birkaç soru soracağım" }
    ],
    [
      { "id": "ui_28", "ui": "select", "options": [{id: 'ui_28_1', ui:'p', text:"erkek"}, {id: 'ui_28_2', ui:'p', text:"kadin"}], "question": "Cinsiyetinizi seçin" }
    ],
    [
      { "id": "ui_29", "ui": "p", "text": "Bu bilgiler, sana dönüş yapabilmem ve sürecin hakkında iletişimde kalabilmem için gereklidir", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
      { "id": "ui_30", "ui": "input", "name": "isim", "value": "ismailmurat@gmail.com", "examples": ["isim soyisim", "duha duman"], "verify": "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/", "explanation": "gecerli bir isim soyisim girin" },
      { "id": "ui_31", "ui": "input", "name": "instagram", "value": "duhabum", "examples": ["instagram kullanici ismi", "duhabum"], "explanation": "gecerli bir email adresi girin"  },
      { "id": "ui_32", "ui": "input", "type": "phone", "name": "phone", "value": "", "examples": ["telefon girin", "0 555 555 55 55"], "verify": "" }
    ],
    [
      { "id": "ui_33", "ui": "select", "question": "Yaş grubunuz", min:0, "options": [
        // { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "width": "150px", "height": "150px", margin:'0.3rem' } },
        { id: 'ui_33_1', ui:'p', text:"18 ve altı" },
        { id: 'ui_33_2', ui:'p', text:"18-24" },
        { id: 'ui_33_3', ui:'p', text:"24-34" },
        { id: 'ui_33_4', ui:'p', text:"35+" }
      ] }
    ],
    [
      { "id": "ui_34", "ui": "p", "text": "Vücut ölçülerinizi bizimle paylaşın! Boyunuz (cm), kilonuz (kg) ve yaşınız kaç?", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
      { "id": "ui_352", "ui": 'number', "name": "kilo", "value": 67, unit: "kg", range: [30, 300] },
      { "id": "ui_351", "ui": 'number', "name": "boy", "value": 172, unit: "cm", range: [120, 250] },
    ],
    [
      { "id": "ui_36", "ui": "select","question": "Şu anki öncelikli hedefin nedir?",
         "options": [
          { id: 'ui_36_1', ui:'p', text: "Yağ oranımı düşürmek ve fit bir vücuda sahip olmak" },
          { id: 'ui_36_2', ui:'p', text: "Kas kütlemi artırıp kilo almak" }
        ], 
      }
    ],
    
    [
      { "id": "ui_45", ui:'h3', text: "Eğer gerçekten bu sürece hazır olduğunu düşünüyorsan, sorulara detaylıca cevap vermeni istiyorum Cevaplarını inceledikten sonra, bizzat seninle birebir şekilde iletişim kuracağım" },
    ],
        
        

      
  ],
      
      
};



 const data9 = {
  "theme": "nordic",
  "sections": [ 
    
    [
      { "id": "ui_2", "ui": "h5", "style": { "padding": "0.5rem 0% 0rem 0%", "color": "#fff9" }, "text": "Hey Sen!" },
      { "id": "ui_3", "ui": "h2", "text": "Uzun zamandır aynaya baktığında daha fit, daha güçlü bir sen görmek istiyorsun, değil mi?", "class": ["gradientText"] },
      
      //{ "id": "ui_4", "ui": "img", "alt": "uyelerimiz", "src": "/kickerSocialProof.png", "style": { "height": "50px", "width": "330px", "margin": "1rem" } },
      { "id": "ui_5", "ui": "p", "text": "Ancak bir türlü istediğin o vücuda ulaşamıyor musun? Peki sana, sadece 12 haftada hayal ettiğin vücuda ulaşacağını söylesem ve bunun garantisini versem Bu, hayatında her şeyi değiştirmez miydi? Eğer son soruya cevabın evet ise, 12 haftalık bu challenge senin hayatını tamamen değiştirecek! benim ve 200 den fazla öğrencimin hayatını değiştirdiği gibi, ve bunun sana garantisini veriyorum!" },
      { "id": "ui_6", "ui": "button", "text": "hemen katil", href:'/alpha#ui_29' }
    ],
    [
      {
        "id": "ui_7",
        "ui": "slider",
        "data": [
          { "id": "ui_8", "ui": "img", "src": "/whatsappSS/1.jpeg", "alt": "Image 1" },
          { "id": "ui_9", "ui": "img", "src": "/whatsappSS/2.jpeg", "alt": "Image 1" },
          { "id": "ui_10", "ui": "img", "src": "/whatsappSS/3.jpeg", "alt": "Image 1" },
          { "id": "ui_11", "ui": "img", "src": "/whatsappSS/4.jpeg", "alt": "Image 2" },
          { "id": "ui_12", "ui": "img", "src": "/whatsappSS/5.jpeg", "alt": "Image 1" },
          { "id": "ui_13", "ui": "img", "src": "/whatsappSS/6.jpeg", "alt": "Image 1" },
          { "id": "ui_14", "ui": "img", "src": "/whatsappSS/7.jpeg", "alt": "Image 1" },
          { "id": "ui_15", "ui": "img", "src": "/whatsappSS/8.jpeg", "alt": "Image 2" },
          { "id": "ui_16", "ui": "img", "src": "/whatsappSS/9.jpeg", "alt": "Image 1" },
          { "id": "ui_17", "ui": "img", "src": "/whatsappSS/10.jpeg", "alt": "Image 1" },
          { "id": "ui_18", "ui": "img", "src": "/whatsappSS/11.jpeg", "alt": "Image 1" },
          { "id": "ui_19", "ui": "img", "src": "/whatsappSS/12.jpeg", "alt": "Image 2" },
          { "id": "ui_20", "ui": "img", "src": "/whatsappSS/13.jpeg", "alt": "Image 2" },
          { "id": "ui_21", "ui": "img", "src": "/whatsappSS/14.jpeg", "alt": "Image 2" },
          { "id": "ui_22", "ui": "img", "src": "/whatsappSS/15.jpeg", "alt": "Image 2" },
          { "id": "ui_23", "ui": "img", "src": "/whatsappSS/16.jpeg", "alt": "Image 2" }
        ]
      }
    ],
    [
      { "id": "ui_24", "ui": "video", "src": "/Landing page video.mp4", "title": "duhabum ile degisim gosterenler anlatiyor" }
    ],
    [
      { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "paddingTop": "15rem", "marginTop": "10vh", "width": "150px", "height": "150px", "borderRadius": "4rem" } },
    ],
    [
      { "id": "ui_28", "ui": "select", "options": [{id: 'ui_28_1', ui:'p', text:"erkek"}, {id: 'ui_28_2', ui:'p', text:"kadin"}], "question": "Cinsiyetinizi seçin" }
    ],
    [
      { "id": "ui_29", "ui": "p", "text": "Bu bilgiler, sana dönüş yapabilmem ve sürecin hakkında iletişimde kalabilmem için gereklidir", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
      { "id": "ui_30", "ui": "input", "name": "isim", "value": "ismailmurat@gmail.com", "examples": ["isim soyisim", "duha duman"], "verify": "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/", "explanation": "gecerli bir isim soyisim girin" },
      { "id": "ui_31", "ui": "input", "name": "instagram", "value": "duhabum", "examples": ["instagram kullanici ismi", "duhabum"], "explanation": "gecerli bir email adresi girin"  },
      { "id": "ui_32", "ui": "input", "type": "phone", "name": "phone", "value": "", "examples": ["telefon girin", "0 555 555 55 55"], "verify": "" },
    
      { "id": "ui_33", "ui": "select", "question": "Yaş grubunuz", min:0, "options": [
        // { "id": "ui_1", "ui": "img", "alt": "duhabum profile picture", "src": "/duhaO.png", "style": { "width": "150px", "height": "150px", margin:'0.3rem' } },
        { id: 'ui_33_1', ui:'p', text:"18 ve altı" },
        { id: 'ui_33_2', ui:'p', text:"18-24" },
        { id: 'ui_33_3', ui:'p', text:"24-34" },
        { id: 'ui_33_4', ui:'p', text:"35+" }
      ] }
    ]
    
  ]
}

/**
 * image video auto margin fit section and cards
 * v slider alignments
 * v cards comments stars
 * popups
 * lists
 * 
 * error
 * tracking data
 * form feedback and content realignment
 * 
**/

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
