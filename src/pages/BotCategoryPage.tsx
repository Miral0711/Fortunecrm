import { useState } from 'react'
import {
  Plus, MoreVertical, Search, ChevronLeft, ChevronRight,
  ChevronDown, Bot, Tag, Calendar, User, Eye, Pencil, Trash2,
} from 'lucide-react'
import StatusBadge from '../components/ui/StatusBadge'
import type { BadgeVariant } from '../types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface BotCategory {
  id: string
  name: string
  slug: string
  description: string
  botCount: number
  status: BadgeVariant
  statusLabel: string
  createdBy: string
  createdOn: string
  updatedOn: string
  icon: string
  color: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES: BotCategory[] = [
  { id:'1',  name:'Property Enquiry',        slug:'property-enquiry',        description:'Handles inbound property enquiries, qualifies leads and routes to the right agent automatically.',                                    botCount:12, status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'17 Apr 2026', updatedOn:'17 Apr 2026', icon:'🏠', color:'bg-orange-50 text-orange-600' },
  { id:'2',  name:'Finance Assessment',      slug:'finance-assessment',      description:'Guides users through a finance pre-assessment flow, collects income and liability data, and scores readiness.',                       botCount:8,  status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'15 Apr 2026', updatedOn:'16 Apr 2026', icon:'💰', color:'bg-green-50 text-green-600'  },
  { id:'3',  name:'SMSF Qualification',      slug:'smsf-qualification',      description:'Qualifies SMSF investors by asking targeted questions about fund balance, trustee structure and investment goals.',                   botCount:5,  status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'12 Apr 2026', updatedOn:'14 Apr 2026', icon:'📊', color:'bg-blue-50 text-blue-600'    },
  { id:'4',  name:'Referral Capture',        slug:'referral-capture',        description:'Captures referral partner details, validates ABN and sends automated welcome sequences to new referral partners.',                    botCount:6,  status:'success', statusLabel:'Active',   createdBy:'James Thornton', createdOn:'10 Apr 2026', updatedOn:'13 Apr 2026', icon:'🤝', color:'bg-purple-50 text-purple-600'},
  { id:'5',  name:'Property Reservation',    slug:'property-reservation',    description:'Walks buyers through the reservation process, collects deposit intent and schedules follow-up with the sales team.',                  botCount:4,  status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'08 Apr 2026', updatedOn:'10 Apr 2026', icon:'📋', color:'bg-yellow-50 text-yellow-600'},
  { id:'6',  name:'Lead Nurture Sequence',   slug:'lead-nurture',            description:'Automated multi-step nurture flow for cold leads. Sends educational content, market updates and soft CTAs over 30 days.',             botCount:9,  status:'success', statusLabel:'Active',   createdBy:'Priya Sharma',   createdOn:'05 Apr 2026', updatedOn:'09 Apr 2026', icon:'📧', color:'bg-teal-50 text-teal-600'    },
  { id:'7',  name:'Subscriber Onboarding',   slug:'subscriber-onboarding',   description:'Onboards new subscribers with a welcome sequence, preference capture and list segmentation based on investment profile.',            botCount:7,  status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'02 Apr 2026', updatedOn:'07 Apr 2026', icon:'👋', color:'bg-indigo-50 text-indigo-600'},
  { id:'8',  name:'Property Search Request', slug:'property-search-request', description:'Collects buyer criteria including budget, location, property type and timeline, then matches to available listings.',                 botCount:11, status:'success', statusLabel:'Active',   createdBy:'David Chen',     createdOn:'30 Mar 2026', updatedOn:'05 Apr 2026', icon:'🔍', color:'bg-sky-50 text-sky-600'      },
  { id:'9',  name:'BDM Appointment Setter',  slug:'bdm-appointment',         description:'Books discovery calls with BDMs by checking calendar availability and sending confirmation emails with meeting details.',             botCount:3,  status:'danger',  statusLabel:'Inactive', createdBy:'Admin',          createdOn:'25 Mar 2026', updatedOn:'28 Mar 2026', icon:'📅', color:'bg-rose-50 text-rose-600'    },
  { id:'10', name:'Wealth Creation Funnel',  slug:'wealth-creation-funnel',  description:'Top-of-funnel bot for wealth creation website visitors. Captures name, email and investment goals before routing to a BDM.',         botCount:6,  status:'success', statusLabel:'Active',   createdBy:'Chris Bockisch', createdOn:'20 Mar 2026', updatedOn:'25 Mar 2026', icon:'📈', color:'bg-emerald-50 text-emerald-600'},
  { id:'11', name:'Duplex Investor Flow',    slug:'duplex-investor',         description:'Specialised flow for duplex and dual-income property investors. Qualifies SMSF eligibility and rental yield expectations.',           botCount:4,  status:'success', statusLabel:'Active',   createdBy:'Admin',          createdOn:'15 Mar 2026', updatedOn:'20 Mar 2026', icon:'🏘', color:'bg-amber-50 text-amber-600'  },
  { id:'12', name:'General FAQ Bot',         slug:'general-faq',             description:'Handles common platform questions, redirects to help docs and escalates unresolved queries to the support team via email.',           botCount:2,  status:'warning', statusLabel:'Pending',  createdBy:'Admin',          createdOn:'10 Mar 2026', updatedOn:'12 Mar 2026', icon:'❓', color:'bg-gray-50 text-gray-600'    },
]

