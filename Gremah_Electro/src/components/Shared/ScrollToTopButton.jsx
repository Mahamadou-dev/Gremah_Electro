// src/components/Shared/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 animate-bounce"
        aria-label="Remonter en haut"
      >
        <FaArrowUp size={18} />
      </button>
    )
  )
}

export default ScrollToTopButton
