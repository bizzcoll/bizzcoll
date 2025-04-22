'use client'

export default function AvailableDealsPage() {
  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-blue-600 tracking-wide">🎯 דילים זמינים</h1>
      <p className="text-gray-700 text-base leading-relaxed">מצא את הדילים הכי חמים וקח חלק בשיתופי פעולה!</p>

      {/* כרטיס דיל */}
      <div className="transition-all duration-300 ease-in-out hover:bg-white hover:border-blue-400 hover:shadow-lg 
                      bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-md border border-blue-200 
                      flex flex-col md:flex-row justify-between items-end md:items-center gap-6 group">
        
        {/* כפתור הגשה - בצד ימין */}
        <button className="bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow 
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-500">
          הגש מועמדות
        </button>

        {/* תוכן הדיל - בצד שמאל */}
        <div className="text-right space-y-2 group-hover:text-blue-800 transition-all duration-300">
          {/* כותרת עם רקע */}
          <div className="inline-block px-4 py-2 bg-blue-100/60 backdrop-blur-sm rounded-lg shadow-sm group-hover:bg-blue-100">
            <h2 className="text-lg md:text-xl font-bold text-blue-800 leading-snug group-hover:text-blue-700">
              🔥 פרסומת לטיקטוק
            </h2>
          </div>

          {/* מידע נוסף */}
          <div className="text-sm text-gray-700 font-medium  space-y-1">
            <div>
              <span className="font-bold text-blue-700">תקציב:</span> 1,000₪
            </div>
            <div>
              <span className="font-bold text-blue-700">קטגוריה:</span> בידור
            </div>
            <div>
            ⭐⭐⭐⭐☆<span className="font-bold text-blue-700">:דירוג</span> 
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
