'use client'
import { motion } from "framer-motion";


const item = {
    hidden: {  y: 0, opacity: 0 },
    visible: { opacity:1, y:[-30,45,-5], transition:{ delay: 2, repeat: Infinity, duration: 2 } }
  }

export default function Arrow() {
    
    return (
        <motion.svg variants={item} className="icons" style={{width: "5rem", height:"5rem", margin: "2rem 0rem 0rem 0.6rem"}} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_192_573)">
        <path d="M69 48.1535L51.3503 65M51.3503 65L33 48.1535M51.3503 65V29"  stroke="white" stroke-width="5" strokeLinecap="round"/>

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
        </motion.svg>
    );
  }
  