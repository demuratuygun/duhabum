
import { useRouter } from "next/navigation";
import Video from "@/modules/nordic/components/Video";
import Slider from "@/modules/nordic/components/Slider";
import Image from 'next/image';
import Gallery from "@/modules/nordic/components/Gallery";


interface ImageType {
    src: string;
    alt: string;
}

const images: ImageType[] = [
    { src: '/transitions/1before.jpeg', alt: 'Image 1' },
    { src: '/transitions/1after.jpeg', alt: 'Image 1' },
    { src: '/transitions/2before.jpeg', alt: 'Image 1' },
    { src: '/transitions/2after.jpeg', alt: 'Image 2' },
    { src: '/transitions/3before.jpeg', alt: 'Image 1' },
    { src: '/transitions/3after.jpeg', alt: 'Image 1' },
    { src: '/transitions/4before.jpeg', alt: 'Image 1' },
    { src: '/transitions/4after.jpeg', alt: 'Image 2' },
    { src: '/transitions/5before.jpeg', alt: 'Image 1' },
    { src: '/transitions/5after.jpeg', alt: 'Image 1' },
    { src: '/transitions/6before.jpeg', alt: 'Image 1' },
    { src: '/transitions/6after.jpeg', alt: 'Image 2' },
    // Add more images as needed
];

export default async function main({ params }: { params: { title: string } }) {

    //const data = await fetch(`https://api.example.com/posts/${params.slug}`, {
    //    next: { revalidate: 12*60*60 }, // Revalidate every 60 seconds
    //}).then((res) => res.json());

    const data = {

    };



  return (

    <main id="mainFrame" style={{ fontSize: '1.1rem', gap: '20vh' }} >

      <section>
        <Gallery fixedHeight={true} maxColHeight={700}/>
      </section>

      <section className="center flex-col gap-8" style={{ color: '#fff', textAlign: 'center', paddingTop: '10vh', paddingBottom:'30vh' }}>
        <Image alt="me" src="/duhaO.png" width={150} height={150} draggable={false} style={{ borderRadius:'42%',  }}/>
        <h6 style={{color:'#fff'}}>Merhaba ben Duha, </h6>
        <h3 style={{ maxWidth: '900px', margin:'3vh 0px'}}>öğrencilerimle birebir ilgileniyorum  ve bu yüzden kontenjanım sınırlı.</h3>
        <p className="nordic" style={{ maxWidth:'600px', textTransform:'lowercase' }}>
        VÜCUDUNUZU DÖNÜŞTÜRMEK, ENERJiNiZi ARTIRMAK VE SONUNDA KENDİNİZE GÜVENMEK İSTİYORSANIZ... 
        O ZAMAN ÖNÜMÜZDEKİ 16 HAFTA BOYUNCA LEAN 4 LIFE YAZ SPRİNTİYLE HAYATINIZIN EN İYİ ŞEKLİNE ULAŞMANIZ İÇİN SİZİ KİŞİSEL OLARAK KOÇLUK EDERİM.

        katilim sartlarini acikla
        </p>
        <button className="nordic">hemen katil</button>
      </section>

      <section>
        <Video />
      </section>

      <section>
        <h2 style={{color:'#fff'}}>gerçekten disiplinli bir şekilde beslenme ve antrenman programına uyabilecek kişilerle çalışıyorum. </h2>
      </section>

      <section>
        <Slider slideWidth={300} initalIndex={2}>
            {images.map((image) => 
            <div style={{ width: `300px`, height: `400px`, borderRadius:'13px', margin:'13px', position: 'relative', overflow: 'hidden'}}>
            <Image
                draggable={false}
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                priority // Ensures images are loaded eagerly
            />
            </div>
          )}
        </Slider>
      </section>

      <section className="center flex-col gap-10" style={{ color: '#fff', textAlign: 'center', height: 'fit-content' }}>
        <h1 style={{color:'#fff'}}> O yüzden sana birkaç soru soracağım </h1>
        <h3 style={{color:'#fff'}}> Eğer gerçekten bu sürece hazır olduğunu düşünüyorsan, sorulara detaylıca cevap vermeni istiyorum </h3>
        <h3>Cevaplarını inceledikten sonra, bizzat seninle birebir şekilde iletişim kuracağım</h3>
      </section>


  

    </main>
  
  );
}

export async function generateStaticParams() {

    //const posts = await fetch('https://api.example.com/posts' next: { revalidate: 12*60*60 })
    //    .then( (res) => res.json() );

    const posts = [{title: "dogrudan satis"}, {title: "baslik 2"}];
  
    return posts.map((post:any) => ({
      title: post.title,
    }));
  
}