const TOTAL = 126
const PER_PAGE = 10

// ── Row action menu ───────────────────────────────────────────────────────────

function RowMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
          {[
            { label: 'View',   icon: Eye },
            { label: 'Edit',   icon: Pencil },
            { label: 'Delete', icon: Trash2, danger: true },
          ].map(({ label, icon: Icon, danger }) => (
            <button key={label} onClick={() => setOpen(false)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({ cat }: { cat: BotCategory }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${cat.color}`}>
            {cat.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">{cat.name}</p>
            <p className="text-[10px] text-gray-400 font-mono">{cat.slug}</p>
          </div>
        </div>
        <StatusBadge variant={cat.status}>{cat.statusLabel}</StatusBadge>
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{cat.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><Bot className="w-3 h-3" />{cat.botCount} bots</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{cat.createdOn}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{cat.createdBy}</span>
        </div>
        <RowMenu />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BotCategoryPage() {
  const [search,  setSearch]  = useState('')
  const [status,  setStatus]  = useState('')
  const [view,    setView]    = useState<'grid' | 'table'>('grid')
  const [page,    setPage]    = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')

  const filtered = CATEGORIES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
        !c.slug.toLowerCase().includes(search.toLowerCase())) return false
    if (status && c.statusLabel !== status) return false
    return true
  })

  const totalPages = Math.ceil(TOTAL / PER_PAGE)
  const pages: (number | '...')[] = [1,2,3,4,5,6,7,8,9,10,'...',totalPages-1,totalPages]

  return (
    <div className="space-y-4">

      {/* ── Header card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {/* Search */}
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search categories…"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer">
              <option value="">All Statuses</option>
              {['Active','Pending','Inactive'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <span className="text-xs text-gray-400">{filtered.length} categories</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Grid</button>
            <button onClick={() => setView('table')} className={`px-2.5 py-1.5 text-xs transition-colors ${view==='table' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Table</button>
          </div>

          <button
            onClick={() => setShowAdd(a => !a)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {/* ── Add category inline form ── */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm px-4 py-3 flex items-center gap-3">
          <Tag className="w-4 h-4 text-orange-400 shrink-0" />
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Category name…"
            className="flex-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
          />
          <button onClick={() => { setNewName(''); setShowAdd(false) }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            Save
          </button>
          <button onClick={() => setShowAdd(false)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
        </div>
      )}

      {/* ── Grid view ── */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(cat => <CategoryCard key={cat.id} cat={cat} />)}
        </div>
      )}

      {/* ── Table view ── */}
      {view === 'table' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="max-h-[60vh] overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/40">
                  {['Category','Slug','Bots','Status','Created By','Created On','Updated On',''].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(cat => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${cat.color}`}>{cat.icon}</span>
                        <span className="text-xs font-medium text-gray-800">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[10px] font-mono text-gray-400">{cat.slug}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-600">{cat.botCount}</span></td>
                    <td className="px-4 py-3"><StatusBadge variant={cat.status}>{cat.statusLabel}</StatusBadge></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500">{cat.createdBy}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500">{cat.createdOn}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500">{cat.updatedOn}</span></td>
                    <td className="px-4 py-3"><RowMenu /></td>
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
          <span className="font-semibold text-gray-700">{TOTAL}</span> categories
        </p>
      </div>
    </div>
  )
}
