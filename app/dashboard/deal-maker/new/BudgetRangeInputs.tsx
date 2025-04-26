'use client'

import React from 'react'

type BudgetRangeInputsProps = {
  minValue: number | ''
  maxValue: number | ''
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function BudgetRangeInputs({ minValue, maxValue, onMinChange, onMaxChange, error }: BudgetRangeInputsProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="תקציב מינימלי (₪)"
          value={minValue}
          onChange={onMinChange}
          min="0"
          className="w-full px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out"
        />
        <input
          type="number"
          placeholder="תקציב מקסימלי (₪)"
          value={maxValue}
          onChange={onMaxChange}
          min="0"
          className="w-full px-4 py-3 border rounded-lg text-right bg-gray-100 focus:bg-white focus:border-green-400 transition-all duration-200 ease-in-out"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 text-right animate-pulse">{error}</p>
      )}
    </div>
  )
}
