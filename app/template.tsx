"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="center"
        style={{  width: "100%", minHeight: "100vh", overflowX: 'clip', zIndex:900 }}
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
}