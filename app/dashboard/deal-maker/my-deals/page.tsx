'use client'

export default function MyDealsPage() {
  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-green-600 tracking-wide">הדילים שלי 📦</h1>
      <p className="text-gray-700 text-base leading-relaxed">צפה בדילים שפרסמת ובמצבם הנוכחי.</p>

      {/* כרטיס דיל */}
      <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-md border border-green-200 
                      flex flex-col md:flex-row justify-between items-end md:items-center gap-6 transition-all duration-300 
                      hover:bg-white hover:border-green-400 hover:shadow-lg group">
        
        {/* כפתור "צפה" */}
        <button className="bg-green-600 text-white text-l font-semibold px-10 py-2 rounded-lg shadow 
                           transition-all duration-300 ease-in-out border border-transparent
                           hover:bg-white hover:text-green-600 hover:border-green-500">
          צפה
        </button>

        {/* תוכן הדיל */}
        <div className="text-right space-y-2">
          {/* כותרת עם רקע */}
          <div className="inline-block px-4 py-2 bg-green-100/60 backdrop-blur-sm rounded-lg shadow-sm group-hover:bg-green-100">
            <h2 className="text-lg md:text-xl font-bold text-green-800 leading-snug group-hover:text-green-700">
              🎯 קמפיין לקיץ
            </h2>
          </div>

          <p className="text-xl text-gray-700 font-medium">
            שת״פ עם משפיעני לייף-סטייל לחשיפת קולקציה חדשה.
          </p>

          <div className="text-l text-gray-500 font-medium space-y-1">
            <div>
              <span className="font-bold text-green-700">קטגוריות:</span> אופנה, אינסטגרם
            </div>
            <div>
            ⭐⭐⭐⭐☆<span className="font-bold text-green-700">:דירוג</span> 
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
