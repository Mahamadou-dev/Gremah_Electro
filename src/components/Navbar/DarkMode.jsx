import React, { useEffect, useState } from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Lire le thème stocké dans localStorage au tout début
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Sinon, vérifier les préférences système
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Met à jour <html> et localStorage quand le thème change
  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <div>
      {isDarkMode ? (
        <MdOutlineLightMode
          className='text-2xl text-yellow-400 cursor-pointer'
          onClick={toggleTheme}
          title="Mode clair"
        />
      ) : (
        <MdOutlineDarkMode
          className='text-2xl text-gray-700 dark:text-gray-300 cursor-pointer'
          onClick={toggleTheme}
          title="Mode sombre"
        />
      )}
    </div>
  )
}

export default DarkMode
