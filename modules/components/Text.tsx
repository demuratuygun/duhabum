import { motion } from "framer-motion";

const container = {
    hidden: {y:-30, opacity:0},
    visible: {y:0, opacity:1, 
        transition: {
            type: "tween",
            delayChildren: 1,
            staggerChildren: 0.06
          }
    },
}

const item = {
    hidden: {  opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

type textProps= {text:string} 

export default function Text({text}:textProps) {

    const letters = text.split("");
    return (
      <motion.div variants={container} initial="hidden" whileInView="visible" style={{ zIndex: 900 }}>
        {letters.map((letter, index) => (
          <motion.span key={index}
            variants={item}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }
  