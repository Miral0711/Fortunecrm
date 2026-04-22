import { useState, useMemo } from 'react'
import {
  Plus, Download, ChevronDown, MoreVertical,
  LayoutList, LayoutGrid, Table2, X, SlidersHorizontal,
} from 'lucide-react'
import { clientsFullData } from '../../data/accountsData'
import type { ClientRow } from '../../data/accountsData'
import StatusBadge from '../../components/ui/StatusBadge'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/dashboard/StatCard'
import { Users, UserCheck, TrendingUp, Activity } from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const STATES   = ['ACT','NSW','NT','QLD','SA','TAS','VIC','WA']
const STAGES   = ['New Lead','Contacted','Qualified','Proposal','Negotiation','Closed']
const STATUSES = ['Active','Pending','Inactive','Review']
const SOURCES  = ['API','PHP Website','Wordpress Website','Referral','Direct']
const PER_PAGE_OPTIONS = [10, 25, 50, 100]

const ALL_COLUMNS: { key: keyof ClientRow; label: string }[] = [
  { key: 'firstName',   label: 'First Name'   },
  { key: 'lastName',    label: 'Last Name'     },
  { key: 'leadSource',  label: 'Lead Source'   },
  { key: 'statusLabel', label: 'Status'        },
  { key: 'phone',       label: 'Phone'         },
  { key: 'suburb',      label: 'Suburb'        },
  { key: 'state',       label: 'State'         },
  { key: 'lastUpdated', label: 'Last Updated'  },
  { key: 'createdOn',   label: 'Created On'    },
]

const DEFAULT_VISIBLE = new Set<keyof ClientRow>([
  'firstName','lastName','leadSource','statusLabel','phone','suburb','state','lastUpdated','createdOn',
])

// ── Sub-components ────────────────────────────────────────────────────────────

