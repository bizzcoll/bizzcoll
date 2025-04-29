'use client'

import React, { useEffect, useRef } from 'react'

type TextAreaInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  maxLength?: number
}

export default function TextAreaInput({ value, onChange, placeholder, maxLength }: TextAreaInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textArea = textAreaRef.current
    if (!textArea) return

    const resizeTextArea = () => {
      textArea.style.height = 'auto'
      const scrollHeight = textArea.scrollHeight
      const maxHeight = 300
      textArea.style.height = Math.min(scrollHeight, maxHeight) + 'px'
      textArea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
    }

    resizeTextArea()

    textArea.addEventListener('input', resizeTextArea)
    return () => textArea.removeEventListener('input', resizeTextArea)
  }, [])

  const isCloseToLimit = maxLength ? value.length >= 0.8 * maxLength : false

  return (
    <div className="relative w-full overflow-hidden">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        wrap="hard"
        dir="rtl"
        className={`block w-full h-14 min-h-[3.5rem] max-h-[300px] px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out overflow-x-hidden overflow-y-auto resize-none whitespace-pre-wrap break-words break-all ${isCloseToLimit ? 'border-red-400 focus:border-red-500' : 'border-gray-300'}`}
      />
      {maxLength && (
        <div className={`absolute bottom-2 left-3 text-xs ${isCloseToLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
