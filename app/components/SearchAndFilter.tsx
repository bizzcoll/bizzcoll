'use client'

import { Filter } from 'lucide-react'

type SearchAndFilterProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  onFilterClick: () => void // ✅ הוספנו תמיכה בפתיחה של פילטר
  color: 'blue' | 'green' | 'purple'
}

export default function SearchAndFilter({
  searchValue,
  onSearchChange,
  onFilterClick,
  color
}: SearchAndFilterProps) {
  const borderColor =
    color === 'blue' ? 'border-blue-300' :
    color === 'green' ? 'border-green-300' :
    'border-purple-300'

  const ringColor =
    color === 'blue' ? 'focus:ring-blue-500' :
    color === 'green' ? 'focus:ring-green-500' :
    'focus:ring-purple-500'

  const filterIconClasses =
    color === 'blue' ? 'border-blue-300 hover:border-blue-500' :
    color === 'green' ? 'border-green-300 hover:border-green-500' :
    'border-purple-300 hover:border-purple-500'

  return (
    <div className="relative w-full md:w-1/3">
      <input
        type="search"
        placeholder="🔍 חפש לפי כותרת או תיאור"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full p-2 pr-4 border ${borderColor} rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 ${ringColor} text-right placeholder:text-right placeholder:text-gray-400 transition-all duration-200`}
        aria-label="Search Deals"
      />
      <button
        onClick={onFilterClick}
        className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full border ${filterIconClasses}`}
        aria-label="Filter"
      >
        <Filter size={16} />
      </button>
    </div>
  )
}
