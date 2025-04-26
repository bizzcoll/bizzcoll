'use client'

// 📦 חבילות
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

// 🎨 קומפוננטות
import FormField from './FormField'
import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'
import SelectInput from './SelectInput'
import BudgetRangeInputs from './BudgetRangeInputs'
import FileUpload from './FileUpload'
import SubmitButton from './SubmitButton'

export default function NewDealForm() {
  const router = useRouter()
  const MAX_TITLE_LENGTH = 80
  const MAX_DESC_LENGTH = 480

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [minBudget, setMinBudget] = useState<number | ''>('')
  const [maxBudget, setMaxBudget] = useState<number | ''>('')
  const [mediaType, setMediaType] = useState('')
  const [pricingOption, setPricingOption] = useState<'fixed' | 'range'>('fixed')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const [generalError, setGeneralError] = useState<string | null>(null)
  const [budgetRangeError, setBudgetRangeError] = useState<string | null>(null)
  const [titleError, setTitleError] = useState<string | null>(null)

  const [businessId, setBusinessId] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getSession()
      const id = session.data.session?.user?.id
      if (!id) {
        router.replace('/auth')
        return
      }
      setBusinessId(id)
    }
    fetchUser()
  }, [router])

  const sanitizeText = (text: string) => text.replace(/<[^>]*>?/gm, '')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files).slice(0, 3) : []
    setFiles(selected)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeneralError(null)
    setBudgetRangeError(null)
    setTitleError(null)

    try {
      const cleanTitle = sanitizeText(title.trim()).slice(0, MAX_TITLE_LENGTH)
      const cleanDescription = sanitizeText(description.trim()).slice(0, MAX_DESC_LENGTH)
      const allowedTypes = ['video', 'image', 'article']

      if (!cleanTitle) {
        setTitleError('שדה חובה – נא להזין כותרת תקינה')
        setLoading(false)
        return
      }

      if (mediaType && !allowedTypes.includes(mediaType)) {
        throw new Error('סוג מדיה לא חוקי')
      }

      if (
        pricingOption === 'range' &&
        (
          minBudget === '' ||
          maxBudget === '' ||
          Number(minBudget) > Number(maxBudget) ||
          Number(maxBudget) > Number(minBudget) * 1.2
        )
      ) {
        setBudgetRangeError('טווח התקציב לא תקין – ההפרש בין מקסימום למינימום לא יכול לעלות על 20%')
        setLoading(false)
        return
      }

      if (files.length > 3) throw new Error('ניתן להעלות עד 3 תמונות בלבד')

      const imagePaths: string[] = []
      for (const file of files) {
        if (!file.type.startsWith('image/')) throw new Error(`"${file.name}" אינו קובץ תמונה`)
        if (file.size > 7 * 1024 * 1024) throw new Error(`"${file.name}" חורג מ־7MB`)

        const ext = file.name.split('.').pop()
        const filePath = `${uuidv4()}.${ext}`

        const { error: uploadError } = await supabase.storage.from('deals').upload(filePath, file)
        if (uploadError) throw new Error(`שגיאה בהעלאת הקובץ ${file.name}`)

        imagePaths.push(filePath)
      }

      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          title: cleanTitle,
          description: cleanDescription,
          budget: pricingOption === 'fixed' ? (budget === '' ? undefined : Number(budget)) : undefined,
          min_budget: pricingOption === 'range' ? (minBudget === '' ? undefined : Number(minBudget)) : undefined,
          max_budget: pricingOption === 'range' ? (maxBudget === '' ? undefined : Number(maxBudget)) : undefined,
          mediaType,
          image_paths: imagePaths,
        }),
      })

      if (!res.ok) throw await res.json()
      router.push('/dashboard/deal-maker/my-deals')
    } catch (err: any) {
      setGeneralError(err.message || 'שגיאה ביצירת הדיל')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-10 bg-gray-50" dir="rtl">
      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-4xl mx-auto" dir="rtl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">צור דיל חדש ➕</h2>

        {generalError && <p className="text-red-600 font-semibold text-center">{generalError}</p>}

        <FormField label="כותרת *" error={titleError}>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="הכנס כותרת מתאימה..."
            maxLength={MAX_TITLE_LENGTH}
          />
        </FormField>

        <FormField label="תיאור">
          <TextAreaInput
            value={description}
            onChange={(e) => {
              const inputValue = e.target.value
              const lines = inputValue.split('\n')
              if (lines.length <= 6) setDescription(inputValue)
            }}
            placeholder="תאר את קמפגיין הפרסום שלך בפירוט..."
            maxLength={MAX_DESC_LENGTH}
          />
        </FormField>

        <FormField label="סוג תקציב">
          <SelectInput
            value={pricingOption}
            onChange={(e) => setPricingOption(e.target.value as 'fixed' | 'range')}
            options={[
              { value: 'fixed', label: 'מחיר אחיד' },
              { value: 'range', label: 'טווח מחירים' }
            ]}
            placeholder="בחר סוג תקציב"
          />
        </FormField>

        {pricingOption === 'fixed' ? (
          <FormField label="תקציב (₪)">
            <TextInput
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="הכנס תקציב"
            />
          </FormField>
        ) : (
          <FormField label="טווח תקציב" error={budgetRangeError}>
            <BudgetRangeInputs
              minValue={minBudget}
              maxValue={maxBudget}
              onMinChange={(e) => setMinBudget(e.target.value === '' ? '' : Number(e.target.value))}
              onMaxChange={(e) => setMaxBudget(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </FormField>
        )}

        <FormField label="סוג מדיה">
          <SelectInput
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            options={[
              { value: 'video', label: 'וידאו' },
              { value: 'image', label: 'תמונה' },
              { value: 'article', label: 'מאמר' }
            ]}
            placeholder="בחר סוג מדיה"
          />
        </FormField>

        <FormField label="תמונות (עד 3)">
          <FileUpload
            onChange={handleFileChange}
            files={files}
            inputRef={fileInputRef}
          />
        </FormField>

        <SubmitButton loading={loading} text="צור דיל" />
      </form>
    </div>
  )
}
