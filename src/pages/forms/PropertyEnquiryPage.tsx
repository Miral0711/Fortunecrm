import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MoreVertical, Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/ui/StatusBadge'
import type { BadgeVariant } from '../../types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface EnquiryRow {
  id: string
  agentName: string
  clientName: string
  clientContact: string
  createDate: string
  updateDate: string
  status: 'Pending' | 'New' | 'Contacted' | 'Closed'
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_DATA: EnquiryRow[] = [
  { id: '1',  agentName: 'Jinalkumar Patel',            clientName: 'Bhavesh Mishra',           clientContact: '0403252111', createDate: '21 Apr 2026 02:51 pm', updateDate: '21 Apr 2026 02:51 pm', status: 'Pending'   },
  { id: '2',  agentName: 'Chris Bockisch',              clientName: 'Chris Bockisch',           clientContact: '0414274357', createDate: '21 Apr 2026 11:27 am', updateDate: '21 Apr 2026 11:27 am', status: 'New'       },
  { id: '3',  agentName: 'Jinalkumar Patel',            clientName: 'Bhavesh Mishra',           clientContact: '0403252111', createDate: '20 Apr 2026 11:13 am', updateDate: '20 Apr 2026 11:13 am', status: 'Pending'   },
  { id: '4',  agentName: 'Jinalkumar Patel',            clientName: 'Bhavesh Mishra',           clientContact: '0403252111', createDate: '20 Apr 2026 11:08 am', updateDate: '20 Apr 2026 11:08 am', status: 'Pending'   },
  { id: '5',  agentName: 'Jinalkumar Patel',            clientName: 'Bhavesh Mishra',           clientContact: '0403252111', createDate: '20 Apr 2026 10:44 am', updateDate: '20 Apr 2026 10:44 am', status: 'Pending'   },
  { id: '6',  agentName: 'Equimax Property Investment', clientName: 'Gaurav Bhatia',            clientContact: '0409407734', createDate: '17 Apr 2026 12:39 pm', updateDate: '17 Apr 2026 12:39 pm', status: 'Pending'   },
  { id: '7',  agentName: 'Jinalkumar Patel',            clientName: 'Jinalkumar Maxx',          clientContact: '0430096493', createDate: '17 Apr 2026 11:40 am', updateDate: '17 Apr 2026 11:40 am', status: 'Pending'   },
  { id: '8',  agentName: 'Craig Cameron',               clientName: 'Sabitha Andrews and Santhosh Chandy', clientContact: '0422603076', createDate: '15 Apr 2026 03:22 pm', updateDate: '15 Apr 2026 03:22 pm', status: 'Pending' },
  { id: '9',  agentName: 'Craig Cameron',               clientName: 'Sabitha Andrews and Santhosh Chandy', clientContact: '0422603076', createDate: '14 Apr 2026 07:46 pm', updateDate: '14 Apr 2026 07:46 pm', status: 'Pending' },
  { id: '10', agentName: 'Sandy Arora',                 clientName: 'san Aro',                  clientContact: '0406339896', createDate: '12 Apr 2026 06:53 pm', updateDate: '12 Apr 2026 06:53 pm', status: 'Pending'   },
  { id: '11', agentName: 'Michael Chen',                clientName: 'David Park',               clientContact: '0411223344', createDate: '11 Apr 2026 09:15 am', updateDate: '11 Apr 2026 09:15 am', status: 'Contacted' },
  { id: '12', agentName: 'Sarah Williams',              clientName: 'Emma Johnson',             clientContact: '0455667788', createDate: '10 Apr 2026 02:30 pm', updateDate: '10 Apr 2026 02:30 pm', status: 'Closed'    },
  { id: '13', agentName: 'Jinalkumar Patel',            clientName: 'Raj Sharma',               clientContact: '0499887766', createDate: '09 Apr 2026 11:00 am', updateDate: '09 Apr 2026 11:00 am', status: 'New'       },
  { id: '14', agentName: 'Chris Bockisch',              clientName: 'Lisa Turner',              clientContact: '0433221100', createDate: '08 Apr 2026 04:45 pm', updateDate: '08 Apr 2026 04:45 pm', status: 'Pending'   },
  { id: '15', agentName: 'Sandy Arora',                 clientName: 'Tom Wilson',               clientContact: '0477889900', createDate: '07 Apr 2026 10:20 am', updateDate: '07 Apr 2026 10:20 am', status: 'Contacted' },
]

const AGENTS   = [...new Set(MOCK_DATA.map(r => r.agentName))]
const CLIENTS  = [...new Set(MOCK_DATA.map(r => r.clientName))]
const STATUSES = ['Pending', 'New', 'Contacted', 'Closed']
const PER_PAGE_OPTIONS = [10, 25, 50, 100]

