'use client'

export default function ArrowUp() {
    
    return (
      <svg style={{ width: "1em", height:"1.4rem", margin:'0.2rem 1rem 0px 0px', padding:0, }} 
        viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_192_573)">
          <path d="M1.5 2L25.5 2M25.5 2V26M25.5 2L1.5 26"  stroke="#727272" stroke-width="3" stroke-linecap="round"/>
        </g>
        <defs>
        <filter id="filter0_d_192_573" x="0" y="0" width="102" height="102" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="3.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_573"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_573" result="shape"/>
        </filter>
        </defs>
        </svg>
    );
  }
  