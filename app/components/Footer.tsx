'use client'

import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { Home } from 'lucide-react' // 👈 אייקון בית

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-0 pt-8 pb-6 px-4 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
        
{/* חלק שמאלי - אייקונים */}
<div className="flex items-center gap-4 text-2xl">
  {/* אייקון בית */}
  <a
    href="/dashboard-redirect"
    className="group text-white hover:text-green-400 transition-colors duration-300"
  >
    <Home className="inline-block transition-transform duration-300 group-hover:scale-125" size={24} />
        </a>

        {/* שאר האייקונים */}
        <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-white hover:text-blue-400 transition-colors duration-300"
        >
            <FaFacebookF className="inline-block transition-transform duration-300 group-hover:scale-125" />
        </a>
        <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-white hover:text-pink-300 transition-colors duration-300"
        >
            <FaTiktok className="inline-block transition-transform duration-300 group-hover:scale-125" />
        </a>
        <a
            href="https://www.instagram.com/bizz.coll/"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-white hover:text-pink-600 transition-colors duration-300"
        >
            <FaInstagram className="inline-block transition-transform duration-300 group-hover:scale-125" />
        </a>
        
        <span className="font-semibold text-xl text-gray-300"> עקבו אחרינו</span>
        </div>


        {/* חלק ימני - ניווט */}
      {/* חלק ימני - ניווט */}
            {/* חלק ימני - ניווט */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-gray-300 font-semibold text-xl">
        <a href="/" className="hover:underline underline-offset-4 decoration-[1.5px] decoration-blue-300">דף הבית</a>
        <a href="/about" className="hover:underline underline-offset-4 decoration-[1.5px] decoration-blue-300">אודות</a>
        <a href="/campaigns" className="hover:underline underline-offset-4 decoration-[1.5px] decoration-blue-300">פרסומים</a>
        <a href="/clients" className="hover:underline underline-offset-4 decoration-[1.5px] decoration-blue-300">לקוחות</a>
        <a href="/contact" className="hover:underline underline-offset-4 decoration-[1.5px] decoration-blue-300">צור קשר</a>
        </div>


      </div>

      {/* שורת זכויות יוצרים */}
      <div className="text-center text-base text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BizzColl. כל הזכויות שמורות.
      </div>
    </footer>
  )
}
