import React from 'react'

const Heading = ({ title, subtitle }) => {
  return (
    <div className='text-center mb-10'>
      <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>{title}</h2>
      <p className='text-gray-600 dark:text-gray-300 mt-2'>{subtitle}</p>
    </div>
  )
}

export default Heading
