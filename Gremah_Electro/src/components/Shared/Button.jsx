import React from 'react'

const Button = ({ text, bgColor = 'bg-blue-600', textColor = 'text-white' }) => {
  return (
    <button
      className={`${bgColor} ${textColor} px-4 py-2 rounded-full font-medium hover:opacity-90 transition duration-300 shadow-md`}
    >
      {text}
    </button>
  )
}

export default Button