function SelectField({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
        >
          <option value="">Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

function TextField({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
        placeholder=""
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  // Search filters
  const [firstName,      setFirstName]      = useState('')
  const [lastName,       setLastName]        = useState('')
  const [state,          setState]           = useState('')
  const [stage,          setStage]           = useState('')
  const [status,         setStatus]          = useState('')
  const [subscriber,     setSubscriber]      = useState('')
  const [salesAgent,     setSalesAgent]      = useState('')
  const [referralPartner,setReferralPartner] = useState('')
  const [affiliate,      setAffiliate]       = useState('')
  const [agent,          setAgent]           = useState('')

  // Table controls
  const [page,           setPage]            = useState(1)
  const [perPage,        setPerPage]         = useState(10)
  const [selected,       setSelected]        = useState<Set<string>>(new Set())
  const [visibleCols,    setVisibleCols]     = useState<Set<keyof ClientRow>>(DEFAULT_VISIBLE)
  const [showColPicker,  setShowColPicker]   = useState(false)
  const [viewMode,       setViewMode]        = useState<'table'|'grid'|'compact'>('table')
  const [showBulkMenu,   setShowBulkMenu]    = useState(false)

  // Filter data
  const filtered = useMemo(() => {
    return clientsFullData.filter(r => {
      if (firstName && !r.firstName.toLowerCase().includes(firstName.toLowerCase())) return false
      if (lastName  && !r.lastName.toLowerCase().includes(lastName.toLowerCase()))   return false
      if (state     && r.state !== state)                                             return false
      if (status    && r.statusLabel !== status)                                      return false
      return true
    })
  }, [firstName, lastName, state, status])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  // Selection helpers
  const allPageSelected = paged.length > 0 && paged.every(r => selected.has(r.id))
  function toggleAll() {
    setSelected(prev => {
      const next = new Set(prev)
      if (allPageSelected) paged.forEach(r => next.delete(r.id))
      else paged.forEach(r => next.add(r.id))
      return next
    })
  }
  function toggleRow(id: string) {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function clearFilters() {
    setFirstName(''); setLastName(''); setState(''); setStage('')
    setStatus(''); setSubscriber(''); setSalesAgent('')
    setReferralPartner(''); setAffiliate(''); setAgent('')
    setPage(1)
  }

  const hasFilters = firstName || lastName || state || stage || status || subscriber || salesAgent || referralPartner || affiliate || agent

  // Visible columns in order
  const activeCols = ALL_COLUMNS.filter(c => visibleCols.has(c.key))

  return (
    <div className="space-y-4">
      <PageHeader
        title="Client / Investor Search"
        breadcrumbs={[{ label: 'Accounts' }, { label: 'Clients' }]}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Client
            </button>
          </div>
        }
      />

      {/* ── KPI row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clients"   value="7,731"  change="+12% this month"  changeType="up"   icon={Users}      iconBg="bg-orange-50" iconColor="text-orange-500" />
        <StatCard label="Active"          value="6,204"  change="+8% vs last month" changeType="up"  icon={UserCheck}  iconBg="bg-green-50"  iconColor="text-green-500" />
        <StatCard label="New This Month"  value="184"    change="+22% this month"   changeType="up"  icon={TrendingUp} iconBg="bg-blue-50"   iconColor="text-blue-500" />
        <StatCard label="Pending Review"  value="53"     change="-5% this month"    changeType="down" icon={Activity}  iconBg="bg-yellow-50" iconColor="text-yellow-500" />
      </div>

      {/* ── Search panel ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <TextField label="First Name"       value={firstName}       onChange={v => { setFirstName(v);       setPage(1) }} />
          <TextField label="Last Name"        value={lastName}        onChange={v => { setLastName(v);        setPage(1) }} />
          <SelectField label="State"          options={STATES}        value={state}          onChange={v => { setState(v);          setPage(1) }} />
          <SelectField label="Stage"          options={STAGES}        value={stage}          onChange={v => { setStage(v);          setPage(1) }} />
          <SelectField label="Status"         options={STATUSES}      value={status}         onChange={v => { setStatus(v);         setPage(1) }} />
          <SelectField label="Subscriber"     options={['Yes','No']}  value={subscriber}     onChange={v => { setSubscriber(v);     setPage(1) }} />
          <SelectField label="Sales Agent"    options={['Agent A','Agent B','Agent C']} value={salesAgent}     onChange={v => { setSalesAgent(v);     setPage(1) }} />
          <SelectField label="Referral Partner" options={['Partner A','Partner B']}    value={referralPartner} onChange={v => { setReferralPartner(v); setPage(1) }} />
          <SelectField label="Affiliate"      options={['Affiliate A','Affiliate B']}  value={affiliate}      onChange={v => { setAffiliate(v);      setPage(1) }} />
          <SelectField label="Agent"          options={['Agent X','Agent Y']}          value={agent}          onChange={v => { setAgent(v);          setPage(1) }} />
        </div>
        <div className="flex items-center justify-end mt-3 gap-2">
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
          <button
            onClick={clearFilters}
            className="px-4 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ── Table panel ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {/* Bulk actions */}
            <div className="relative">
              <button
                onClick={() => setShowBulkMenu(b => !b)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                Bulk Actions <ChevronDown className="w-3 h-3" />
              </button>
              {showBulkMenu && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                  {['Export Selected','Delete Selected','Mark Active','Mark Inactive'].map(a => (
                    <button key={a} onClick={() => setShowBulkMenu(false)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selected.size > 0 && (
              <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-lg">
                {selected.size} selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Column selector */}
            <div className="relative">
              <button
                onClick={() => setShowColPicker(c => !c)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Selected Columns: <span className="text-orange-500 font-semibold">{visibleCols.size} Selected</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showColPicker && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-20 p-3">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Toggle Columns</p>
                  <div className="space-y-1.5">
                    {ALL_COLUMNS.map(col => (
                      <label key={col.key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={visibleCols.has(col.key)}
                          onChange={() => {
                            setVisibleCols(prev => {
                              const n = new Set(prev)
                              n.has(col.key) ? n.delete(col.key) : n.add(col.key)
                              return n
                            })
                          }}
                          className="w-3.5 h-3.5 accent-orange-500 rounded"
                        />
                        <span className="text-xs text-gray-700 group-hover:text-orange-600 transition-colors">{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View mode */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              {([
                { mode: 'table',   Icon: LayoutList },
                { mode: 'grid',    Icon: LayoutGrid },
                { mode: 'compact', Icon: Table2 },
              ] as const).map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-1.5 transition-colors ${viewMode === mode ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Per page */}
            <div className="relative">
              <select
                value={perPage}
                onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
                className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
              >
                {PER_PAGE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-10 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 accent-orange-500 rounded cursor-pointer"
                  />
                </th>
                {activeCols.map(col => (
                  <th key={col.key} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {col.label}
                      <span className="text-gray-300 text-[9px]">↕</span>
                    </div>
                  </th>
                ))}
                <th className="w-10 px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={activeCols.length + 2} className="py-16 text-center text-xs text-gray-400">
                    No clients match your search criteria.
                  </td>
                </tr>
              ) : paged.map(row => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${selected.has(row.id) ? 'bg-orange-50/40' : ''}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="w-3.5 h-3.5 accent-orange-500 rounded cursor-pointer"
                    />
                  </td>
                  {activeCols.map(col => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.key === 'firstName' || col.key === 'lastName' ? (
                        <button className="text-xs font-medium text-orange-500 hover:text-orange-600 hover:underline transition-colors">
                          {row[col.key]}
                        </button>
                      ) : col.key === 'statusLabel' ? (
                        <StatusBadge variant={row.status}>{row.statusLabel}</StatusBadge>
                      ) : col.key === 'leadSource' ? (
                        <span className="text-xs text-gray-500">{row.leadSource || '—'}</span>
                      ) : (
                        <span className="text-xs text-gray-600">{String(row[col.key]) || '—'}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-md text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ‹
            </button>

            {/* Page numbers */}
            {(() => {
              const pages: (number | '...')[] = []
              if (totalPages <= 10) {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              } else {
                pages.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', totalPages - 1, totalPages)
              }
              return pages.map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                      page === p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              )
            })()}

            {/* Next */}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-md text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ›
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Showing <span className="font-medium text-gray-700">{(page - 1) * perPage + 1}</span> to{' '}
            <span className="font-medium text-gray-700">{Math.min(page * perPage, filtered.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{filtered.length.toLocaleString()}</span> results
          </p>
        </div>
      </div>
    </div>
  )
}
