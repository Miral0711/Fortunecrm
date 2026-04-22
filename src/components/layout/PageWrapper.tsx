import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * Standardized layout wrapper for all application pages.
 * Ensures consistent vertical spacing (space-y-4) and alignment.
 * Global padding and centering are handled by AppShell.
 */
export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  )
}
