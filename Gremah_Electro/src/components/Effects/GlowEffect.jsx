import React from 'react';

const GlowEffect = ({ 
  color = 'primary', 
  size = 'md', 
  intensity = 'medium', 
  children, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4'
  };

  const intensityClasses = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70'
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`absolute inset-0 rounded-full bg-${color} ${sizeClasses[size]} ${intensityClasses[intensity]} blur-md`}
      />
      {children}
    </div>
  );
};

export default GlowEffect;