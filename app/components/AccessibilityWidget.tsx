'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Minus, Contrast, RefreshCw, Type, Link as LinkIcon, FileText, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWheelchair } from 'react-icons/fa'
import Link from 'next/link'

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [nightMode, setNightMode] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [readableFont, setReadableFont] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  const toggleWidget = () => setOpen(prev => !prev)

  const increaseFont = () => {
    const newSize = Math.min(fontSize + 10, 200)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem('fontSize', String(newSize))
  }

  const decreaseFont = () => {
    const newSize = Math.max(fontSize - 10, 50)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem('fontSize', String(newSize))
  }

  const toggleNightMode = () => {
    setNightMode(prev => {
      const newValue = !prev
      localStorage.setItem('nightMode', JSON.stringify(newValue))
      document.documentElement.classList.toggle('night-mode', newValue)
      return newValue
    })
  }

  const toggleContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev
      localStorage.setItem('highContrast', JSON.stringify(newValue))
      document.documentElement.classList.toggle('high-contrast', newValue)
      return newValue
    })
  }

  const toggleReadableFont = () => {
    setReadableFont(prev => {
      const newValue = !prev
      localStorage.setItem('readableFont', JSON.stringify(newValue))
      document.documentElement.classList.toggle('readable-font', newValue)
      return newValue
    })
  }

  const toggleHighlightLinks = () => {
    setHighlightLinks(prev => {
      const newValue = !prev
      localStorage.setItem('highlightLinks', JSON.stringify(newValue))
      document.documentElement.classList.toggle('highlight-links', newValue)
      return newValue
    })
  }

  const resetSettings = () => {
    setFontSize(100)
    setHighContrast(false)
    setReadableFont(false)
    setHighlightLinks(false)
    setNightMode(false)

    document.documentElement.style.fontSize = '100%'
    document.documentElement.classList.remove('high-contrast', 'readable-font', 'highlight-links', 'night-mode')

    localStorage.removeItem('fontSize')
    localStorage.removeItem('highContrast')
    localStorage.removeItem('readableFont')
    localStorage.removeItem('highlightLinks')
    localStorage.removeItem('nightMode')
  }

  useEffect(() => {
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '100')
    const savedContrast = JSON.parse(localStorage.getItem('highContrast') || 'false')
    const savedReadable = JSON.parse(localStorage.getItem('readableFont') || 'false')
    const savedLinks = JSON.parse(localStorage.getItem('highlightLinks') || 'false')
    const savedNight = JSON.parse(localStorage.getItem('nightMode') || 'false')

    setFontSize(savedFontSize)
    document.documentElement.style.fontSize = `${savedFontSize}%`

    if (savedContrast) {
      setHighContrast(true)
      document.documentElement.classList.add('high-contrast')
    }

    if (savedReadable) {
      setReadableFont(true)
      document.documentElement.classList.add('readable-font')
    }

    if (savedLinks) {
      setHighlightLinks(true)
      document.documentElement.classList.add('highlight-links')
    }

    if (savedNight) {
      setNightMode(true)
      document.documentElement.classList.add('night-mode')
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWidget}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out"
        aria-label="תפריט נגישות"
      >
        <FaWheelchair size={26} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="bg-white border shadow-2xl rounded-2xl p-5 flex flex-col gap-4 mt-4 transition-all"
          >
            <button onClick={increaseFont} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <Plus size={20} /> הגדל טקסט
            </button>
            <button onClick={toggleNightMode} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <Moon size={20} /> מצב לילה
            </button>
            <button onClick={decreaseFont} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <Minus size={20} /> הקטן טקסט
            </button>
            <button onClick={toggleContrast} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <Contrast size={20} /> ניגודיות גבוהה
            </button>
            <button onClick={toggleReadableFont} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <Type size={20} /> פונטים קריאים
            </button>
            <button onClick={toggleHighlightLinks} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <LinkIcon size={20} /> הדגשת קישורים
            </button>
            <Link href="/accessibility-statement" className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <FileText size={20} /> הצהרת נגישות
            </Link>
            <button onClick={resetSettings} className="flex items-center gap-2 hover:text-blue-600 transition-all">
              <RefreshCw size={20} /> איפוס הגדרות
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
