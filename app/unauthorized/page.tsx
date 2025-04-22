'use client'

import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-md border border-red-200 text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-700 tracking-wide">
          אין לך הרשאה לצפות בדף זה ❌
        </h1>
        <p className="text-gray-700 text-base leading-relaxed">
          ייתכן שניסית לגשת לעמוד שלא מיועד לתפקיד שלך, או שאתה לא מחובר.
        </p>

        <button
            onClick={() => router.replace('/dashboard-redirect')}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md"
            >
            חזור לדשבורד
            </button>

      </div>
    </main>
  )
}
