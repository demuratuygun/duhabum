
import Video from "@/modules/nordic/components/Video";
import Slider from "@/modules/nordic/components/Slider";
import Gallery from "@/modules/nordic/components/Gallery";
import Input from "@/modules/nordic/components/Input";
import Select from "@/modules/nordic/components/Select";

import InputNumber from "@/modules/nordic/components/InputNumber";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Form from "@/modules/nordic/components/Form";
import Text from "@/modules/nordic/components/Text";
import BlogLayout from "@/modules/nordic/layouts/Blog";



export function render(component:any) {
  
  if (component.ui == 'img') 
  return (
    <div key={component.id} style={{ backgroundColor: 'var(--background-color)', ...component.style }} className={['nordicimg', 'noSelect', 'media', ...component.class??[]]?.join(' ')} >
      <img id={component.id} 
        data-track
        draggable={false}
        src={component.src}
        alt={component.alt}
        //fill={true}
        loading="lazy"
        //sizes={`${component.style?.width ?? '200px'}, ${component.style?.height ?? '300px'}`}
        style={{ objectFit: 'cover' }}
      />
    </div>)
  else if ( ['h1' , 'h2' , 'h3' , 'h4' , 'h5' , 'h6' , 'p'].find((ui)=>ui==component.ui) ) 
    return (<Text key={component.id} component={component}/>);
  else if (component.ui == 'button') 
    return (
      <a key={component.id} href={component.href} target={component.target} className='noSelect'>
        <button id={component.id} data-track className="nordic" style={component.style}> {component.text} </button>
      </a> )
  else if (component.ui == 'slider') 
    return (
    <Slider id={component.id} key={component.id}  showPager={true} data={component.data} >
      {component.data.map((data:any) => render(data) )}
    </Slider> )
  else if (component.ui == 'video') {
    return( 
    <Video 
      key={component.id} 
      id={component.id} 
      style={component.style??{}} 
      title={component.title??""} 
      src={component.src??""} 
      active={component.active??true} 
      noControl={component.noControl??false}
    />
  )
  }else if (component.ui == 'gallery') 
    return (
    <Gallery id={component.id} key={component.id} fixedHeight={false} data={component.data} maxColWidth={component.maxColWidth}>
      {component.data.map((data:any) => <div>{data.map((comp:any)=>render(comp))}</div>)}
    </Gallery> )
  else if( component.ui == 'number' ) return (
    <InputNumber key={component.id} id={component.id} value={component.value} label={component.name??''} unit={component.unit??''} range={component.range} required={component.required??false} />
  )
  else if( component.ui == 'input' ) return (
    <Input id={component.id} 
      key={component.id} 
      type={component.type??'text'} 
      Value={component.value??""} 
      examples={component.examples} 
      verify={component.verify} 
      explanation={component.explanation??""}
      required={component.required??false}
     />
  )
  
  else if( component.ui == 'select' ) return (
    <Select id={component.id} key={component.id} style={component.style} question={component.question} options={component.options} verify={{min:component.min, max:component.max}} required={component.required??false}>
    </Select>
  )
  else if( component.ui == 'form' ) { return (
    <Form key={component.id} id={component.id} form={component} ></Form>
  )} else if (component.ui == 'Marquee') return (
    <div id={component.id} data-track key={component.id} className="MarqueeContainer" style={{}}>
      <Marquee style={{ 
          fontFamily: "'Saira', sans-serif", 
          fontWeight:300, fontSize:'1.7rem', 
          backgroundColor:component.bgColor??'var(--background-color)', 
          zIndex:1000, height:'fit-content', ...component.style
        }} 
        pauseOnHover={component.pauseOnHover??true} 
        pauseOnClick={component.pauseOnClick??true} 
        gradient={component.noGradient?false:true} 
        gradientColor={component.bgColor??'var(--background-color)'} 
        direction={component.direction??'left'}
        speed={component.speed??50} 
        >
        { //component.data?.map((data:any, i:number) => <div style={{whiteSpace: 'nowrap', width: 'fit-content', overflowX: 'auto', maxWidth:undefined}}>{render(data)}</div>)??
          ( component.text.map((text:string, i:number) => <div key={i} style={{ marginRight: '3rem' }}>{text}</div> ))
        }
      </Marquee>
    </div>
  ) // card ui
  else if(component.ui == 'div') return (
    <div id={component.id} key={component.id} style={{ ...component.style }}>
      {component.data.map((data:any, i:number) => render(data) )}
    </div> )
  else if(component.ui == 'blog') return (
    <BlogLayout key={component.id}>
      <div style={{width:'100%'}}>{component.note?.map((data:any, i:number) => render(data) )}</div>
      <div style={{width:'100%'}}>{component.main?.map((data:any, i:number) => render(data) )}</div>
      <div style={{width:'100%'}}>{component.side?.map((data:any, i:number) => render(data) )}</div>
    </BlogLayout> )
  else if (component.ui == 'ul') return (
    <ul id={component.id} data-track key={component.id} className="nordic" style={component.style}>
      {component.data.map((data:any, i:number) => <li key={i}>{render(data)}</li>)}
    </ul> )
  else if (component.ui == 'card') return ( //onClick={() => {console.log(component.target);alert(component.href)}}>
    <div id={component.id} data-track key={component.id} className="noSelect nordicCard" style={component.style}>
      {component.data.map((data:any, i:number) => <div key={i}>{render(data)}</div>)}
    </div>
  );
  else if ( component.ui=="googleReviews" ) return (
    <div key={4} className="max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">Google Yorumları</h2>

        <div key={3} className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <img
              src={'https://via.placeholder.com/150'}
              alt={'isim'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">isim</p>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                {'★'.repeat(4)}{' '}
                {'☆'.repeat(5 - 4)}
              </div>
              <p className="text-xs text-gray-500">
                12.04.2025
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-800">ghdghfhfh</p>
          <div className="mt-2 text-sm text-blue-600 underline">
            Google üzerinden görüntüle
          </div>
        </div>
    </div>
  )

} 