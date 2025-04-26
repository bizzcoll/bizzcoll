'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

type SubmitButtonProps = {
  loading: boolean
  text: string
}

export default function SubmitButton({ loading, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5" />
          שומר...
        </>
      ) : (
        text
      )}
    </button>
  )
}
