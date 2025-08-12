import React from 'react';
import { motion } from 'framer-motion';

const ParallaxImage = ({ y, children }) => {
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};

export default ParallaxImage;