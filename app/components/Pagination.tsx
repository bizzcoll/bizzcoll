'use client'

type Props = {
  total: number
  page: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  color?: 'green' | 'purple' | 'blue' // ✅ אפשרויות צבע
}

export default function Pagination({ total, page, onPageChange, itemsPerPage, color = 'green' }: Props) {
  const totalPages = Math.ceil(total / itemsPerPage)
  if (totalPages <= 1) return null

  const colorClasses = {
    green: {
      active: 'bg-green-600 text-white font-bold shadow-md',
      inactive: 'bg-green-100 text-green-700 hover:bg-green-200',
    },
    purple: {
      active: 'bg-purple-600 text-white font-bold shadow-md',
      inactive: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    },
    blue: {
      active: 'bg-blue-600 text-white font-bold shadow-md',
      inactive: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    },
  }

  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 text-sm rounded transition-all ${
            page === i + 1 ? colorClasses[color].active : colorClasses[color].inactive
          }`}
          aria-current={page === i + 1 ? 'page' : undefined}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}
