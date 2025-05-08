'use client';

import { motion } from 'framer-motion';

export default function Text({ component }: { component: any }) {
  // If there's no text, render nothing
  if (!component.text) return null;

  // Function to recursively render text or nested elements
  const renderText = (text: any, index: string | number): JSX.Element | string => {
    
    if (typeof text === 'string') return text; 
    
    else if (Array.isArray(text)) {
      // Render nested array of text or elements
      return (
        <>
          {text.map((nestedText, nestedIndex) =>
            renderText(nestedText, `${index}-${nestedIndex}`)
          )}
        </>
      );
    } else  {
      // Render text with optional style
      return (
        <span key={`motion-span-${index}`}
          style={{
            ...(text.style?.backgroundImage
              ? { backgroundSize: 'cover',
                    display: text.nl? 'block':'inline-block',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    verticalAlign: 'middle',
                    borderRadius: '0.5em',
                    width: '1.5em', height: '1.5em', margin: '0em 0.3em', }
                : text.style?.backgroundColor? {
                    padding: '0em 0.3em',  
                    borderRadius: '0.5em', 
                    verticalAlign: 'middle',
                }: {}),
            ...text.style, opacity:1
          }}
        >
          {text.t? renderText(text.t, index) : null} 
          {text.nl? <br /> : null}
        </span>
      );
    }

  };

  const UiElement = component.ui || 'p';

  // If the text is an array, process each item
  return (
    <motion.div
    viewport={{ amount:'some', once: true }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, delay: 0 }}
    >
    <UiElement
      id={component.id}
      data-track
      className={component.class?.join(' ')}
      style={{ position: 'relative', display: 'inline-block', ...component.style, textAlign: 'left' }}
    >
      { renderText(component.text, 'start')}
    </UiElement>
    </motion.div>
  );
}