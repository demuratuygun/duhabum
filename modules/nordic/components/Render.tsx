'use client'



import Image from 'next/image';
import Gallery from './Gallery';
import Video from './Video';
import Slider from './Slider';



function render(component:any) {
  if (component.ui == 'img') 
  return (
  <div className="nordicimg" style={{ ...component.style,  }}>
    <Image priority
        draggable={false}
        src={component.src}
        alt={component.alt}
        layout="fill"
        objectFit="cover"
    />
  </div> )
  else if (component.ui == 'h1') 
    return <h1 style={{...component.style}}> {component.text} </h1>
  else if (component.ui == 'h2') 
    return <h2 style={{...component.style}}> {component.text} </h2>
  else if (component.ui == 'h3') 
    return <h3 style={{...component.style}}> {component.text} </h3>
  else if (component.ui == 'h4') 
    return <h4 style={{...component.style}}> {component.text} </h4>
  else if (component.ui == 'h5') 
    return <h5 style={{...component.style}}> {component.text} </h5>
  else if (component.ui == 'h6') 
    return <h6 style={{...component.style}}> {component.text} </h6>
  else if (component.ui == 'p') 
    return <p className="nordic" style={{...component.style}}> {component.text} </p>
  else if (component.ui == 'button') 
    return <button className="nordic" style={{...component.style}}> {component.text} </button>
  else if (component.ui == 'video') 
    return <Video title={component.title} src={component.src} active={component.active??false} />
  else if (component.ui == 'Slider') 
    return (
    <Slider slideWidth={300} initalIndex={2} style={component.style}>
      {component.data.map((data:any) => render(data) )}
    </Slider> )
  else if (component.ui == 'Gallery') 
    return (
    <Gallery fixedHeight={false}  /> )

} 



const data = {
    theme: 'nordic',
    sections: [
      [
        { ui:'img', alt:'duhabum profile picture', src:"/duhaO.png", style:{ paddingTop:'15rem', marginTop:'10vh', width:"150px", height:'150px', borderRadius: '4rem',  } },
        { ui:'h5', style:{ padding: '0.5rem 0% 0rem 0%' }, text: "Merhaba ben Duha,"  },
        { ui:'h2', text: "öğrencilerimle birebir ilgileniyorum  ve bu yüzden kontenjanım sınırlı." },
        { ui:'p', text: "Use media queries to adjust not just font sizes but layouts, spacing, images, and other design elements to ensure an optimal user experience on all devices. It’s common to start with styles for the smallest devices (mobile/phone) and then use media queries to add or override styles for larger screens" },
        { ui:'button', text: 'hemen katil' },
        { ui:'Slider', style: {marginTop: '10vh'}, data: [
          { ui:'img', src: '/whatsappSS/1.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/2.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/3.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/4.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/5.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/6.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/7.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/8.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/9.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/10.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/11.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/whatsappSS/12.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/13.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/14.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/15.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/whatsappSS/16.jpeg', alt: 'Image 2' },
        ] }
      ],
      [
        { ui:'video', src: "/fitvid.mp4", title: 'duhabum ile degisim gosterenler anlatiyor' },
      ],
      [
        { ui:'video', src: "/proof.mp4", title: 'duhabum ile degisim gosterenler anlatiyor' },
      ],
      [
        { ui:'Gallery', }
      ],
      [
        { ui:'h1', text: "O yüzden sana birkaç soru soracağım" },
      ],
      [
        { ui:'Slider', data: [
          { ui:'img', src: '/transitions/1before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/1after.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/2before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/2after.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/transitions/3before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/3after.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/4before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/4after.jpeg', alt: 'Image 2' },
          { ui:'img',  src: '/transitions/5before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/5after.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/6before.jpeg', alt: 'Image 1' },
          { ui:'img',  src: '/transitions/6after.jpeg', alt: 'Image 2' },
        ] }
      ],
      [
        { ui:'h1', text: "h1 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'h2', text: "h2 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'h3', text: "h3 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'h4', text: "h4 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'h5', text: "h5 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'h6', text: "h6 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." },
        { ui:'p', text: "p Use media queries to adjust not just font sizes but layouts, spacing, images, and other design elements to ensure an optimal user experience on all devices. It’s common to start with styles for the smallest devices (mobile/phone) and then use media queries to add or override styles for larger screens...." },
        { ui:'p', text: "p Use media queries to adjust not just font sizes but layouts, spacing, images, and other design elements to ensure an optimal user experience on all devices. It’s common to start with styles for the smallest devices (mobile/phone) and then use media queries to add or override styles for larger screens...." },
      ],
      [
        { ui:'h3', text: "Eğer gerçekten bu sürece hazır olduğunu düşünüyorsan, sorulara detaylıca cevap vermeni istiyorum Cevaplarını inceledikten sonra, bizzat seninle birebir şekilde iletişim kuracağım" },
      ],
    ]
  };

  

  export default function Render({  }: {   }) {

    //const data = await fetch(`https://api.example.com/posts/${params.slug}`, {
    //    next: { revalidate: 12*60*60 }, // Revalidate every 60 seconds
    //}).then((res) => res.json());

  return (

    <main id="mainFrame" >

      {data.sections.map(( section, index ) => 
        <section key={index}>
          <div className="frame" onScroll={(event) => event.stopPropagation() }>
          { section.map( (element) => render(element) ) }
          </div>
        </section>
      )}

    </main>

  );
}