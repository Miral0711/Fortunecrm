import { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, MoreVertical, Search, ChevronLeft, ChevronRight,
  ChevronDown, Bot, Tag, Calendar, User, Eye, Pencil,
  Trash2, Play, Pause, Copy, X, Layers,
  TrendingUp, Star, MessageSquare, CheckCircle, XCircle,
  LayoutGrid, List, Zap,
} from 'lucide-react'
import StatusBadge from '../components/ui/StatusBadge'
import type { BadgeVariant } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface BotItem {
  id: string; name: string; category: string; trigger: string
  description: string; responses: number; status: BadgeVariant
  statusLabel: string; createdBy: string; createdOn: string
  updatedOn: string; iconName: string; color: string
  active: boolean; featured: boolean; recentlyUsed: boolean
}

type SortKey = 'responses' | 'createdOn' | 'name'
type ViewMode = 'grid' | 'table'

// ─────────────────────────────────────────────────────────────────────────────
// Icon map
// ─────────────────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  home: Bot, finance: TrendingUp, smsf: Layers, referral: User,
  reservation: Tag, nurture: MessageSquare, subscriber: Star,
  search: Search, bdm: Calendar, wealth: TrendingUp,
  duplex: Layers, faq: MessageSquare,
}

function BotIcon({ name, color }: { name: string; color: string }) {
  const Icon = ICON_MAP[name] ?? Bot
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const BOTS: BotItem[] = [
  { id:'1',  name:'Property Enquiry Bot',        category:'Property Enquiry',        trigger:'Website form submit',   description:'Captures inbound property enquiries, qualifies the lead with 5 questions and routes to the assigned BDM automatically.',                     responses:284, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'17 Apr 2026', updatedOn:'17 Apr 2026', iconName:'home',        color:'bg-orange-50 text-orange-600',   active:true,  featured:true,  recentlyUsed:true  },
  { id:'2',  name:'Finance Pre-Assessment',       category:'Finance Assessment',      trigger:'Landing page CTA',      description:'Walks users through a 7-step finance readiness assessment, scores their profile and sends a personalised report via email.',                   responses:197, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'15 Apr 2026', updatedOn:'16 Apr 2026', iconName:'finance',     color:'bg-green-50 text-green-600',     active:true,  featured:true,  recentlyUsed:true  },
  { id:'3',  name:'SMSF Investor Qualifier',      category:'SMSF Qualification',      trigger:'SMSF landing page',     description:'Qualifies SMSF investors by collecting fund balance, trustee type and investment timeline before booking a strategy call.',                     responses:143, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'12 Apr 2026', updatedOn:'14 Apr 2026', iconName:'smsf',        color:'bg-blue-50 text-blue-600',       active:true,  featured:false, recentlyUsed:true  },
  { id:'4',  name:'Referral Partner Welcome',     category:'Referral Capture',        trigger:'Partner signup form',   description:'Sends a personalised welcome sequence to new referral partners, collects ABN and bank details, and schedules onboarding call.',                 responses:89,  status:'success', statusLabel:'Active',   createdBy:'James Thornton', createdOn:'10 Apr 2026', updatedOn:'13 Apr 2026', iconName:'referral',    color:'bg-purple-50 text-purple-600',   active:true,  featured:false, recentlyUsed:false },
  { id:'5',  name:'Reservation Flow Bot',         category:'Property Reservation',    trigger:'Reserve now button',    description:'Guides buyers through the reservation process step by step, collects deposit intent and notifies the sales team in real time.',                 responses:62,  status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'08 Apr 2026', updatedOn:'10 Apr 2026', iconName:'reservation', color:'bg-yellow-50 text-yellow-600',   active:false, featured:false, recentlyUsed:false },
  { id:'6',  name:'30-Day Nurture Sequence',      category:'Lead Nurture Sequence',   trigger:'Cold lead tag applied', description:'Automated 30-day email + SMS nurture flow for cold leads. Sends market updates, case studies and soft CTAs at optimal intervals.',            responses:521, status:'success', statusLabel:'Active',   createdBy:'Priya Sharma',   createdOn:'05 Apr 2026', updatedOn:'09 Apr 2026', iconName:'nurture',     color:'bg-teal-50 text-teal-600',       active:true,  featured:true,  recentlyUsed:true  },
  { id:'7',  name:'New Subscriber Welcome',       category:'Subscriber Onboarding',   trigger:'Subscriber list join',  description:'Onboards new subscribers with a 3-email welcome sequence, captures investment preferences and segments into the correct nurture list.',         responses:318, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'02 Apr 2026', updatedOn:'07 Apr 2026', iconName:'subscriber',  color:'bg-indigo-50 text-indigo-600',   active:true,  featured:false, recentlyUsed:true  },
  { id:'8',  name:'Property Search Matcher',      category:'Property Search Request', trigger:'Search request form',   description:'Collects buyer criteria — budget, location, type, timeline — and matches to available listings, sending results within 60 seconds.',           responses:407, status:'success', statusLabel:'Active',   createdBy:'David Chen',     createdOn:'30 Mar 2026', updatedOn:'05 Apr 2026', iconName:'search',      color:'bg-sky-50 text-sky-600',         active:true,  featured:true,  recentlyUsed:false },
  { id:'9',  name:'BDM Discovery Call Booker',    category:'BDM Appointment Setter',  trigger:'Book a call button',    description:'Checks BDM calendar availability in real time and books discovery calls, sending confirmation emails with Zoom links automatically.',          responses:74,  status:'danger',  statusLabel:'Inactive', createdBy:'Admin',          createdOn:'25 Mar 2026', updatedOn:'28 Mar 2026', iconName:'bdm',         color:'bg-rose-50 text-rose-600',       active:false, featured:false, recentlyUsed:false },
  { id:'10', name:'Wealth Creation Funnel Bot',   category:'Wealth Creation Funnel',  trigger:'Wealth website visit',  description:'Top-of-funnel bot for wealth creation website visitors. Captures name, email and investment goals before routing to a BDM for follow-up.', responses:256, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'20 Mar 2026', updatedOn:'25 Mar 2026', iconName:'wealth',      color:'bg-emerald-50 text-emerald-600', active:true,  featured:false, recentlyUsed:true  },
  { id:'11', name:'Duplex Dual-Income Qualifier', category:'Duplex Investor Flow',    trigger:'Duplex landing page',   description:'Specialised qualification flow for duplex investors. Assesses SMSF eligibility, rental yield expectations and preferred locations.',           responses:112, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'15 Mar 2026', updatedOn:'20 Mar 2026', iconName:'duplex',      color:'bg-amber-50 text-amber-600',     active:true,  featured:false, recentlyUsed:false },
  { id:'12', name:'General FAQ Assistant',        category:'General FAQ Bot',         trigger:'Chat widget open',      description:'Handles common platform questions, redirects to help documentation and escalates unresolved queries to the support team via email.',         responses:893, status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'10 Mar 2026', updatedOn:'12 Mar 2026', iconName:'faq',         color:'bg-gray-50 text-gray-600',       active:false, featured:false, recentlyUsed:false },
]

const ALL_CATEGORIES = Array.from(new Set(BOTS.map(b => b.category)))

// ─────────────────────────────────────────────────────────────────────────────
// Debounce
// ─────────────────────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay = 250): T {
  const [d, setD] = useState(value)
  useEffect(() => { const t = setTimeout(() => setD(value), delay); return () => clearTimeout(t) }, [value, delay])
  return d
}

