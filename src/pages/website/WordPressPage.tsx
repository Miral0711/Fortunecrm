import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown as ChevronDownIcon } from 'lucide-react'
import SearchInput from '../../components/ui/SearchInput'
import StatusBadge from '../../components/ui/StatusBadge'
import type { BadgeVariant } from '../../types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface WPSite {
  id: string
  user: string
  theme: string
  title: string
  url: string
  status: BadgeVariant
  statusLabel: string
  usernameCreated: string
  passwordCreated: string
  createdOn: string
}

type SortKey = keyof WPSite
type SortDir = 'asc' | 'desc'

// ── Data ──────────────────────────────────────────────────────────────────────

const DATA: WPSite[] = [
  { id:'1',  user:'Jinaikumar Patel',      theme:'Metro', title:'Equity That Grow With You',                    url:'equitymaxx.myinvestment.properties',              status:'warning', statusLabel:'Initializing', usernameCreated:'',     passwordCreated:'',             createdOn:'25 Mar 2026 12:19 pm' },
  { id:'2',  user:'Chris Bockisch',        theme:'Luna',  title:'HPO',                                          url:'hpo.myinvestment.properties',                     status:'warning', statusLabel:'Initializing', usernameCreated:'',     passwordCreated:'',             createdOn:'24 Feb 2026 01:06 am' },
  { id:'3',  user:'Lorraine Hollitt',      theme:'West',  title:'Life Without Boundaries',                      url:'lwbcontent.myinvestment.properties',               status:'warning', statusLabel:'Initializing', usernameCreated:'',     passwordCreated:'',             createdOn:'14 Feb 2026 04:59 pm' },
  { id:'4',  user:'Sunil Roy',             theme:'Luna',  title:'Cookie Capital',                               url:'cookiecapital.com.au',                            status:'warning', statusLabel:'Initializing', usernameCreated:'',     passwordCreated:'',             createdOn:'11 Feb 2026 02:50 pm' },
  { id:'5',  user:'Manny Medel',           theme:'Aura',  title:"Connecting Investors to Australia's Best New Homes", url:'ogpg.myinvestment.properties',             status:'success', statusLabel:'Active',       usernameCreated:'info', passwordCreated:'F6ZeApyfrW4b', createdOn:'12 Oct 2025 02:46 pm' },
  { id:'6',  user:'Phillip Allen',         theme:'Metro', title:'Discover how your SUPER can help you into your new home!', url:'latitude-escapes.myinvestment.properties', status:'success', statusLabel:'Active', usernameCreated:'phil', passwordCreated:'nPPwmBGhMXJN', createdOn:'26 Sep 2025 01:16 pm' },
  { id:'7',  user:'Phillip Allen',         theme:'Luna',  title:'Smsf Community LPE',                           url:'smsfcommunitylpe.myinvestment.properties',        status:'success', statusLabel:'Active',       usernameCreated:'phil', passwordCreated:'1QNTMZrrx8QK', createdOn:'26 Sep 2025 12:07 pm' },
  { id:'8',  user:'Phillip Allen',         theme:'West',  title:'Latitude Property Escapes',                    url:'latitudepropertyescapes.myinvestment.properties', status:'success', statusLabel:'Active',       usernameCreated:'phil', passwordCreated:'mS7BqLhvIJQG', createdOn:'25 Sep 2025 10:22 pm' },
  { id:'9',  user:'Jagadesh Kandaswamy',   theme:'West',  title:'properties',                                   url:'jagpropertyadvisory.myinvestment.properties',     status:'success', statusLabel:'Active',       usernameCreated:'jag',  passwordCreated:'SokiKqqvKW0m', createdOn:'20 Sep 2025 09:25 pm' },
  { id:'10', user:'Jagadesh Kandaswamy',   theme:'West',  title:'Properties',                                   url:'jagpropertyadvisory.myinvestment.properties',     status:'success', statusLabel:'Active',       usernameCreated:'jag',  passwordCreated:'vrFXWnd84iZX', createdOn:'19 Sep 2025 05:36 pm' },
  { id:'11', user:'Sarah Mitchell',        theme:'Metro', title:'Wealth Creation Hub',                          url:'wealthcreationhub.myinvestment.properties',       status:'success', statusLabel:'Active',       usernameCreated:'sarah',passwordCreated:'Xk9mPqRt2vLw', createdOn:'15 Sep 2025 11:20 am' },
  { id:'12', user:'James Thornton',        theme:'Aura',  title:'Property Investment Store',                    url:'pistore.myinvestment.properties',                 status:'success', statusLabel:'Active',       usernameCreated:'james',passwordCreated:'Bv3nKjYp8sQz', createdOn:'10 Sep 2025 03:45 pm' },
  { id:'13', user:'Priya Sharma',          theme:'Luna',  title:'Smart Property Solutions',                     url:'smartproperty.myinvestment.properties',           status:'danger',  statusLabel:'Inactive',     usernameCreated:'priya',passwordCreated:'Nt7cWxHm4dRe', createdOn:'05 Sep 2025 09:10 am' },
  { id:'14', user:'David Chen',            theme:'West',  title:'Horizon Realty Group',                         url:'horizonrealty.myinvestment.properties',           status:'success', statusLabel:'Active',       usernameCreated:'david',passwordCreated:'Lq2fVbJk6pMn', createdOn:'01 Sep 2025 02:30 pm' },
  { id:'15', user:'Emma Wilson',           theme:'Metro', title:'First Home Buyers Guide',                      url:'firsthomebuyers.myinvestment.properties',         status:'warning', statusLabel:'Initializing', usernameCreated:'',     passwordCreated:'',             createdOn:'28 Aug 2025 07:55 am' },
  { id:'16', user:'Liam Nguyen',           theme:'Aura',  title:'Duplex Investment Network',                    url:'duplexnetwork.myinvestment.properties',           status:'success', statusLabel:'Active',       usernameCreated:'liam', passwordCreated:'Wr5hCyUo9tAx', createdOn:'22 Aug 2025 04:18 pm' },
  { id:'17', user:'Olivia Park',           theme:'Luna',  title:'SMSF Property Experts',                        url:'smsfexperts.myinvestment.properties',             status:'success', statusLabel:'Active',       usernameCreated:'olivia',passwordCreated:'Zd8gNqBl1kSv', createdOn:'18 Aug 2025 10:40 am' },
  { id:'18', user:'Noah Williams',         theme:'West',  title:'Capital Growth Properties',                    url:'capitalgrowth.myinvestment.properties',           status:'danger',  statusLabel:'Inactive',     usernameCreated:'noah', passwordCreated:'Fy4jMwEp7rTu', createdOn:'12 Aug 2025 01:25 pm' },
  { id:'19', user:'Ava Johnson',           theme:'Metro', title:'Altitude Homes',                               url:'altitudehomes.myinvestment.properties',           status:'success', statusLabel:'Active',       usernameCreated:'ava',  passwordCreated:'Hc6kOzDn3mQi', createdOn:'08 Aug 2025 08:50 am' },
  { id:'20', user:'Ethan Brown',           theme:'Aura',  title:'Gallery Group Investments',                    url:'gallerygroup.myinvestment.properties',            status:'success', statusLabel:'Active',       usernameCreated:'ethan',passwordCreated:'Jp9lRxGf5wYb', createdOn:'03 Aug 2025 03:15 pm' },
]

