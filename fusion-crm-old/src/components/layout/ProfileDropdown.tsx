import { useEffect, useRef, useState } from 'react'
import {
  User,
  Pencil,
  Settings,
  UserCheck,
  Briefcase,
  Users,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react'

interface MenuItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  dividerBefore?: boolean
}

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems: MenuItem[] = [
    { icon: <User className="w-4 h-4" />, label: 'Show Profile' },
    { icon: <Pencil className="w-4 h-4" />, label: 'Edit Profile' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
    { icon: <UserCheck className="w-4 h-4" />, label: 'Switch as Subscriber', dividerBefore: true },
    { icon: <Briefcase className="w-4 h-4" />, label: 'Switch as Sales Agent' },
    { icon: <Users className="w-4 h-4" />, label: 'Switch as Affiliate' },
    { icon: <ShieldCheck className="w-4 h-4" />, label: 'Switch as PIAB Admin' },
    { icon: <LogOut className="w-4 h-4" />, label: 'Logout', dividerBefore: true },
  ]

  return (
    <div ref={ref} className="relative ml-2 pl-3 border-l border-gray-100">
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 cursor-pointer group rounded-lg px-1.5 py-1 hover:bg-gray-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          A
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-gray-700 leading-none">Admin User</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
        </div>
        <ChevronDown
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`
          absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100
          origin-top-right transition-all duration-200 z-50
          ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}
        `}
        role="menu"
      >
        {/* Profile header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-none">Admin User</p>
              <p className="text-xs text-gray-400 mt-0.5">admin@fortunecrm.com</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="py-1.5">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.dividerBefore && (
                <div className="my-1.5 border-t border-gray-100" />
              )}
              <button
                role="menuitem"
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left
                  ${item.label === 'Logout'
                    ? 'text-red-500 hover:bg-red-50 hover:text-red-600'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'}
                `}
              >
                <span className={item.label === 'Logout' ? 'text-red-400' : 'text-gray-400 group-hover:text-orange-500'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