// ─────────────────────────────────────────────────────────────────────────────
// Row action menu
// ─────────────────────────────────────────────────────────────────────────────

function RowMenu({ active, onToggle, onView }: { active: boolean; onToggle: () => void; onView: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-30 py-1 overflow-hidden">
          {[
            { label: 'View Details', icon: Eye,    danger: false, action: () => { onView(); setOpen(false) } },
            { label: 'Edit',         icon: Pencil, danger: false, action: () => setOpen(false) },
            { label: 'Duplicate',    icon: Copy,   danger: false, action: () => setOpen(false) },
            { label: active ? 'Pause Bot' : 'Activate Bot', icon: active ? Pause : Play, danger: false, action: () => { onToggle(); setOpen(false) } },
            { label: 'Delete',       icon: Trash2, danger: true,  action: () => setOpen(false) },
          ].map(({ label, icon: Icon, danger, action }) => (
            <button key={label} onClick={action}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}>
              <Icon className="w-3.5 h-3.5 shrink-0" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Bot Detail Modal
// ─────────────────────────────────────────────────────────────────────────────

function BotDetailModal({ bot, onClose, onToggle }: { bot: BotItem; onClose: () => void; onToggle: (id: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BotIcon name={bot.iconName} color={bot.color} />
            <div>
              <h3 className="text-sm font-bold text-gray-900">{bot.name}</h3>
              <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{bot.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed">{bot.description}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Status',     value: bot.statusLabel },
              { label: 'Responses',  value: bot.responses.toLocaleString() },
              { label: 'Trigger',    value: bot.trigger },
              { label: 'Created By', value: bot.createdBy },
              { label: 'Created On', value: bot.createdOn },
              { label: 'Updated On', value: bot.updatedOn },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-[10px] text-gray-400 font-medium mb-0.5">{label}</p>
                <p className="text-xs text-gray-700 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{bot.active ? 'Active' : 'Inactive'}</span>
            <button onClick={() => onToggle(bot.id)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}>
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Pencil className="w-3 h-3" /> Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Copy className="w-3 h-3" /> Duplicate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Bot Card — standard
// ─────────────────────────────────────────────────────────────────────────────

function BotCard({ bot, onToggle, onView }: { bot: BotItem; onToggle: (id: string) => void; onView: (bot: BotItem) => void }) {
  return (
    <div
      onClick={() => onView(bot)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 flex flex-col gap-3 cursor-pointer group border border-gray-100/80"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <BotIcon name={bot.iconName} color={bot.color} />
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors leading-tight">{bot.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{bot.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
          <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
          <RowMenu active={bot.active} onToggle={() => onToggle(bot.id)} onView={() => onView(bot)} />
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">{bot.description}</p>

      {/* Trigger */}
      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
        <Zap className="w-3 h-3 shrink-0 text-gray-300" />
        <span className="truncate">{bot.trigger}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-50" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{bot.responses.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{bot.createdOn}</span>
          <span className="flex items-center gap-1 hidden xl:flex"><User className="w-3 h-3" />{bot.createdBy}</span>
        </div>
        <button
          onClick={() => onToggle(bot.id)}
          className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors shrink-0 ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured Card — wider, more prominent
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedCard({ bot, onToggle, onView }: { bot: BotItem; onToggle: (id: string) => void; onView: (bot: BotItem) => void }) {
  return (
    <div
      onClick={() => onView(bot)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-3 cursor-pointer group border border-gray-100/80 min-w-[260px] w-[260px] shrink-0"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bot.color}`}>
            {(() => { const Icon = ICON_MAP[bot.iconName] ?? Bot; return <Icon className="w-5 h-5" /> })()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">{bot.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{bot.category}</p>
          </div>
        </div>
        <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">{bot.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{bot.responses.toLocaleString()}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{bot.createdBy}</span>
        </div>
        <button onClick={() => onToggle(bot.id)}
          className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}>
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, count }: { icon: React.ElementType; title: string; count: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-orange-500" />
      </div>
      <h2 className="text-sm font-bold text-gray-800">{title}</h2>
      <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BotInABoxPage() {
  const navigate = useNavigate()
  const [bots,         setBots]         = useState<BotItem[]>(BOTS)
  const [rawSearch,    setRawSearch]    = useState('')
  const [category,     setCategory]     = useState('All')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy,       setSortBy]       = useState<SortKey>('responses')
  const [view,         setView]         = useState<ViewMode>('grid')
  const [detailBot,    setDetailBot]    = useState<BotItem | null>(null)
  const [page,         setPage]         = useState(1)

  const search   = useDebounce(rawSearch, 250)
  const PER_PAGE = 12

  function toggleBot(id: string) {
    setBots(prev => prev.map(b => b.id === id
      ? { ...b, active: !b.active, statusLabel: !b.active ? 'Active' : 'Inactive', status: (!b.active ? 'success' : 'danger') as BadgeVariant }
      : b))
    if (detailBot?.id === id)
      setDetailBot(prev => prev ? { ...prev, active: !prev.active, statusLabel: !prev.active ? 'Active' : 'Inactive', status: (!prev.active ? 'success' : 'danger') as BadgeVariant } : null)
  }

  function clearFilters() { setRawSearch(''); setCategory('All'); setStatusFilter(''); setSortBy('responses'); setPage(1) }
  const hasFilters = rawSearch !== '' || category !== 'All' || statusFilter !== ''

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: bots.length }
    ALL_CATEGORIES.forEach(c => { map[c] = bots.filter(b => b.category === c).length })
    return map
  }, [bots])

  const filtered = useMemo(() => {
    let list = bots.filter(b => {
      if (search) {
        const q = search.toLowerCase()
        if (!b.name.toLowerCase().includes(q) && !b.description.toLowerCase().includes(q) && !b.category.toLowerCase().includes(q)) return false
      }
      if (category !== 'All' && b.category !== category) return false
      if (statusFilter && b.statusLabel !== statusFilter) return false
      return true
    })
    return [...list].sort((a, b) => {
      if (sortBy === 'responses') return b.responses - a.responses
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [bots, search, category, statusFilter, sortBy])

  const totalPages   = Math.ceil(filtered.length / PER_PAGE)
  const paginated    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const featuredBots = useMemo(() => bots.filter(b => b.featured), [bots])
  const showFeatured = !hasFilters

  const activeCount    = bots.filter(b => b.active).length
  const inactiveCount  = bots.filter(b => !b.active).length
  const totalResponses = bots.reduce((s, b) => s + b.responses, 0)

  return (
    <div className="space-y-5">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bots',       value: String(bots.length),             icon: Bot,          color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Active',           value: String(activeCount),             icon: CheckCircle,  color: 'text-green-500',  bg: 'bg-green-50'  },
          { label: 'Inactive/Pending', value: String(inactiveCount),           icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-50'    },
          { label: 'Total Responses',  value: totalResponses.toLocaleString(), icon: MessageSquare,color: 'text-blue-500',   bg: 'bg-blue-50'   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 border border-gray-100/80">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 leading-tight mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar: search + filters + actions in one bar ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 px-4 py-3 flex items-center gap-3 flex-wrap">
        {/* Search — takes available space */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={rawSearch}
            onChange={e => { setRawSearch(e.target.value); setPage(1) }}
            placeholder="Search bots, categories…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400/25 focus:bg-white focus:border-orange-200 placeholder:text-gray-400 transition-all"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 shrink-0 hidden sm:block" />

        {/* Status filter */}
        <div className="relative shrink-0">
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
            className="appearance-none pl-3 pr-7 py-2 text-xs bg-gray-50 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400/25 text-gray-600 cursor-pointer">
            <option value="">All Statuses</option>
            {['Active', 'Pending', 'Inactive'].map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative shrink-0">
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
            className="appearance-none pl-3 pr-7 py-2 text-xs bg-gray-50 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400/25 text-gray-600 cursor-pointer">
            <option value="responses">Most Used</option>
            <option value="createdOn">Recently Created</option>
            <option value="name">Alphabetical</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-2 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0">
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 shrink-0 hidden sm:block" />

        {/* View toggle */}
        <div className="flex items-center bg-gray-100 rounded-xl p-0.5 shrink-0">
          <button onClick={() => setView('grid')}
            className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setView('table')}
            className={`p-1.5 rounded-lg transition-all ${view === 'table' ? 'bg-white shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add Bot */}
        <button
          onClick={() => navigate('/bot-in-a-box/add')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all shadow-sm shadow-orange-200 hover:shadow-md shrink-0"
        >
          <Plus className="w-3.5 h-3.5" /> Add Bot
        </button>
      </div>

      {/* ── Category pills ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
        {['All', ...ALL_CATEGORIES].map(c => {
          const active = category === c
          const count  = categoryCounts[c] ?? 0
          return (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                active
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-600 shadow-sm'
              }`}
            >
              {c}
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Featured row (horizontal scroll) ── */}
      {showFeatured && view === 'grid' && featuredBots.length > 0 && (
        <div>
          <SectionHeader icon={Star} title="Featured Bots" count={featuredBots.length} />
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-0.5 px-0.5">
            {featuredBots.map(bot => (
              <FeaturedCard key={bot.id} bot={bot} onToggle={toggleBot} onView={setDetailBot} />
            ))}
          </div>
        </div>
      )}

      {/* ── All Bots grid ── */}
      {view === 'grid' && (
        <div>
          <SectionHeader icon={Bot} title={hasFilters ? 'Results' : 'All Bots'} count={filtered.length} />
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Bot className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-600">No bots found</p>
              <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
              <button onClick={clearFilters}
                className="mt-1 px-4 py-1.5 text-xs font-semibold text-orange-600 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map(bot => (
                <BotCard key={bot.id} bot={bot} onToggle={toggleBot} onView={setDetailBot} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Table view ── */}
      {view === 'table' && (
        <div>
          <SectionHeader icon={List} title={hasFilters ? 'Results' : 'All Bots'} count={filtered.length} />
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 gap-3">
              <Bot className="w-10 h-10 text-gray-200" />
              <p className="text-sm font-semibold text-gray-500">No bots found</p>
              <button onClick={clearFilters} className="px-3 py-1.5 text-xs text-orange-600 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Bot', 'Category', 'Trigger', 'Responses', 'Status', 'Active', 'Created By', 'Created On', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-50/60">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map(bot => (
                      <tr key={bot.id} onClick={() => setDetailBot(bot)}
                        className="hover:bg-orange-50/30 transition-colors cursor-pointer">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <BotIcon name={bot.iconName} color={bot.color} />
                            <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">{bot.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">{bot.category}</span>
                        </td>
                        <td className="px-4 py-3 max-w-[160px]">
                          <span className="text-xs text-gray-500 truncate block">{bot.trigger}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-gray-700">{bot.responses.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
                        </td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <button onClick={() => toggleBot(bot.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}>
                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                          </button>
                        </td>
                        <td className="px-4 py-3"><span className="text-xs text-gray-500">{bot.createdBy}</span></td>
                        <td className="px-4 py-3"><span className="text-xs text-gray-500">{bot.createdOn}</span></td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <RowMenu active={bot.active} onToggle={() => toggleBot(bot.id)} onView={() => setDetailBot(bot)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Pagination ── */}
      {filtered.length > PER_PAGE && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3">
          <p className="text-xs text-gray-500">
            Showing <span className="font-bold text-gray-700">{(page - 1) * PER_PAGE + 1}</span>–<span className="font-bold text-gray-700">{Math.min(page * PER_PAGE, filtered.length)}</span> of <span className="font-bold text-gray-700">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${page === p ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Detail modal ── */}
      {detailBot && (
        <BotDetailModal bot={detailBot} onClose={() => setDetailBot(null)} onToggle={toggleBot} />
      )}
    </div>
  )
}
