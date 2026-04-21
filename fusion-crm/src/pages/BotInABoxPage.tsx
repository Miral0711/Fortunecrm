import { useState, useMemo, useEffect, useRef } from 'react'
import {
  Plus, MoreVertical, Search, ChevronLeft, ChevronRight,
  ChevronDown, Bot, Tag, Calendar, User, Eye, Pencil,
  Trash2, Play, Pause, Copy, X, Layers,
  TrendingUp, Star, Clock, Filter, LayoutGrid, List,
  MessageSquare, CheckCircle, AlertCircle, XCircle,
  ChevronLeft as BackIcon, Upload, PlusCircle, Trash,
} from 'lucide-react'
import StatusBadge from '../components/ui/StatusBadge'
import type { BadgeVariant } from '../types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface BotItem {
  id: string
  name: string
  category: string
  trigger: string
  description: string
  responses: number
  status: BadgeVariant
  statusLabel: string
  createdBy: string
  createdOn: string
  updatedOn: string
  iconName: string
  color: string
  active: boolean
  featured: boolean
  recentlyUsed: boolean
}

type SortKey = 'responses' | 'createdOn' | 'name'
type ViewMode = 'grid' | 'table'

// ── Icon map (no emojis) ──────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  home: Bot, finance: TrendingUp, smsf: Layers, referral: User,
  reservation: Tag, nurture: MessageSquare, subscriber: Star,
  search: Search, bdm: Calendar, wealth: TrendingUp,
  duplex: Layers, faq: MessageSquare,
}

