import { Bell, Search, Settings, ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

interface Props {
  title: string
}

export default function Topbar({ title }: Props) {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {showSearch ? (
          <input
            autoFocus
            onBlur={() => setShowSearch(false)}
            placeholder="Search anything..."
            className="w-56 px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
          />
        ) : (
          <h1 className="text-base font-semibold text-gray-800">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowSearch(s => !s)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Help">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Settings">
          <Settings className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-100 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-700 leading-none">Admin User</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </header>
  )
}
