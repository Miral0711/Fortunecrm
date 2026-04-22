import type { LucideIcon } from 'lucide-react'

export interface NavChild {
  label: string
  path: string
}

export interface NavItem {
  label: string
  path?: string
  icon: LucideIcon
  children?: NavChild[]
}

export interface NavGroup {
  group?: string
  items: NavItem[]
}

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'orange'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  className?: string
}

export interface StatCardConfig {
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down'
  icon?: LucideIcon
  iconColor?: string
  iconBg?: string
}

export interface PageConfig {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; path?: string }[]
}

export type ResourceType = 'video' | 'document' | 'form' | 'ebook' | 'presentation'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type UserRole = 'Admin' | 'Agent' | 'Marketing'
