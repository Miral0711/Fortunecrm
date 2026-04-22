// ── Types ─────────────────────────────────────────────────────────────────────

export type ResourceType = 'video' | 'document' | 'form' | 'ebook' | 'presentation'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type UserRole = 'Admin' | 'Agent' | 'Marketing'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  category: string
  subcategory: string
  tags: string[]
  duration?: string   // e.g. "4 min", "12 min"
  durationMin?: number // numeric for filtering
  level: DifficultyLevel
  views: number
  thumbnail?: string  // emoji fallback
  urlFile: string
  isUrl: boolean
  createdAt: string   // ISO date string
  roles: UserRole[]
}

// ── Category Config ───────────────────────────────────────────────────────────

export interface SubCategory {
  id: string
  label: string
}

export interface Category {
  id: string
  label: string
  icon: string
  subcategories: SubCategory[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    label: 'All Resources',
    icon: '📚',
    subcategories: [],
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: '🚀',
    subcategories: [
      { id: 'login-profile', label: 'Login & Profile' },
      { id: 'platform-overview', label: 'Platform Overview' },
    ],
  },
  {
    id: 'sales-leads',
    label: 'Sales & Leads',
    icon: '💰',
    subcategories: [
      { id: 'property-search', label: 'Property Search' },
      { id: 'commissions', label: 'Commissions' },
      { id: 'reservations', label: 'Reservations' },
    ],
  },
  {
    id: 'website-pages',
    label: 'Website & Landing Pages',
    icon: '🌐',
    subcategories: [
      { id: 'wordpress', label: 'WordPress' },
      { id: 'landing-pages', label: 'Landing Pages' },
      { id: 'api-keys', label: 'API Keys' },
    ],
  },
  {
    id: 'client-management',
    label: 'Client Management',
    icon: '👥',
    subcategories: [
      { id: 'adding-clients', label: 'Adding Clients' },
      { id: 'referral-partners', label: 'Referral Partners' },
      { id: 'account-updates', label: 'Account Updates' },
    ],
  },
  {
    id: 'marketing-email',
    label: 'Marketing & Email',
    icon: '📧',
    subcategories: [
      { id: 'email-settings', label: 'Email Settings' },
      { id: 'mail-lists', label: 'Mail Lists' },
      { id: 'brochures', label: 'Brochures' },
    ],
  },
  {
    id: 'admin-settings',
    label: 'Admin & Settings',
    icon: '⚙️',
    subcategories: [
      { id: 'bot-in-a-box', label: 'Bot In A Box' },
      { id: 'forms', label: 'Forms & Templates' },
      { id: 'system-docs', label: 'System Docs' },
    ],
  },
]

// ── Mock Resources ────────────────────────────────────────────────────────────

