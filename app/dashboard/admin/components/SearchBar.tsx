export default function SearchBar({
    value,
    onChange
  }: {
    value: string
    onChange: (val: string) => void
  }) {
    return (
      <input
        type="search"
        placeholder="🔍 חפש לפי שם או אימייל"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-1/3 p-2 pr-4 border border-purple-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-right placeholder:text-right placeholder:text-gray-400 transition-all duration-200"
        aria-label="Search Users"
      />
    )
  }
  