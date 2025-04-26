'use client'

import React from 'react'

type FormFieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold text-base md:text-lg text-gray-700 transition-all">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 font-semibold text-sm animate-pulse">{error}</p>}
    </div>
  )
}
