'use client'

export default function AppliedDealsPage() {
  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-blue-600 tracking-wide">הדילים שהגשת עליהם</h1>
      <p className="text-gray-700 text-base leading-relaxed">כאן תוכל לעקוב אחרי הדילים שאתה ממתין לאישורם.</p>

      {/* כרטיס דיל */}
      <div className="transition-all duration-300 ease-in-out hover:bg-white hover:border-blue-400 hover:shadow-lg 
                      bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-md border border-blue-200 
                      flex flex-col md:flex-row justify-between items-end md:items-center gap-6 group">

        {/* סטטוס בצד ימין */}
        <div className="text-sm font-semibold text-blue-800 px-4 py-2 bg-blue-100/60 rounded-lg shadow-sm group-hover:bg-blue-100 group-hover:text-blue-700">
          ממתין לאישור
        </div>

        {/* תוכן הדיל */}
        <div className="text-right space-y-2 group-hover:text-blue-800 transition-all duration-300">
          <div className="inline-block px-4 py-2 bg-blue-100/60 backdrop-blur-sm rounded-lg shadow-sm group-hover:bg-blue-100">
            <h2 className="text-lg md:text-xl font-bold text-blue-800 leading-snug group-hover:text-blue-700">
              💼 השקת מוצר טבעי
            </h2>
          </div>

          <p className="text-sm text-gray-700 font-medium">
            הצעת שיתוף פעולה למוצר אורגני – בקמפיין רילס וטיקטוק.
          </p>
        </div>
      </div>
    </main>
  )
}
