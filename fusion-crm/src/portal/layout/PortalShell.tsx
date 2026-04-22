import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Bell, Search, ChevronDown, Home, Bookmark, User, LogOut, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import logoFull from '../../../logo.png'

const navLinks = [
  { label: 'Listings', path: '/portal/listings', icon: Home },
  { label: 'Saved Searches', path: '/portal/saved-searches', icon: Bookmark },
]

export default function PortalShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col">
      {/* Topbar */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <img src={logoFull} alt="Fusion CRM" className="h-7 object-contain" />
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors hidden md:flex">
            <Search className="w-4 h-4" />
          </button>
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          </button>
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(o => !o)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-semibold text-orange-600">
                JD
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">John D.</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  <User className="w-4 h-4" /> My Profile
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2 flex flex-col gap-1">
          {navLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx(
                'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium',
                isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
