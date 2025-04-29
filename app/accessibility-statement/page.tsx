export default function AccessibilityStatementPage() {
    return (
      <main dir="rtl" className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-12 text-right">
        <h1 className="text-4xl font-bold text-green-700 mb-6">הצהרת נגישות</h1>
  
        <p className="mb-4">
          אנחנו ב־<strong>BizzColl</strong> עושים מאמצים להנגיש את הפלטפורמה שלנו עבור כלל המשתמשים, ובפרט עבור אנשים עם מוגבלות.
          אנו רואים חשיבות עליונה בהנגשת שירותינו הדיגיטליים, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקנותיו.
        </p>
  
        <p className="mb-4">
          האתר פותח בהתאם להנחיות התקן הבינלאומי <strong>WCAG 2.1</strong> ברמה <strong>AA</strong>.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">התאמות שבוצעו:</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>תמיכה בניווט מלא באמצעות מקלדת</li>
          <li>אפשרות להגדלת טקסט ושינוי ניגודיות</li>
          <li>טקסטים נגישים לקוראי מסך</li>
          <li>תמיכה בכל סוגי המסכים והמכשירים</li>
          <li>שימוש תקין בכותרות ובמבנה היררכי</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">תקלות נגישות ידועות:</h2>
        <p className="mb-4">
          ייתכן שעדיין קיימים חלקים באתר שאינם מונגשים באופן מלא. אנו פועלים כל העת לשיפור ההנגשה בהתאם למשוב שמתקבל.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">פניות בנושא נגישות:</h2>
        <p className="mb-1">נשמח לסייע ולשמוע מכם!</p>
        <ul className="space-y-1">
          <li><strong>אימייל:</strong> support@bizzcoll.com</li>
          <li><strong>טלפון:</strong> 03-1234567</li>
          <li><strong>טופס יצירת קשר:</strong> <a href="/contact" className="text-blue-600 underline">לעמוד צור קשר</a></li>
        </ul>
  
        <p className="mt-8 text-sm text-gray-500">עודכן לאחרונה: 29 באפריל 2025</p>
      </main>
    )
  }
  