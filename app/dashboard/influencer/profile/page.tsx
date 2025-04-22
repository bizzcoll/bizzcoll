export default function InfluencerProfilePage() {
  return (
    <main className="p-6 space-y-4 text-right">
      <h1 className="text-3xl font-bold text-blue-600 tracking-wide">הפרופיל שלך 👤</h1>
      <p className="text-gray-700">נהל את הפרטים האישיים שלך והצג את הסטטיסטיקות שלך.</p>

      <div className="bg-white/50 backdrop-blur-md p-4 rounded-xl shadow border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-700">📊 סטטיסטיקות אחרונות:</h2>
        <ul className="text-sm mt-2 text-gray-700 space-y-1">
          <li>👥 עוקבים: 12,400</li>
          <li>📈 ממוצע צפיות: 5,000</li>
          <li>🤝 שיתופי פעולה: 3</li>
        </ul>
      </div>
    </main>
  )
}
