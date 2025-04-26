'use client'

import React from 'react'

type FileUploadProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  files: File[]
  inputRef: React.RefObject<HTMLInputElement>
}

export default function FileUpload({ onChange, files, inputRef }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        ref={inputRef}
        className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-green-100 file:text-green-700
          hover:file:bg-green-200 transition-all duration-200"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {files.map((file, idx) => (
          <div key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center space-x-1">
            <span>{file.name}</span>
            <span className="text-gray-400">({(file.size / (1024 * 1024)).toFixed(1)}MB)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