export const RESOURCES: Resource[] = [
  // Getting Started
  {
    id: '1',
    title: 'How to login to Fusion CRM and update your account profile',
    description: 'A step-by-step walkthrough of logging in, navigating the dashboard, and updating your personal profile settings.',
    type: 'video',
    category: 'getting-started',
    subcategory: 'login-profile',
    tags: ['Login', 'Profile', 'Onboarding'],
    duration: '6 min',
    durationMin: 6,
    level: 'Beginner',
    views: 1240,
    thumbnail: '🔐',
    urlFile: 'Log-in-and-Profile-Update-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-01-10',
    roles: ['Admin', 'Agent', 'Marketing'],
  },
  {
    id: '2',
    title: 'Fusion CRM Platform Overview – 2025',
    description: 'A comprehensive presentation covering all major features of Fusion CRM, designed for new users and onboarding sessions.',
    type: 'presentation',
    category: 'getting-started',
    subcategory: 'platform-overview',
    tags: ['Overview', 'Onboarding', 'Platform'],
    duration: '20 min',
    durationMin: 20,
    level: 'Beginner',
    views: 980,
    thumbnail: '🖥️',
    urlFile: 'Platform-Overview-2025.pptx',
    isUrl: false,
    createdAt: '2025-01-15',
    roles: ['Admin', 'Agent', 'Marketing'],
  },
  // Sales & Leads
  {
    id: '3',
    title: 'How to search for properties and commissions payable',
    description: 'Learn how to use the property search tool, filter results, and view commission structures for each listing.',
    type: 'video',
    category: 'sales-leads',
    subcategory: 'property-search',
    tags: ['Properties', 'Commission', 'Search'],
    duration: '8 min',
    durationMin: 8,
    level: 'Beginner',
    views: 2100,
    thumbnail: '🏠',
    urlFile: 'How-to-Search-for-Properties-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-01',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '4',
    title: 'How to submit a property enquiry, search request and reservation form',
    description: 'Covers the full workflow from property enquiry through to submitting a reservation form on behalf of a client.',
    type: 'video',
    category: 'sales-leads',
    subcategory: 'reservations',
    tags: ['Enquiry', 'Reservation', 'Forms'],
    duration: '10 min',
    durationMin: 10,
    level: 'Intermediate',
    views: 1750,
    thumbnail: '📋',
    urlFile: 'Forms-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-10',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '5',
    title: 'Commission Structure Overview',
    description: 'Detailed breakdown of commission tiers, payment schedules, and how commissions are calculated across different property types.',
    type: 'document',
    category: 'sales-leads',
    subcategory: 'commissions',
    tags: ['Commission', 'Finance', 'Reference'],
    duration: '5 min',
    durationMin: 5,
    level: 'Intermediate',
    views: 890,
    thumbnail: '💵',
    urlFile: 'Commission-Structure.pdf',
    isUrl: false,
    createdAt: '2025-03-01',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '6',
    title: 'Property Reservation Form',
    description: 'Official reservation form template to be completed when a client is ready to proceed with a property purchase.',
    type: 'form',
    category: 'sales-leads',
    subcategory: 'reservations',
    tags: ['Reservation', 'Form', 'Template'],
    duration: '3 min',
    durationMin: 3,
    level: 'Beginner',
    views: 1320,
    thumbnail: '📝',
    urlFile: 'Property-Reservation-Form.pdf',
    isUrl: false,
    createdAt: '2025-03-05',
    roles: ['Agent', 'Admin'],
  },
  // Website & Landing Pages
  {
    id: '7',
    title: 'How to create a WordPress website',
    description: 'Full tutorial on setting up your branded real estate WordPress website through the Fusion CRM portal.',
    type: 'video',
    category: 'website-pages',
    subcategory: 'wordpress',
    tags: ['WordPress', 'Website', 'Branding'],
    duration: '14 min',
    durationMin: 14,
    level: 'Intermediate',
    views: 1560,
    thumbnail: '🌐',
    urlFile: 'Wordpress-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-20',
    roles: ['Agent', 'Marketing', 'Admin'],
  },
  {
    id: '8',
    title: 'How to modify your Real Estate and Wealth Creation Website',
    description: 'Step-by-step guide to customising your website content, images, and layout after initial setup.',
    type: 'video',
    category: 'website-pages',
    subcategory: 'wordpress',
    tags: ['WordPress', 'Customisation', 'Website'],
    duration: '11 min',
    durationMin: 11,
    level: 'Intermediate',
    views: 1100,
    thumbnail: '✏️',
    urlFile: 'Modify-Websites-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-03-10',
    roles: ['Agent', 'Marketing'],
  },
  {
    id: '9',
    title: 'How to create a landing page',
    description: 'Learn how to build high-converting landing pages for property campaigns using the built-in landing page builder.',
    type: 'video',
    category: 'website-pages',
    subcategory: 'landing-pages',
    tags: ['Landing Page', 'Marketing', 'Campaigns'],
    duration: '9 min',
    durationMin: 9,
    level: 'Intermediate',
    views: 1380,
    thumbnail: '🎯',
    urlFile: 'How-to-Create-Landing-Pages.mp4',
    isUrl: false,
    createdAt: '2025-03-15',
    roles: ['Marketing', 'Agent'],
  },
  // Client Management
  {
    id: '10',
    title: 'How to add a client (manual or bulk upload)',
    description: 'Two methods for adding clients: manual entry for individual clients and CSV bulk upload for importing large lists.',
    type: 'video',
    category: 'client-management',
    subcategory: 'adding-clients',
    tags: ['Clients', 'Bulk Upload', 'CRM'],
    duration: '7 min',
    durationMin: 7,
    level: 'Beginner',
    views: 2340,
    thumbnail: '👤',
    urlFile: 'Clients-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-01-25',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '11',
    title: 'How to add a referral partner account',
    description: 'Walkthrough of creating and configuring a referral partner account, including setting commission rates and access levels.',
    type: 'video',
    category: 'client-management',
    subcategory: 'referral-partners',
    tags: ['Referral Partner', 'Accounts', 'Setup'],
    duration: '8 min',
    durationMin: 8,
    level: 'Beginner',
    views: 1890,
    thumbnail: '🤝',
    urlFile: 'Referral-Partner-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-05',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '12',
    title: 'How to update a client and referral partner accounts',
    description: 'Managing existing accounts: updating contact details, changing status, reassigning agents, and editing commission settings.',
    type: 'video',
    category: 'client-management',
    subcategory: 'account-updates',
    tags: ['Clients', 'Referral Partner', 'Updates'],
    duration: '6 min',
    durationMin: 6,
    level: 'Beginner',
    views: 1450,
    thumbnail: '🔄',
    urlFile: 'Updating-Referral-Partner-Info-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-12',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '13',
    title: 'Client Onboarding Checklist',
    description: 'A comprehensive checklist to ensure every new client is properly onboarded with all required documentation and setup steps completed.',
    type: 'document',
    category: 'client-management',
    subcategory: 'adding-clients',
    tags: ['Onboarding', 'Checklist', 'Clients'],
    duration: '4 min',
    durationMin: 4,
    level: 'Beginner',
    views: 760,
    thumbnail: '✅',
    urlFile: 'Client-Onboarding-Checklist.pdf',
    isUrl: false,
    createdAt: '2025-03-20',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '14',
    title: 'Referral Partner Agreement Template',
    description: 'Standard agreement template for formalising referral partner relationships, including commission terms and obligations.',
    type: 'document',
    category: 'client-management',
    subcategory: 'referral-partners',
    tags: ['Agreement', 'Legal', 'Referral Partner'],
    duration: '5 min',
    durationMin: 5,
    level: 'Intermediate',
    views: 540,
    thumbnail: '📄',
    urlFile: 'Referral-Partner-Agreement.docx',
    isUrl: false,
    createdAt: '2025-04-01',
    roles: ['Admin'],
  },
  // Marketing & Email
  {
    id: '15',
    title: 'How to setup your email settings and mail list creation',
    description: 'Configure your email sender settings, create segmented mail lists, and set up automated email sequences for your campaigns.',
    type: 'video',
    category: 'marketing-email',
    subcategory: 'email-settings',
    tags: ['Email', 'Mail List', 'Automation'],
    duration: '12 min',
    durationMin: 12,
    level: 'Intermediate',
    views: 1670,
    thumbnail: '📧',
    urlFile: 'Mail-list-and-Email-Settings-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-02-28',
    roles: ['Marketing', 'Admin'],
  },
  {
    id: '16',
    title: 'How to create a property brochure with your own branding',
    description: 'Design and export professional property brochures using the built-in brochure builder with your custom branding and logo.',
    type: 'video',
    category: 'marketing-email',
    subcategory: 'brochures',
    tags: ['Brochures', 'Branding', 'Marketing'],
    duration: '9 min',
    durationMin: 9,
    level: 'Beginner',
    views: 1230,
    thumbnail: '🎨',
    urlFile: 'Brochures-PIAB.mp4',
    isUrl: false,
    createdAt: '2025-03-08',
    roles: ['Marketing', 'Agent'],
  },
  // Admin & Settings
  {
    id: '17',
    title: 'Bot In A Box',
    description: 'Complete guide to setting up and configuring the Bot In A Box AI assistant for automated client interactions and lead qualification.',
    type: 'video',
    category: 'admin-settings',
    subcategory: 'bot-in-a-box',
    tags: ['Bot', 'AI', 'Automation'],
    duration: '16 min',
    durationMin: 16,
    level: 'Advanced',
    views: 2050,
    thumbnail: '🤖',
    urlFile: 'BotInABox_2.mp4',
    isUrl: false,
    createdAt: '2025-04-05',
    roles: ['Admin'],
  },
  {
    id: '18',
    title: 'Training Module 6 – Systems & Processes',
    description: 'Advanced training covering system administration, process automation, and best practices for managing the Fusion CRM at scale.',
    type: 'video',
    category: 'admin-settings',
    subcategory: 'system-docs',
    tags: ['Systems', 'Processes', 'Advanced'],
    duration: '22 min',
    durationMin: 22,
    level: 'Advanced',
    views: 890,
    thumbnail: '⚙️',
    urlFile: 'https://youtu.be/90spU-LJt8M',
    isUrl: true,
    createdAt: '2025-04-10',
    roles: ['Admin'],
  },
  {
    id: '19',
    title: 'Property Enquiry Form Template',
    description: 'Standard form template for capturing property enquiry details from prospective clients at open homes or via online channels.',
    type: 'form',
    category: 'admin-settings',
    subcategory: 'forms',
    tags: ['Enquiry', 'Form', 'Template'],
    duration: '3 min',
    durationMin: 3,
    level: 'Beginner',
    views: 1100,
    thumbnail: '📋',
    urlFile: 'Property-Enquiry-Form.pdf',
    isUrl: false,
    createdAt: '2025-03-25',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '20',
    title: 'Finance Assessment Form',
    description: 'Comprehensive finance assessment form to evaluate client borrowing capacity and financial readiness for property investment.',
    type: 'form',
    category: 'admin-settings',
    subcategory: 'forms',
    tags: ['Finance', 'Assessment', 'Form'],
    duration: '4 min',
    durationMin: 4,
    level: 'Intermediate',
    views: 670,
    thumbnail: '💳',
    urlFile: 'Finance-Assessment-Form.pdf',
    isUrl: false,
    createdAt: '2025-04-02',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '21',
    title: 'Privacy Policy & Terms of Service',
    description: 'Official privacy policy and terms of service documentation for Fusion CRM users and their clients.',
    type: 'document',
    category: 'admin-settings',
    subcategory: 'system-docs',
    tags: ['Legal', 'Privacy', 'Compliance'],
    duration: '8 min',
    durationMin: 8,
    level: 'Intermediate',
    views: 430,
    thumbnail: '🔒',
    urlFile: 'Privacy-Policy.pdf',
    isUrl: false,
    createdAt: '2025-01-05',
    roles: ['Admin'],
  },
  // Property Info Sessions (YouTube)
  {
    id: '22',
    title: 'Property Info Session – Gallery Group & PI Store',
    description: 'Live property information session featuring Gallery Group and Property Investment Store, covering current listings and investment opportunities.',
    type: 'video',
    category: 'sales-leads',
    subcategory: 'property-search',
    tags: ['Property Info', 'Gallery Group', 'Live Session'],
    duration: '45 min',
    durationMin: 45,
    level: 'Intermediate',
    views: 3200,
    thumbnail: '🏢',
    urlFile: 'https://www.youtube.com/watch?v=9aR4FLbrwEU',
    isUrl: true,
    createdAt: '2024-07-17',
    roles: ['Agent', 'Admin', 'Marketing'],
  },
  {
    id: '23',
    title: 'Property Info Session – Tony Vallone & Hartik Shah',
    description: 'February 2025 property information session with industry experts Tony Vallone and Hartik Shah discussing market trends.',
    type: 'video',
    category: 'sales-leads',
    subcategory: 'property-search',
    tags: ['Property Info', 'Market Trends', 'Live Session'],
    duration: '52 min',
    durationMin: 52,
    level: 'Advanced',
    views: 2780,
    thumbnail: '📊',
    urlFile: 'https://www.youtube.com/watch?v=2vJqp6EkRrm',
    isUrl: true,
    createdAt: '2025-02-01',
    roles: ['Agent', 'Admin', 'Marketing'],
  },
  // Ebooks
  {
    id: '24',
    title: 'Real Estate Investment Guide 2025',
    description: 'Comprehensive guide covering property investment strategies, market analysis, and wealth creation through real estate in 2025.',
    type: 'ebook',
    category: 'sales-leads',
    subcategory: 'property-search',
    tags: ['Investment', 'Guide', 'Strategy'],
    duration: '30 min',
    durationMin: 30,
    level: 'Intermediate',
    views: 1560,
    thumbnail: '📖',
    urlFile: 'RE-Investment-Guide-2025.pdf',
    isUrl: false,
    createdAt: '2025-01-20',
    roles: ['Agent', 'Admin', 'Marketing'],
  },
  {
    id: '25',
    title: 'SMSF Property Investment Explained',
    description: 'Everything you need to know about using a Self-Managed Super Fund to invest in property, including compliance and tax considerations.',
    type: 'ebook',
    category: 'sales-leads',
    subcategory: 'commissions',
    tags: ['SMSF', 'Investment', 'Finance'],
    duration: '25 min',
    durationMin: 25,
    level: 'Advanced',
    views: 980,
    thumbnail: '🏦',
    urlFile: 'SMSF-Property-Guide.pdf',
    isUrl: false,
    createdAt: '2025-02-15',
    roles: ['Agent', 'Admin'],
  },
  {
    id: '26',
    title: 'BDM Onboarding Presentation',
    description: 'Comprehensive onboarding deck for new Business Development Managers covering role expectations, tools, and processes.',
    type: 'presentation',
    category: 'getting-started',
    subcategory: 'platform-overview',
    tags: ['BDM', 'Onboarding', 'Training'],
    duration: '18 min',
    durationMin: 18,
    level: 'Beginner',
    views: 720,
    thumbnail: '👔',
    urlFile: 'BDM-Onboarding.pptx',
    isUrl: false,
    createdAt: '2025-03-01',
    roles: ['Admin'],
  },
]

// ── Recommended logic (mock) ──────────────────────────────────────────────────

export function getRecommended(role: UserRole, recentIds: string[]): Resource[] {
  const roleResources = RESOURCES.filter(r => r.roles.includes(role))
  const recent = roleResources.filter(r => recentIds.includes(r.id))
  const others = roleResources.filter(r => !recentIds.includes(r.id))
  return [...recent, ...others].slice(0, 6)
}

// ── YouTube helpers ───────────────────────────────────────────────────────────

/** Returns true if the URL is a YouTube watch/short/youtu.be link */
export function isYouTubeUrl(url: string): boolean {
  return /youtube\.com\/watch|youtu\.be\/|youtube\.com\/shorts/.test(url)
}

/** Extracts the video ID and returns an embed URL, or null if it can't parse */
export function getYouTubeEmbedUrl(url: string): string | null {
  // youtu.be/<id>
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

  // youtube.com/watch?v=<id>
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`

  // youtube.com/shorts/<id>
  const shortsMatch = url.match(/shorts\/([^?&]+)/)
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`

  return null
}