const TOTAL = 126
const PER_PAGE_OPTS = [10, 25, 50]

// ── Sort icon ─────────────────────────────────────────────────────────────────

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span className="inline-flex flex-col ml-1 opacity-30"><ChevronUp className="w-2.5 h-2.5 -mb-1" /><ChevronDownIcon className="w-2.5 h-2.5" /></span>
  return sortDir === 'asc'
    ? <ChevronUp className="w-3 h-3 ml-1 text-orange-500" />
    : <ChevronDownIcon className="w-3 h-3 ml-1 text-orange-500" />
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WordPressPage() {
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [perPage,  setPerPage]  = useState(10)
  const [sortKey,  setSortKey]  = useState<SortKey>('createdOn')
  const [sortDir,  setSortDir]  = useState<SortDir>('desc')

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return DATA.filter(r =>
      !q ||
      r.user.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.url.toLowerCase().includes(q) ||
      r.theme.toLowerCase().includes(q)
    ).sort((a, b) => {
      const av = String(a[sortKey]), bv = String(b[sortKey])
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [search, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  // Pagination numbers
  const pageNums: (number | '...')[] = []
  if (totalPages <= 13) {
    for (let i = 1; i <= totalPages; i++) pageNums.push(i)
  } else {
    for (let i = 1; i <= 11; i++) pageNums.push(i)
    pageNums.push('...', totalPages)
  }

  const cols: { key: SortKey; label: string; className?: string }[] = [
    { key: 'user',            label: 'User' },
    { key: 'theme',           label: 'Theme' },
    { key: 'title',           label: 'Title' },
    { key: 'url',             label: 'URL' },
    { key: 'statusLabel',     label: 'Status' },
    { key: 'usernameCreated', label: 'Username When Created' },
    { key: 'passwordCreated', label: 'Password When Created' },
    { key: 'createdOn',       label: 'Created On' },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <SearchInput
            value={search}
            onChange={v => { setSearch(v); setPage(1) }}
            placeholder="Search..."
            className="w-56"
          />
          <div className="relative">
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              className="appearance-none pl-2.5 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer bg-white"
            >
              {PER_PAGE_OPTS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40">
                {cols.map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-orange-500 transition-colors select-none"
                  >
                    <span className="flex items-center">
                      {col.label}
                      <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={cols.length} className="py-16 text-center text-xs text-gray-400">
                    No results found.
                  </td>
                </tr>
              ) : paged.map(row => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors">
                  {/* User */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-xs font-medium text-orange-500 hover:underline">{row.user}</button>
                  </td>
                  {/* Theme */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{row.theme}</span>
                  </td>
                  {/* Title */}
                  <td className="px-4 py-3 max-w-[180px]">
                    <span className="text-xs text-gray-700 leading-snug">{row.title}</span>
                  </td>
                  {/* URL */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a
                      href={`https://${row.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-500 hover:underline"
                    >
                      {row.url}
                    </a>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge variant={row.status}>{row.statusLabel}</StatusBadge>
                  </td>
                  {/* Username */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-500">{row.usernameCreated || '—'}</span>
                  </td>
                  {/* Password */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-500 font-mono">{row.passwordCreated || '—'}</span>
                  </td>
                  {/* Created On */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-500">{row.createdOn}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {pageNums.map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">…</span>
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
            )}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Showing{' '}
            <span className="font-semibold text-gray-700">{(page - 1) * perPage + 1}</span> to{' '}
            <span className="font-semibold text-gray-700">{Math.min(page * perPage, filtered.length)}</span> of{' '}
            <span className="font-semibold text-gray-700">{TOTAL}</span> results
          </p>
        </div>
      </div>
    </div>
  )
}
