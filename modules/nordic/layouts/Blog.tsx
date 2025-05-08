'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BlogLayoutProps {
  children: [ReactNode, ReactNode, ReactNode]; // [left, center, right]
}

export default function ModernBlogLayout({ children }: BlogLayoutProps) {
  const [leftContent, centerContent, rightContent] = children;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', padding:0, position: 'relative', overflowX: 'hidden', display: 'flex', gap:0, flexDirection: 'row', }}>

        {/* Left Column - Sticky CTAs / Annotations */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '20vw', display: 'flex', alignItems:'center', alignContent:'center', }}
        >
          {leftContent}
        </motion.aside>

        {/* Center Column - Main Article */}
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '52vw', margin:'1vw', overflow:'visible', display: 'flex', justifyContent:'left', justifyItems:'left', alignItems:'center', alignContent:'center' }}
        >
          {centerContent}
        </motion.main>

        {/* Right Column - Media / Cards */}
        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ width: '24vw', marginLeft:'5vw', minHeight:'100vh', position:'sticky', top:0, display: 'flex', justifyContent:'left', justifyItems:'left', alignItems:'center', alignContent:'center' }}
        >
          {rightContent}
          
        </motion.aside>

    </div>
  );
}