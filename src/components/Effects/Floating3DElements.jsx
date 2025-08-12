import React from 'react';
import { motion } from 'framer-motion';

const Floating3DElements = ({ count = 5, size = 30, opacity = 0.2 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotate: Math.random() * 360,
            opacity: opacity
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            background: 'currentColor',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </>
  );
};

export default Floating3DElements;