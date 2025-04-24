import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { roleDisplayMap } from '@/app/dashboard/admin/constants'

export default function RoleTabs({
  roles,
  activeTab,
  setTab
}: {
  roles: string[]
  activeTab: string
  setTab: (role: string) => void
}) {
  return (
    <>
      {/* 🖥️ Desktop */}
      <div className="hidden md:flex justify-end">
        <TabsList className="bg-transparent border-none flex flex-wrap gap-2">
          {roles.map((role) => (
            <TabsTrigger
              key={role}
              value={role}
              onClick={() => setTab(role)}
              className="text-sm px-4 py-1 rounded-full border border-purple-300 bg-white hover:bg-purple-100 transition-all flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              {roleDisplayMap[role]?.icon}
              {roleDisplayMap[role]?.label || role}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* 📱 Mobile */}
      <div className="md:hidden mt-4 mb-6 px-1">
        <TabsList className="bg-transparent border-none flex flex-wrap gap-2">
          {roles.map((role) => (
            <TabsTrigger
              key={role}
              value={role}
              onClick={() => setTab(role)}
              className="text-xs px-3 py-1 rounded-full border border-purple-300 bg-white hover:bg-purple-100 transition-all flex items-center justify-center gap-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              {roleDisplayMap[role]?.icon}
              {roleDisplayMap[role]?.label || role}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </>
  )
}
