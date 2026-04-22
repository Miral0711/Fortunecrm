import {
  LayoutDashboard, Users,
  Megaphone, Globe, Building,
  TrendingUp, BarChart2,
  FormInput,
  Package, Send, Clock, Bot, Tv2, Settings2, ExternalLink, FolderOpen, Share2,
} from 'lucide-react'
import type { NavGroup } from '../types'

export const navigation: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Agent Portal',
    items: [
      {
        label: 'Agent Portal', icon: ExternalLink,
        children: [
          { label: 'Listings', path: '/portal/listings' },
          { label: 'Saved Searches', path: '/portal/saved-searches' },
        ],
      },
    ],
  },
  {
    group: 'Accounts',
    items: [
      {
        label: 'Accounts', icon: Users,
        children: [
          { label: 'Clients', path: '/accounts/clients' },
          { label: 'Affiliates', path: '/accounts/affiliates' },
          { label: 'Subscribers', path: '/accounts/subscribers' },
          { label: 'BDMs', path: '/accounts/bdms' },
          { label: 'Sales Agents', path: '/accounts/sales-agents' },
          { label: 'Referral Partners', path: '/accounts/referral-partners' },
          { label: 'Developers', path: '/accounts/developers' },
          { label: 'PIAB Admins', path: '/accounts/piab-admins' },
          { label: 'Property Managers', path: '/accounts/property-managers' },
        ],
      },
    ],
  },
  {
    group: 'Marketing',
    items: [
      {
        label: 'Marketing Tools', icon: Megaphone,
        children: [
          { label: 'Website', path: '/marketing/website' },
          { label: 'Landing Page', path: '/marketing/landing-page' },
          { label: 'Brochures', path: '/marketing/brochures' },
        ],
      },
    ],
  },
  {
    group: 'Property',
    items: [
      {
        label: 'Property Portal', icon: Building,
        children: [
          { label: 'Projects', path: '/property/projects' },
          { label: 'Lots', path: '/property/lots' },
          { label: 'Package Builder', path: '/property/package-builder' },
          { label: 'Construction Library', path: '/property/construction-library' },
          { label: 'Favourites', path: '/property/favourites' },
          { label: 'Featured', path: '/property/featured' },
          { label: 'Potential Properties', path: '/property/potential-properties' },
        ],
      },
      { label: 'Sales', path: '/sales', icon: TrendingUp },
    ],
  },
  {
    group: 'Analytics',
    items: [
      {
        label: 'Reports', icon: BarChart2,
        children: [
          { label: 'Network Activity', path: '/reports/network-activity' },
          { label: 'Notes History', path: '/reports/notes-history' },
          { label: 'Log In History', path: '/reports/login-history' },
          { label: 'Same Device Detection', path: '/reports/same-device' },
          { label: 'Reservations', path: '/reports/reservations' },
          { label: 'Tasks', path: '/reports/tasks' },
          { label: 'SPR History', path: '/reports/spr-history' },
        ],
      },
    ],
  },
  {
    group: 'Web',
    items: [
      {
        label: 'Website', icon: Globe,
        children: [
          { label: 'WordPress Website', path: '/website/wordpress' },
          { label: 'Landing Page', path: '/website/landing-page' },
          { label: 'Approved API Keys', path: '/website/api-keys' },
        ],
      },
      {
        label: 'Online Forms', icon: FormInput,
        children: [
          { label: 'Property Enquiry', path: '/forms/property-enquiry' },
          { label: 'Property Search Request', path: '/forms/property-search' },
          { label: 'Property Reservation', path: '/forms/property-reservation' },
          { label: 'Finance Assessment', path: '/forms/finance-assessment' },
        ],
      },
    ],
  },
  {
    group: 'Tools',
    items: [
      { label: 'Documents', path: '/documents', icon: FolderOpen },
      { label: 'Distribution', path: '/distribution', icon: Share2 },
      { label: 'Resources', path: '/resources', icon: Package },
      { label: 'Mail List', path: '/mail-list', icon: Send },
      { label: 'Mail Status', path: '/mail-status', icon: Clock },
      { label: 'Bot In A Box', path: '/bot-in-a-box', icon: Bot },
      { label: 'Ad Management', path: '/ad-management', icon: Tv2 },
      { label: 'Other Services', path: '/other-services', icon: Settings2 },
    ],
  },
]