const STATUS_VARIANT: Record<EnquiryRow['status'], BadgeVariant> = {
  Pending:   'warning',
  New:       'info',
  Contacted: 'orange',
  Closed:    'success',
}

// ── SelectField ───────────────────────────────────────────────────────────────

function SelectField({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
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

// ── SortIcon ──────────────────────────────────────────────────────────────────

function SortIcon({ col, sortCol, sortDir }: { col: string; sortCol: string; sortDir: 'asc' | 'desc' }) {
  return (
    <span className="inline-flex flex-col ml-1 opacity-40">
      <span className={`text-[8px] leading-none ${sortCol === col && sortDir === 'asc' ? 'opacity-100 text-orange-500' : ''}`}>▲</span>
      <span className={`text-[8px] leading-none ${sortCol === col && sortDir === 'desc' ? 'opacity-100 text-orange-500' : ''}`}>▼</span>
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PropertyEnquiryPage() {
  const navigate = useNavigate()
  const [agent,    setAgent]    = useState('')
  const [client,   setClient]   = useState('')
  const [status,   setStatus]   = useState('')
  const [page,     setPage]     = useState(1)
  const [perPage,  setPerPage]  = useState(10)
  const [sortCol,  setSortCol]  = useState<keyof EnquiryRow>('createDate')
  const [sortDir,  setSortDir]  = useState<'asc' | 'desc'>('desc')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  function handleSort(col: keyof EnquiryRow) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  function handleClear() {
    setAgent(''); setClient(''); setStatus(''); setPage(1)
  }

  const filtered = useMemo(() => {
    return MOCK_DATA
      .filter(r => {
        if (agent  && r.agentName  !== agent)  return false
        if (client && r.clientName !== client) return false
        if (status && r.status     !== status) return false
        return true
      })
      .sort((a, b) => {
        const av = a[sortCol] as string
        const bv = b[sortCol] as string
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
  }, [agent, client, status, sortCol, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage   = Math.min(page, totalPages)
  const rows       = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  function buildPages(): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (safePage > 3) pages.push('...')
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i)
    if (safePage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const thClass = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none hover:text-gray-700"

  return (
    <div onClick={() => openMenu && setOpenMenu(null)}>
      <PageHeader
        title="Property Enquiry"
        subtitle="Incoming property enquiry forms"
      />

      {/* Filter Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => navigate('/forms/property-enquiry/create')}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Enquiry
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField label="Agent"  options={AGENTS}   value={agent}  onChange={v => { setAgent(v);  setPage(1) }} />
          <SelectField label="Client" options={CLIENTS}  value={client} onChange={v => { setClient(v); setPage(1) }} />
          <SelectField label="Status" options={STATUSES} value={status} onChange={v => { setStatus(v); setPage(1) }} />
        </div>
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            onClick={handleClear}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Per-page selector */}
        <div className="flex justify-end px-4 pt-3 pb-1">
          <div className="relative">
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
            >
              {PER_PAGE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className={thClass} onClick={() => handleSort('agentName')}>
                  Agent Details <SortIcon col="agentName" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th className={thClass} onClick={() => handleSort('clientName')}>
                  Client Name <SortIcon col="clientName" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th className={`${thClass} cursor-default`}>Client Contact</th>
                <th className={thClass} onClick={() => handleSort('createDate')}>
                  Create Date <SortIcon col="createDate" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th className={thClass} onClick={() => handleSort('updateDate')}>
                  Update Date <SortIcon col="updateDate" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th className={`${thClass} cursor-default`}>Status</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">No enquiries found</td>
                </tr>
              ) : rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{row.agentName}</td>
                  <td className="px-4 py-3 text-xs font-medium text-orange-500 hover:text-orange-600 cursor-pointer max-w-[220px]">
                    <span className="line-clamp-2">{row.clientName}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.clientContact}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.createDate}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.updateDate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={STATUS_VARIANT[row.status]}>{row.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === row.id && (
                      <div className="absolute right-8 top-2 z-10 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[130px]">
                        {['View', 'Edit', 'Delete'].map(action => (
                          <button
                            key={action}
                            onClick={() => setOpenMenu(null)}
                            className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Showing <span className="font-medium">{filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(safePage * perPage, filtered.length)}</span> of{' '}
            <span className="font-medium">{filtered.length}</span> results
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-2 py-1 text-xs rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >‹</button>
            {buildPages().map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="px-2 py-1 text-xs text-gray-400">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                    safePage === p
                      ? 'bg-orange-500 border-orange-500 text-white font-medium'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >{p}</button>
              )
            )}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-2 py-1 text-xs rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
