'use client'

import React from 'react'

type TextAreaInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  maxLength?: number
}

export default function TextAreaInput({ value, onChange, placeholder, maxLength }: TextAreaInputProps) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out h-48 resize-none"
        dir="rtl"
      />
      {maxLength && (
        <div className="absolute bottom-2 left-3 text-xs text-gray-500">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
