import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { navigation } from '../../config/navigation'

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/portal/listings/')) return 'Property Detail'
  if (pathname === '/portal/listings') return 'Listings'
  if (pathname === '/portal/saved-searches') return 'Saved Searches'
  if (pathname === '/documents') return 'Documents'
  for (const group of navigation) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label
      if (item.children) {
        const child = item.children.find(c => c.path === pathname)
        if (child) return child.label
      }
    }
  }
  return 'Fusion CRM'
}

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = getPageTitle(location.pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f5f7]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-3 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
