import './globals.css'
import { UserProvider } from '@/app/context/UserContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import AccessibilityWidget from '@/app/components/AccessibilityWidget' // ✅ ייבוא קומפוננטת נגישות
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'BizzColl-Collaboration Platform',
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
    <html lang="en" className="min-h-screen overflow-x-hidden">
      <body className="flex flex-col min-h-screen overflow-x-hidden bg-white text-black">
        <UserProvider>
          <div className="top-0 z-50 shadow-sm bg-white">
            <Header />
          </div>

          {/* פתרון לגלילה – גובה קבוע לדף פחות גובה Header */}
          <main className="flex-1 min-h-[calc(100vh-70px)]">
            {children}
          </main>

          <Footer />
          <AccessibilityWidget /> {/* 🔥 קומפוננטת נגישות חדשה */}
          <Toaster position="top-center" reverseOrder={false} />
        </UserProvider>
      </body>
    </html>
  )
}
