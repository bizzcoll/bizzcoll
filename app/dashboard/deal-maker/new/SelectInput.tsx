'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

type Option = {
  label: string
  value: string
}

type SelectInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  placeholder?: string
}

export default function SelectInput({ value, onChange, options, placeholder }: SelectInputProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out pr-10"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
    </div>
  )
}
