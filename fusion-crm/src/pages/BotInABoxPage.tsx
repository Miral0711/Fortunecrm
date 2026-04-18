import { useState } from 'react'
import {
  Plus, MoreVertical, Search, ChevronLeft, ChevronRight,
  ChevronDown, Bot, Tag, Calendar, User, Eye, Pencil,
  Trash2, Play, Pause, Copy,
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
  icon: string
  color: string
  active: boolean
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BOTS: BotItem[] = [
  { id:'1',  name:'Property Enquiry Bot',         category:'Property Enquiry',        trigger:'Website form submit',    description:'Captures inbound property enquiries, qualifies the lead with 5 questions and routes to the assigned BDM automatically.',                          responses:284, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'17 Apr 2026', updatedOn:'17 Apr 2026', icon:'🏠', color:'bg-orange-50 text-orange-600',  active:true  },
  { id:'2',  name:'Finance Pre-Assessment',        category:'Finance Assessment',      trigger:'Landing page CTA',       description:'Walks users through a 7-step finance readiness assessment, scores their profile and sends a personalised report via email.',                      responses:197, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'15 Apr 2026', updatedOn:'16 Apr 2026', icon:'💰', color:'bg-green-50 text-green-600',    active:true  },
  { id:'3',  name:'SMSF Investor Qualifier',       category:'SMSF Qualification',      trigger:'SMSF landing page',      description:'Qualifies SMSF investors by collecting fund balance, trustee type and investment timeline before booking a strategy call.',                        responses:143, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'12 Apr 2026', updatedOn:'14 Apr 2026', icon:'📊', color:'bg-blue-50 text-blue-600',      active:true  },
  { id:'4',  name:'Referral Partner Welcome',      category:'Referral Capture',        trigger:'Partner signup form',    description:'Sends a personalised welcome sequence to new referral partners, collects ABN and bank details, and schedules onboarding call.',                    responses:89,  status:'success', statusLabel:'Active',   createdBy:'James Thornton', createdOn:'10 Apr 2026', updatedOn:'13 Apr 2026', icon:'🤝', color:'bg-purple-50 text-purple-600',  active:true  },
  { id:'5',  name:'Reservation Flow Bot',          category:'Property Reservation',    trigger:'Reserve now button',     description:'Guides buyers through the reservation process step by step, collects deposit intent and notifies the sales team in real time.',                    responses:62,  status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'08 Apr 2026', updatedOn:'10 Apr 2026', icon:'📋', color:'bg-yellow-50 text-yellow-600',  active:false },
  { id:'6',  name:'30-Day Nurture Sequence',       category:'Lead Nurture Sequence',   trigger:'Cold lead tag applied',  description:'Automated 30-day email + SMS nurture flow for cold leads. Sends market updates, case studies and soft CTAs at optimal intervals.',               responses:521, status:'success', statusLabel:'Active',   createdBy:'Priya Sharma',   createdOn:'05 Apr 2026', updatedOn:'09 Apr 2026', icon:'📧', color:'bg-teal-50 text-teal-600',      active:true  },
  { id:'7',  name:'New Subscriber Welcome',        category:'Subscriber Onboarding',   trigger:'Subscriber list join',   description:'Onboards new subscribers with a 3-email welcome sequence, captures investment preferences and segments into the correct nurture list.',            responses:318, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'02 Apr 2026', updatedOn:'07 Apr 2026', icon:'👋', color:'bg-indigo-50 text-indigo-600',  active:true  },
  { id:'8',  name:'Property Search Matcher',       category:'Property Search Request', trigger:'Search request form',    description:'Collects buyer criteria — budget, location, type, timeline — and matches to available listings, sending results within 60 seconds.',              responses:407, status:'success', statusLabel:'Active',   createdBy:'David Chen',     createdOn:'30 Mar 2026', updatedOn:'05 Apr 2026', icon:'🔍', color:'bg-sky-50 text-sky-600',        active:true  },
  { id:'9',  name:'BDM Discovery Call Booker',     category:'BDM Appointment Setter',  trigger:'Book a call button',     description:'Checks BDM calendar availability in real time and books discovery calls, sending confirmation emails with Zoom links automatically.',             responses:74,  status:'danger',  statusLabel:'Inactive', createdBy:'Admin',          createdOn:'25 Mar 2026', updatedOn:'28 Mar 2026', icon:'📅', color:'bg-rose-50 text-rose-600',      active:false },
  { id:'10', name:'Wealth Creation Funnel Bot',    category:'Wealth Creation Funnel',  trigger:'Wealth website visit',   description:'Top-of-funnel bot for wealth creation website visitors. Captures name, email and investment goals before routing to a BDM for follow-up.',    responses:256, status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'20 Mar 2026', updatedOn:'25 Mar 2026', icon:'📈', color:'bg-emerald-50 text-emerald-600', active:true  },
  { id:'11', name:'Duplex Dual-Income Qualifier',  category:'Duplex Investor Flow',    trigger:'Duplex landing page',    description:'Specialised qualification flow for duplex investors. Assesses SMSF eligibility, rental yield expectations and preferred locations.',              responses:112, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'15 Mar 2026', updatedOn:'20 Mar 2026', icon:'🏘', color:'bg-amber-50 text-amber-600',    active:true  },
  { id:'12', name:'General FAQ Assistant',         category:'General FAQ Bot',         trigger:'Chat widget open',       description:'Handles common platform questions, redirects to help documentation and escalates unresolved queries to the support team via email.',            responses:893, status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'10 Mar 2026', updatedOn:'12 Mar 2026', icon:'❓', color:'bg-gray-50 text-gray-600',      active:false },
]

const CATEGORIES = ['All Categories', ...Array.from(new Set(BOTS.map(b => b.category)))]
const TOTAL      = 126
const PER_PAGE   = 10

// ── Row action menu ───────────────────────────────────────────────────────────

function RowMenu({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
          {[
            { label: 'View',          icon: Eye,    danger: false },
            { label: 'Edit',          icon: Pencil, danger: false },
            { label: 'Duplicate',     icon: Copy,   danger: false },
            { label: active ? 'Pause Bot' : 'Activate Bot', icon: active ? Pause : Play, danger: false },
            { label: 'Delete',        icon: Trash2, danger: true  },
          ].map(({ label, icon: Icon, danger }) => (
            <button key={label}
              onClick={() => { if (label.includes('Bot')) onToggle(); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Bot card ──────────────────────────────────────────────────────────────────

function BotCard({ bot, onToggle }: { bot: BotItem; onToggle: (id: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${bot.color}`}>
            {bot.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">{bot.name}</p>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{bot.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge>
          <RowMenu active={bot.active} onToggle={() => onToggle(bot.id)} />
        </div>
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{bot.description}</p>

      <div className="text-[10px] text-gray-400 bg-gray-50 rounded-lg px-2.5 py-1.5">
        <span className="font-medium text-gray-500">Trigger:</span> {bot.trigger}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><Bot className="w-3 h-3" />{bot.responses} responses</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{bot.createdOn}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{bot.createdBy}</span>
        </div>
        {/* Active toggle */}
        <button
          onClick={() => onToggle(bot.id)}
          className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BotInABoxPage() {
  const [bots,     setBots]     = useState<BotItem[]>(BOTS)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All Categories')
  const [status,   setStatus]   = useState('')
  const [view,     setView]     = useState<'grid' | 'table'>('grid')
  const [page,     setPage]     = useState(1)
  const [showAdd,  setShowAdd]  = useState(false)
  const [newName,  setNewName]  = useState('')

  function toggleBot(id: string) {
    setBots(prev => prev.map(b => b.id === id ? { ...b, active: !b.active, statusLabel: !b.active ? 'Active' : 'Inactive', status: (!b.active ? 'success' : 'danger') as BadgeVariant } : b))
  }

  const filtered = bots.filter(b => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) &&
        !b.category.toLowerCase().includes(search.toLowerCase())) return false
    if (category !== 'All Categories' && b.category !== category) return false
    if (status && b.statusLabel !== status) return false
    return true
  })

  const totalPages = Math.ceil(TOTAL / PER_PAGE)
  const pages: (number | '...')[] = [1,2,3,4,5,6,7,8,9,10,'...',totalPages-1,totalPages]

  const activeCount   = bots.filter(b => b.active).length
  const inactiveCount = bots.filter(b => !b.active).length
  const totalResponses = bots.reduce((s, b) => s + b.responses, 0)

  return (
    <div className="space-y-4">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Bots',       value: String(BOTS.length),              color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Active',           value: String(activeCount),              color: 'text-green-500',  bg: 'bg-green-50'  },
          { label: 'Inactive/Pending', value: String(inactiveCount),            color: 'text-red-400',    bg: 'bg-red-50'    },
          { label: 'Total Responses',  value: totalResponses.toLocaleString(),  color: 'text-blue-500',   bg: 'bg-blue-50'   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
              <Bot className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search bots…"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400" />
          </div>

          <div className="relative">
            <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              <option value="">All Statuses</option>
              {['Active','Pending','Inactive'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <span className="text-xs text-gray-400">{filtered.length} bots</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Grid</button>
            <button onClick={() => setView('table')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='table' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Table</button>
          </div>
          <button onClick={() => setShowAdd(a => !a)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Bot
          </button>
        </div>
      </div>

      {/* ── Inline add form ── */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm px-4 py-3 flex items-center gap-3">
          <Tag className="w-4 h-4 text-orange-400 shrink-0" />
          <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Bot name…"
            className="flex-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400" />
          <button onClick={() => { setNewName(''); setShowAdd(false) }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">Save</button>
          <button onClick={() => setShowAdd(false)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
        </div>
      )}

      {/* ── Grid view ── */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(bot => <BotCard key={bot.id} bot={bot} onToggle={toggleBot} />)}
        </div>
      )}

      {/* ── Table view ── */}
      {view === 'table' && (
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
                {filtered.map(bot => (
                  <tr key={bot.id} className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${bot.color}`}>{bot.icon}</span>
                        <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{bot.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">{bot.category}</span></td>
                    <td className="px-4 py-3 max-w-[160px]"><span className="text-xs text-gray-500 truncate block">{bot.trigger}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-600">{bot.responses}</span></td>
                    <td className="px-4 py-3"><StatusBadge variant={bot.status}>{bot.statusLabel}</StatusBadge></td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleBot(bot.id)}
                        className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors ${bot.active ? 'bg-orange-500' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${bot.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500">{bot.createdBy}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500">{bot.createdOn}</span></td>
                    <td className="px-4 py-3"><RowMenu active={bot.active} onToggle={() => toggleBot(bot.id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {pages.map((p,i) =>
            p==='...' ? (
              <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">…</span>
            ) : (
              <button key={p} onClick={() => setPage(p as number)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${page===p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {p}
              </button>
            )
          )}
          <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{(page-1)*PER_PAGE+1}</span>–
          <span className="font-semibold text-gray-700">{Math.min(page*PER_PAGE,TOTAL)}</span> of{' '}
          <span className="font-semibold text-gray-700">{TOTAL}</span> bots
        </p>
      </div>
    </div>
  )
}
