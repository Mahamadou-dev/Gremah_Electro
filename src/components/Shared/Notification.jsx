import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <FiCheckCircle className="mr-2 text-xl" />
        <span>{message}</span>
        <button 
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default Notification;