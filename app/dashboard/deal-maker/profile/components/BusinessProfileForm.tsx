'use client'

import { Input } from '@/components/ui/input'
import TextAreaInput from '@/app/dashboard/deal-maker/new/TextAreaInput'
import { Button } from '@/components/ui/button'
import { Paperclip, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BusinessProfileForm({
  profile,
  selectedLogo,
  selectedCover,
  handleChange,
  handleUpload,
  setSelectedLogo,
  setSelectedCover,
}: any) {
  const formatFileSize = (size: number) => (size / (1024 * 1024)).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-1/2 max-w-[500px] space-y-6 text-right"
      dir="rtl"
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold">שם העסק *</label>
        <Input name="name" value={profile.name} onChange={handleChange} required maxLength={50} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">תיאור קצר</label>
        <TextAreaInput
          value={profile.description || ''}
          onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value } } as any)}
          placeholder="תיאור קצר על העסק שלך..."
          maxLength={300}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">תחום פעילות</label>
        <Input name="category" value={profile.category || ''} onChange={handleChange} maxLength={50} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">טלפון ליצירת קשר</label>
        <Input name="phone" value={profile.phone || ''} onChange={handleChange} maxLength={20} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">אתר / לינק</label>
        <Input name="website" value={profile.website || ''} onChange={handleChange} maxLength={100} />
      </div>

      {/* העלאות */}
      <UploadField label="העלאת לוגו" onChange={(e) => handleUpload(e, 'logo_url')} selectedFile={selectedLogo} setSelectedFile={setSelectedLogo} />
      <UploadField label="העלאת תמונת קאבר" onChange={(e) => handleUpload(e, 'cover_url')} selectedFile={selectedCover} setSelectedFile={setSelectedCover} />
    </motion.div>
  )
}

function UploadField({
  label,
  onChange,
  selectedFile,
  setSelectedFile,
}: {
  label: string,
  onChange: (e: any) => void,
  selectedFile: File | null,
  setSelectedFile: (file: File | null) => void
}) {
  const formatFileSize = (size: number) => (size / (1024 * 1024)).toFixed(2)

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      <label className="relative w-fit cursor-pointer">
        <Button type="button" variant="outline" className="flex items-center gap-2 bg-white hover:bg-gray-200 pointer-events-none">
          <Paperclip size={18} />
          בחר קובץ
        </Button>
        <Input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={onChange} />
      </label>
      {selectedFile && (
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md shadow-inner mt-2 w-fit">
          <span className="text-sm text-gray-700">{selectedFile.name} ({formatFileSize(selectedFile.size)} MB)</span>
          <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
