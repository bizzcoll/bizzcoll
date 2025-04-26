'use client'

import React from 'react'

type TextInputProps = {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'number'
  maxLength?: number
}

export default function TextInput({ value, onChange, placeholder, type = 'text', maxLength }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className="w-full px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out"
    />
  )
}
