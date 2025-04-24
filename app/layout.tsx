// ✅ קובץ: /app/layout.tsx - כולל גובה מלא לפיקס Sidebar ב-MobileDrawer

import './globals.css'
import { UserProvider } from '@/app/context/UserContext'
import Header from '@/app/components/Header'
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'BizzColl',
  description: 'Connecting creators and businesses',
  icons: {
    icon: '/logo.png',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'BizzColl',
    description: 'הפלטפורמה שמחברת בין עסקים ליוצרי תוכן 🔥',
    url: siteUrl,
    siteName: 'BizzColl',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'BizzColl Logo',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen bg-white text-black">
        <UserProvider>
          <div className=" top-0 z-50 shadow-sm bg-white">
            <Header />
          </div>
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
        </UserProvider>
      </body>
    </html>
  )
}