function BotIcon({ name, color }: { name: string; color: string }) {
  const Icon = ICON_MAP[name] ?? Bot
  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BOTS: BotItem[] = [
  { id:'1',  name:'Property Enquiry Bot',        category:'Property Enquiry',        trigger:'Website form submit',   description:'Captures inbound property enquiries, qualifies the lead with 5 questions and routes to the assigned BDM automatically.',                       responses:284, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'17 Apr 2026', updatedOn:'17 Apr 2026', iconName:'home',        color:'bg-orange-50 text-orange-600',   active:true,  featured:true,  recentlyUsed:true  },
  { id:'2',  name:'Finance Pre-Assessment',       category:'Finance Assessment',      trigger:'Landing page CTA',      description:'Walks users through a 7-step finance readiness assessment, scores their profile and sends a personalised report via email.',                     responses:197, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'15 Apr 2026', updatedOn:'16 Apr 2026', iconName:'finance',     color:'bg-green-50 text-green-600',     active:true,  featured:true,  recentlyUsed:true  },
  { id:'3',  name:'SMSF Investor Qualifier',      category:'SMSF Qualification',      trigger:'SMSF landing page',     description:'Qualifies SMSF investors by collecting fund balance, trustee type and investment timeline before booking a strategy call.',                       responses:143, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'12 Apr 2026', updatedOn:'14 Apr 2026', iconName:'smsf',        color:'bg-blue-50 text-blue-600',       active:true,  featured:false, recentlyUsed:true  },
  { id:'4',  name:'Referral Partner Welcome',     category:'Referral Capture',        trigger:'Partner signup form',   description:'Sends a personalised welcome sequence to new referral partners, collects ABN and bank details, and schedules onboarding call.',                   responses:89,  status:'success', statusLabel:'Active',   createdBy:'James Thornton', createdOn:'10 Apr 2026', updatedOn:'13 Apr 2026', iconName:'referral',    color:'bg-purple-50 text-purple-600',   active:true,  featured:false, recentlyUsed:false },
  { id:'5',  name:'Reservation Flow Bot',         category:'Property Reservation',    trigger:'Reserve now button',    description:'Guides buyers through the reservation process step by step, collects deposit intent and notifies the sales team in real time.',                   responses:62,  status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'08 Apr 2026', updatedOn:'10 Apr 2026', iconName:'reservation', color:'bg-yellow-50 text-yellow-600',   active:false, featured:false, recentlyUsed:false },
  { id:'6',  name:'30-Day Nurture Sequence',      category:'Lead Nurture Sequence',   trigger:'Cold lead tag applied', description:'Automated 30-day email + SMS nurture flow for cold leads. Sends market updates, case studies and soft CTAs at optimal intervals.',              responses:521, status:'success', statusLabel:'Active',   createdBy:'Priya Sharma',   createdOn:'05 Apr 2026', updatedOn:'09 Apr 2026', iconName:'nurture',     color:'bg-teal-50 text-teal-600',       active:true,  featured:true,  recentlyUsed:true  },
  { id:'7',  name:'New Subscriber Welcome',       category:'Subscriber Onboarding',   trigger:'Subscriber list join',  description:'Onboards new subscribers with a 3-email welcome sequence, captures investment preferences and segments into the correct nurture list.',           responses:318, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'02 Apr 2026', updatedOn:'07 Apr 2026', iconName:'subscriber',  color:'bg-indigo-50 text-indigo-600',   active:true,  featured:false, recentlyUsed:true  },
  { id:'8',  name:'Property Search Matcher',      category:'Property Search Request', trigger:'Search request form',   description:'Collects buyer criteria — budget, location, type, timeline — and matches to available listings, sending results within 60 seconds.',             responses:407, status:'success', statusLabel:'Active',   createdBy:'David Chen',     createdOn:'30 Mar 2026', updatedOn:'05 Apr 2026', iconName:'search',      color:'bg-sky-50 text-sky-600',         active:true,  featured:true,  recentlyUsed:false },
  { id:'9',  name:'BDM Discovery Call Booker',    category:'BDM Appointment Setter',  trigger:'Book a call button',    description:'Checks BDM calendar availability in real time and books discovery calls, sending confirmation emails with Zoom links automatically.',            responses:74,  status:'danger',  statusLabel:'Inactive', createdBy:'Admin',          createdOn:'25 Mar 2026', updatedOn:'28 Mar 2026', iconName:'bdm',         color:'bg-rose-50 text-rose-600',       active:false, featured:false, recentlyUsed:false },
  { id:'10', name:'Wealth Creation Funnel Bot',   category:'Wealth Creation Funnel',  trigger:'Wealth website visit',  description:'Top-of-funnel bot for wealth creation website visitors. Captures name, email and investment goals before routing to a BDM for follow-up.',   responses:256, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'20 Mar 2026', updatedOn:'25 Mar 2026', iconName:'wealth',      color:'bg-emerald-50 text-emerald-600', active:true,  featured:false, recentlyUsed:true  },
  { id:'11', name:'Duplex Dual-Income Qualifier', category:'Duplex Investor Flow',    trigger:'Duplex landing page',   description:'Specialised qualification flow for duplex investors. Assesses SMSF eligibility, rental yield expectations and preferred locations.',             responses:112, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'15 Mar 2026', updatedOn:'20 Mar 2026', iconName:'duplex',      color:'bg-amber-50 text-amber-600',     active:true,  featured:false, recentlyUsed:false },
  { id:'12', name:'General FAQ Assistant',        category:'General FAQ Bot',         trigger:'Chat widget open',      description:'Handles common platform questions, redirects to help documentation and escalates unresolved queries to the support team via email.',           responses:893, status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'10 Mar 2026', updatedOn:'12 Mar 2026', iconName:'faq',         color:'bg-gray-50 text-gray-600',       active:false, featured:false, recentlyUsed:false },
]

const ALL_CATEGORIES = Array.from(new Set(BOTS.map(b => b.category)))

// ── Debounce hook ─────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ── Row action menu ───────────────────────────────────────────────────────────

function RowMenu({ active, onToggle, onView }: { active: boolean; onToggle: () => void; onView: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1">
          {[
            { label: 'View Details',  icon: Eye,    danger: false, action: () => { onView(); setOpen(false) } },
            { label: 'Edit',          icon: Pencil, danger: false, action: () => setOpen(false) },
            { label: 'Duplicate',     icon: Copy,   danger: false, action: () => setOpen(false) },
            { label: active ? 'Pause Bot' : 'Activate Bot', icon: active ? Pause : Play, danger: false, action: () => { onToggle(); setOpen(false) } },
            { label: 'Delete',        icon: Trash2, danger: true,  action: () => setOpen(false) },
          ].map(({ label, icon: Icon, danger, action }) => (
            <button key={label} onClick={action}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Bot detail modal ──────────────────────────────────────────────────────────

function BotDetailModal({ bot, onClose, onToggle }: { bot: BotItem; onClose: () => void; onToggle: (id: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BotIcon name={bot.iconName} color={bot.color} />
            <div>
              <h3 className="text-sm font-bold text-gray-800">{bot.name}</h3>
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{bot.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed">{bot.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Status',     value: bot.statusLabel },
              { label: 'Responses',  value: bot.responses.toLocaleString() },
              { label: 'Trigger',    value: bot.trigger },
              { label: 'Created By', value: bot.createdBy },
              { label: 'Created On', value: bot.createdOn },
              { label: 'Updated On', value: bot.updatedOn },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-[10px] text-gray-400 font-medium mb-0.5">{label}</p>
                <p className="text-xs text-gray-700 font-medium">{value}</p>
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

// ── Bot card ──────────────────────────────────────────────────────────────────

function BotCard({ bot, onToggle, onView }: { bot: BotItem; onToggle: (id: string) => void; onView: (bot: BotItem) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3 cursor-pointer group"
      onClick={() => onView(bot)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <BotIcon name={bot.iconName} color={bot.color} />
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">{bot.name}</p>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{bot.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
          <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
          <RowMenu active={bot.active} onToggle={() => onToggle(bot.id)} onView={() => onView(bot)} />
        </div>
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{bot.description}</p>

      <div className="text-[10px] text-gray-400 bg-gray-50 rounded-lg px-2.5 py-1.5">
        <span className="font-medium text-gray-500">Trigger:</span> {bot.trigger}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{bot.responses} responses</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{bot.createdOn}</span>
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

// ── Smart section strip ───────────────────────────────────────────────────────

function SmartSection({ title, icon: Icon, bots, onToggle, onView }: {
  title: string; icon: React.ElementType; bots: BotItem[];
  onToggle: (id: string) => void; onView: (bot: BotItem) => void
}) {
  if (bots.length === 0) return null
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-orange-500" />
        <h3 className="text-xs font-semibold text-gray-700">{title}</h3>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{bots.length}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {bots.map(bot => <BotCard key={bot.id} bot={bot} onToggle={onToggle} onView={onView} />)}
      </div>
    </div>
  )
}

// ── Category chip ─────────────────────────────────────────────────────────────

function CategoryChip({ label, active, count, onClick }: { label: string; active: boolean; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors border ${
        active ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
      }`}>
      {label}
      <span className={`text-[10px] px-1 rounded-full ${active ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
    </button>
  )
}

// ── Status icon helper ────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: BadgeVariant }) {
  if (status === 'success') return <CheckCircle className="w-3.5 h-3.5 text-green-500" />
  if (status === 'warning') return <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
  return <XCircle className="w-3.5 h-3.5 text-red-400" />
}

// ── Visibility options ────────────────────────────────────────────────────────

const VISIBILITY_OPTIONS = [
  'All Visibility', 'Affiliates', 'Subscribers', 'BDM',
  'Sales Agents', 'Referral Partners',
]

// ── Example prompt row ────────────────────────────────────────────────────────

interface ExamplePrompt { id: string; value: string }

function ExamplePromptRow({ prompt, onChange, onRemove }: {
  prompt: ExamplePrompt
  onChange: (id: string, val: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={prompt.value}
        onChange={e => onChange(prompt.id, e.target.value)}
        placeholder="Enter example prompt…"
        className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white"
      />
      <button onClick={() => onRemove(prompt.id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
        <Trash className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ── Create Bot form ───────────────────────────────────────────────────────────

function CreateBotForm({ onBack }: { onBack: () => void }) {
  const [category,       setCategory]       = useState('')
  const [thumbTitle,     setThumbTitle]     = useState('')
  const [overview,       setOverview]       = useState('')
  const [thumbDesc,      setThumbDesc]      = useState('')
  const [visibility,     setVisibility]     = useState<string[]>([])
  const [privacy,        setPrivacy]        = useState<'public' | 'private'>('public')
  const [iconFile,       setIconFile]       = useState<File | null>(null)
  const [prompts,        setPrompts]        = useState<ExamplePrompt[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  function toggleVisibility(opt: string) {
    if (opt === 'All Visibility') {
      setVisibility(v => v.includes('All Visibility') ? [] : ['All Visibility'])
      return
    }
    setVisibility(v => {
      const next = v.filter(x => x !== 'All Visibility')
      return next.includes(opt) ? next.filter(x => x !== opt) : [...next, opt]
    })
  }

  function addPrompt() {
    setPrompts(p => [...p, { id: Date.now().toString(), value: '' }])
  }

  function updatePrompt(id: string, val: string) {
    setPrompts(p => p.map(x => x.id === id ? { ...x, value: val } : x))
  }

  function removePrompt(id: string) {
    setPrompts(p => p.filter(x => x.id !== id))
  }

  const leftCol  = VISIBILITY_OPTIONS.slice(0, 3)
  const rightCol = VISIBILITY_OPTIONS.slice(3)

  return (
    <div className="space-y-5">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800">Bot In A Box – Create</h2>
        <button onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-orange-300 text-orange-500 hover:bg-orange-50 transition-colors">
          <BackIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ── Row 1: Category + Thumbnail Title ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Category</label>
          <div className="relative">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              <option value="">Select Category</option>
              {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Thumbnail Title</label>
          <input type="text" value={thumbTitle} onChange={e => setThumbTitle(e.target.value)}
            placeholder=""
            className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white" />
        </div>
      </div>

      {/* ── Create New label ── */}
      <p className="text-xs font-bold text-orange-500">Create New</p>

      {/* ── Row 2: Prompt Overview + Thumbnail Description ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Prompt Page Overview</label>
          <textarea value={overview} onChange={e => setOverview(e.target.value)}
            rows={6}
            className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white resize-y" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Thumbnail Description</label>
          <textarea value={thumbDesc} onChange={e => setThumbDesc(e.target.value)}
            rows={6}
            className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white resize-y" />
        </div>
      </div>

      {/* ── Row 3: Visibility + Thumbnail Icon ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">Visibility</label>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[leftCol, rightCol].map((col, ci) => (
              <div key={ci} className="space-y-2">
                {col.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => toggleVisibility(opt)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        visibility.includes(opt)
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-gray-300 bg-white group-hover:border-orange-400'
                      }`}>
                      {visibility.includes(opt) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{opt}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          {/* ── Public / Private ── */}
          <div className="pt-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Access</label>
            <div className="flex items-center gap-2">
              {(['public', 'private'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPrivacy(opt)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    privacy === opt
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                  }`}>
                  {opt === 'public' ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
              <span className="text-[10px] text-gray-400">
                {privacy === 'public' ? 'Visible to selected roles' : 'Only visible to admins'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Thumbnail Icon</label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
            <span className="flex-1 px-3 py-2 text-xs text-gray-400 truncate">
              {iconFile ? iconFile.name : 'Choose File'}
            </span>
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border-l border-gray-200 transition-colors whitespace-nowrap">
              Browse
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => setIconFile(e.target.files?.[0] ?? null)} />
          {iconFile && (
            <div className="flex items-center gap-2 mt-1">
              <img src={URL.createObjectURL(iconFile)} alt="preview"
                className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
              <button onClick={() => setIconFile(null)} className="text-[10px] text-red-400 hover:text-red-600 transition-colors">Remove</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Example Prompts ── */}
      <div className="space-y-2">
        {prompts.length > 0 && (
          <label className="text-xs font-semibold text-gray-700">Example Prompts</label>
        )}
        <div className="space-y-2">
          {prompts.map(p => (
            <ExamplePromptRow key={p.id} prompt={p} onChange={updatePrompt} onRemove={removePrompt} />
          ))}
        </div>
        <button onClick={addPrompt}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
          <PlusCircle className="w-3.5 h-3.5" />
          Add Example Prompts
        </button>
      </div>

      {/* ── Save ── */}
      <div className="pt-2 border-t border-gray-100">
        <button
          className="px-6 py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
          Save Bot
        </button>
      </div>

    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BotInABoxPage() {
  const [bots,        setBots]        = useState<BotItem[]>(BOTS)
  const [rawSearch,   setRawSearch]   = useState('')
  const [category,    setCategory]    = useState('All')
  const [statusFilter,setStatusFilter]= useState('')
  const [sortBy,      setSortBy]      = useState<SortKey>('responses')
  const [view,        setView]        = useState<ViewMode>('grid')
  const [grouped,     setGrouped]     = useState(false)
  const [showCreate,  setShowCreate]  = useState(false)
  const [detailBot,   setDetailBot]   = useState<BotItem | null>(null)
  const [page,        setPage]        = useState(1)

  const search = useDebounce(rawSearch, 250)
  const PER_PAGE = 12

  function toggleBot(id: string) {
    setBots(prev => prev.map(b => b.id === id
      ? { ...b, active: !b.active, statusLabel: !b.active ? 'Active' : 'Inactive', status: (!b.active ? 'success' : 'danger') as BadgeVariant }
      : b))
    if (detailBot?.id === id) {
      setDetailBot(prev => prev ? { ...prev, active: !prev.active, statusLabel: !prev.active ? 'Active' : 'Inactive', status: (!prev.active ? 'success' : 'danger') as BadgeVariant } : null)
    }
  }

  function clearFilters() {
    setRawSearch(''); setCategory('All'); setStatusFilter(''); setSortBy('responses'); setPage(1)
  }

  const hasFilters = rawSearch !== '' || category !== 'All' || statusFilter !== ''

  // Category counts
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: bots.length }
    ALL_CATEGORIES.forEach(c => { map[c] = bots.filter(b => b.category === c).length })
    return map
  }, [bots])

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let list = bots.filter(b => {
      if (search) {
        const q = search.toLowerCase()
        if (!b.name.toLowerCase().includes(q) &&
            !b.description.toLowerCase().includes(q) &&
            !b.category.toLowerCase().includes(q)) return false
      }
      if (category !== 'All' && b.category !== category) return false
      if (statusFilter && b.statusLabel !== statusFilter) return false
      return true
    })
    list = [...list].sort((a, b) => {
      if (sortBy === 'responses') return b.responses - a.responses
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0 // createdOn — already ordered by id desc in data
    })
    return list
  }, [bots, search, category, statusFilter, sortBy])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Smart sections (only shown when no active filters)
  const featuredBots    = useMemo(() => bots.filter(b => b.featured).slice(0, 4), [bots])
  const recentlyUsed    = useMemo(() => bots.filter(b => b.recentlyUsed).slice(0, 4), [bots])
  const topPerforming   = useMemo(() => [...bots].sort((a, b) => b.responses - a.responses).slice(0, 4), [bots])
  const showSmartSections = !hasFilters && !grouped

  // Grouped view
  const groupedData = useMemo(() => {
    if (!grouped) return {}
    const map: Record<string, BotItem[]> = {}
    filtered.forEach(b => {
      if (!map[b.category]) map[b.category] = []
      map[b.category].push(b)
    })
    return map
  }, [filtered, grouped])

  const activeCount    = bots.filter(b => b.active).length
  const inactiveCount  = bots.filter(b => !b.active).length
  const totalResponses = bots.reduce((s, b) => s + b.responses, 0)

  if (showCreate) return <CreateBotForm onBack={() => setShowCreate(false)} />

  return (
    <div className="space-y-4">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Bots',       value: String(bots.length),             color: 'text-orange-500', bg: 'bg-orange-50', icon: Bot },
          { label: 'Active',           value: String(activeCount),             color: 'text-green-500',  bg: 'bg-green-50',  icon: CheckCircle },
          { label: 'Inactive/Pending', value: String(inactiveCount),           color: 'text-red-400',    bg: 'bg-red-50',    icon: XCircle },
          { label: 'Total Responses',  value: totalResponses.toLocaleString(), color: 'text-blue-500',   bg: 'bg-blue-50',   icon: MessageSquare },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Category chips ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          <CategoryChip label="All" active={category === 'All'} count={categoryCounts['All'] ?? 0} onClick={() => { setCategory('All'); setPage(1) }} />
          {ALL_CATEGORIES.map(c => (
            <CategoryChip key={c} label={c} active={category === c} count={categoryCounts[c] ?? 0} onClick={() => { setCategory(c); setPage(1) }} />
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {/* Search */}
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" value={rawSearch}
              onChange={e => { setRawSearch(e.target.value); setPage(1) }}
              placeholder="Search bots, categories…"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              <option value="">All Statuses</option>
              {['Active','Pending','Inactive'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              <option value="responses">Most Used</option>
              <option value="createdOn">Recently Created</option>
              <option value="name">Alphabetical</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          {/* Group toggle */}
          <button onClick={() => setGrouped(g => !g)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${grouped ? 'bg-orange-50 border-orange-300 text-orange-600' : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600'}`}>
            <Layers className="w-3.5 h-3.5" />
            Group by category
          </button>

          {/* Clear filters */}
          {hasFilters && (
            <button onClick={clearFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}

          {/* Count */}
          <span className="text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of <span className="font-semibold text-gray-600">{bots.length}</span> bots
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setView('table')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='table' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Bot
          </button>
        </div>
      </div>


      {/* ── Smart sections (no active filters) ── */}
      {showSmartSections && view === 'grid' && (
        <div className="space-y-6">
          <SmartSection title="Featured Bots"     icon={Star}       bots={featuredBots}  onToggle={toggleBot} onView={setDetailBot} />
          <SmartSection title="Recently Used"     icon={Clock}      bots={recentlyUsed}  onToggle={toggleBot} onView={setDetailBot} />
          <SmartSection title="Top Performing"    icon={TrendingUp} bots={topPerforming} onToggle={toggleBot} onView={setDetailBot} />
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-700">All Bots</h3>
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{filtered.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map(bot => <BotCard key={bot.id} bot={bot} onToggle={toggleBot} onView={setDetailBot} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── Grouped view ── */}
      {grouped && view === 'grid' && (
        <div className="space-y-6">
          {Object.entries(groupedData).map(([cat, catBots]) => (
            <div key={cat} className="space-y-2">
              <div className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-orange-500" />
                <h3 className="text-xs font-semibold text-gray-700">{cat}</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{catBots.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {catBots.map(bot => <BotCard key={bot.id} bot={bot} onToggle={toggleBot} onView={setDetailBot} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Filtered grid (with active filters, not grouped) ── */}
      {!showSmartSections && !grouped && view === 'grid' && (
        filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 gap-3">
            <Bot className="w-10 h-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">No bots found</p>
            <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-1 px-3 py-1.5 text-xs text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map(bot => <BotCard key={bot.id} bot={bot} onToggle={toggleBot} onView={setDetailBot} />)}
          </div>
        )
      )}

      {/* ── Table view ── */}
      {view === 'table' && (
        filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 gap-3">
            <Bot className="w-10 h-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">No bots found</p>
            <button onClick={clearFilters} className="mt-1 px-3 py-1.5 text-xs text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/40">
                    {['Bot','Category','Trigger','Responses','Status','Active','Created By','Created On',''].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(bot => (
                    <tr key={bot.id} className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors cursor-pointer"
                      onClick={() => setDetailBot(bot)}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <BotIcon name={bot.iconName} color={bot.color} />
                          <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{bot.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">{bot.category}</span></td>
                      <td className="px-4 py-3 max-w-[160px]"><span className="text-xs text-gray-500 truncate block">{bot.trigger}</span></td>
                      <td className="px-4 py-3"><span className="text-xs text-gray-600">{bot.responses}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon status={bot.status} />
                          <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
                        </div>
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <button onClick={() => toggleBot(bot.id)}
                          className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}>
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
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
        )
      )}

      {/* ── Pagination ── */}
      {filtered.length > PER_PAGE && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${page === p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Showing <span className="font-semibold text-gray-700">{(page - 1) * PER_PAGE + 1}</span>–
            <span className="font-semibold text-gray-700">{Math.min(page * PER_PAGE, filtered.length)}</span> of{' '}
            <span className="font-semibold text-gray-700">{filtered.length}</span> bots
          </p>
        </div>
      )}

      {/* ── Bot detail modal ── */}
      {detailBot && (
        <BotDetailModal bot={detailBot} onClose={() => setDetailBot(null)} onToggle={toggleBot} />
      )}
    </div>
  )
}
