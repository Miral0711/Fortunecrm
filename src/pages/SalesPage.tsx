import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Plus, ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Sale {
  id: string
  status: string
  client: string
  project: string
  developer: string
  lot: string
  commsIn: number
  piabComms: number
  affiliate: string
  affiliateComms: number
  subscriber: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const SALES: Sale[] = [
  { id:'1',  status:'Reserved',        client:'Shanaka Samadattha Wijesuriya', project:'Parkview On Central',                    developer:'David Armitage',   lot:'17',  commsIn:38500, piabComms:3850, affiliate:'–', affiliateComms:0, subscriber:'Dean Arnold' },
  { id:'2',  status:'Reserved',        client:'Shanaka Samadattha Wijesuriya', project:'Vineyard Street',                        developer:'Aleysha Roberts',  lot:'34A', commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Dean Arnold' },
  { id:'3',  status:'Under Contract',  client:'Toni-Robyn Percy',              project:'Voltaire Estate',                        developer:'William Nash',     lot:'26',  commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Bernice Cooper' },
  { id:'4',  status:'Under Contract',  client:'Tony Raymond Lawless',          project:'Silkwood Enclave',                       developer:'David Armitage',   lot:'21',  commsIn:38500, piabComms:3850, affiliate:'–', affiliateComms:0, subscriber:'Chris Wood' },
  { id:'5',  status:'Under Contract',  client:'Hendrik Stephanus Bosshoff',    project:'Arbourwood Estate',                      developer:'Will Carnavas',    lot:'352', commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Fred Thomasian' },
  { id:'6',  status:'Unconditional',   client:'Jobandeep Singh',               project:'The Nursery Estate',                     developer:'David Armitage',   lot:'53',  commsIn:38500, piabComms:3850, affiliate:'–', affiliateComms:0, subscriber:'Sukhbir Sodhi' },
  { id:'7',  status:'Settled',         client:'Vibha Jaypalsinh Bhati',        project:'Irving Domain',                          developer:'Matt Low',         lot:'107', commsIn:21340, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Jagadesh Kandaswamy' },
  { id:'8',  status:'Unconditional',   client:'Mark Anthony Dearley',          project:'Rooming – Harlowe Estate w/ 5-Year Rent Guarantee', developer:'Nic Carmody', lot:'804', commsIn:33000, piabComms:6600, affiliate:'–', affiliateComms:0, subscriber:'Peter Desbrowe-Annear' },
  { id:'9',  status:'Under Contract',  client:'Sivakumar Sadhasivam',          project:'Co-Living Aberdeen Estate w/ 5-Year Rental Guarantee', developer:'William Nash', lot:'39', commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Jagadesh Kandaswamy' },
  { id:'10', status:'Under Contract',  client:'Deborah Smith',                 project:'Goranya Estate',                         developer:'Nick Hagilassis',  lot:'7',   commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Jean De La Croix' },
  { id:'11', status:'Reserved',        client:'Amelia Johnson',                project:'Harlow Estate',                          developer:'David Armitage',   lot:'12',  commsIn:35000, piabComms:3500, affiliate:'–', affiliateComms:0, subscriber:'Dean Arnold' },
  { id:'12', status:'Settled',         client:'Marcus Chen',                   project:'Kinship',                                developer:'William Nash',     lot:'88',  commsIn:29000, piabComms:2900, affiliate:'–', affiliateComms:0, subscriber:'Chris Wood' },
  { id:'13', status:'Under Contract',  client:'Priya Sharma',                  project:'Hamlet Estate',                          developer:'Aleysha Roberts',  lot:'45',  commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Fred Thomasian' },
  { id:'14', status:'Unconditional',   client:'James O\'Brien',                project:'Ripley Central',                         developer:'Nic Carmody',      lot:'22',  commsIn:38500, piabComms:3850, affiliate:'–', affiliateComms:0, subscriber:'Sukhbir Sodhi' },
  { id:'15', status:'Under Contract',  client:'Fatima Al-Hassan',              project:'Springvale Rise',                        developer:'Matt Low',         lot:'61',  commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Bernice Cooper' },
  { id:'16', status:'Reserved',        client:'Liam Nguyen',                   project:'Parkview',                               developer:'Nick Hagilassis',  lot:'9',   commsIn:36000, piabComms:3600, affiliate:'–', affiliateComms:0, subscriber:'Jean De La Croix' },
  { id:'17', status:'Settled',         client:'Sophie Williams',               project:'Coastal Sands',                          developer:'Will Carnavas',    lot:'33',  commsIn:22000, piabComms:2200, affiliate:'–', affiliateComms:0, subscriber:'Peter Desbrowe-Annear' },
  { id:'18', status:'Under Contract',  client:'Raj Patel',                     project:'Metro Quarter',                          developer:'David Armitage',   lot:'14',  commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Jagadesh Kandaswamy' },
  { id:'19', status:'Unconditional',   client:'Emma Thompson',                 project:'Greenfield Heights',                     developer:'William Nash',     lot:'77',  commsIn:38500, piabComms:3850, affiliate:'–', affiliateComms:0, subscriber:'Dean Arnold' },
  { id:'20', status:'Under Contract',  client:'Carlos Mendez',                 project:'Horizon Estate',                         developer:'Aleysha Roberts',  lot:'5',   commsIn:33000, piabComms:3300, affiliate:'–', affiliateComms:0, subscriber:'Chris Wood' },
]

const TOTAL_RESULTS = 208
const TOTAL_PAGES   = 21
const PER_PAGE_OPTS = ['10', '25', '50', '100']

const ALL_COLUMNS = [
  { key: 'status',        label: 'STATUS' },
  { key: 'client',        label: 'CLIENT' },
  { key: 'project',       label: 'PROJECT' },
  { key: 'developer',     label: 'DEVELOPER' },
  { key: 'lot',           label: 'LOT' },
  { key: 'commsIn',       label: 'COMMS IN' },
  { key: 'piabComms',     label: 'PIAB COMMS' },
  { key: 'affiliate',     label: 'AFFILIATE' },
  { key: 'affiliateComms',label: 'AFFILIATE COMMS' },
  { key: 'subscriber',    label: 'SUBSCRIBER' },
  { key: 'bdm',           label: 'BDM' },
  { key: 'salesAgent',    label: 'SALES AGENT' },
  { key: 'referralPartner',label:'REFERRAL PARTNER' },
  { key: 'depositPaid',   label: 'DEPOSIT PAID' },
  { key: 'contractDate',  label: 'CONTRACT DATE' },
  { key: 'settlementDate',label: 'SETTLEMENT DATE' },
  { key: 'notes',         label: 'NOTES' },
]

const STATUS_STYLES: Record<string, string> = {
  'Reserved':       'text-orange-500 font-semibold',
  'Under Contract': 'text-orange-500 font-semibold',
  'Unconditional':  'text-orange-500 font-semibold',
  'Settled':        'text-orange-500 font-semibold',
  'Crashed':        'text-red-500 font-semibold',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StyledSelect({
  label, value, onChange, options, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SalesPage() {
  const [status,          setStatus]          = useState('')
  const [showCrashed,     setShowCrashed]     = useState(false)
  const [subscriber,      setSubscriber]      = useState('')
  const [salesAgent,      setSalesAgent]      = useState('')
  const [referralPartner, setReferralPartner] = useState('')
  const [affiliate,       setAffiliate]       = useState('')
  const [bdm,             setBdm]             = useState('')

  const [page,            setPage]            = useState(1)
  const [perPage,         setPerPage]         = useState('10')
  const [selectedCols,    _setSelectedCols]   = useState(17)
  const [showColPicker,   setShowColPicker]   = useState(false)
  const [sortKey,         setSortKey]         = useState<keyof Sale | ''>('')
  const [sortDir,         setSortDir]         = useState<'asc'|'desc'>('asc')
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (!target?.closest('[data-sales-action-root]')) {
        setOpenActionMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const filtered = useMemo(() => {
    return SALES.filter(s => {
      if (status && s.status !== status) return false
      if (!showCrashed && s.status === 'Crashed') return false
      if (subscriber && s.subscriber !== subscriber) return false
      if (salesAgent) return false // placeholder
      if (referralPartner) return false
      if (affiliate) return false
      if (bdm) return false
      return true
    })
  }, [status, showCrashed, subscriber, salesAgent, referralPartner, affiliate, bdm])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof Sale]
      const bv = b[sortKey as keyof Sale]
      if (av === bv) return 0
      const cmp = String(av) < String(bv) ? -1 : 1
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const paged = sorted.slice((page - 1) * Number(perPage), page * Number(perPage))

  function toggleSort(key: keyof Sale) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function clearFilters() {
    setStatus(''); setShowCrashed(false); setSubscriber('')
    setSalesAgent(''); setReferralPartner(''); setAffiliate(''); setBdm('')
  }

  const pages: (number | '...')[] = [1,2,3,4,5,6,7,8,9,10,'...',TOTAL_PAGES-1,TOTAL_PAGES]
  const startResult = (page - 1) * Number(perPage) + 1
  const endResult   = Math.min(page * Number(perPage), TOTAL_RESULTS)

  const uniqueStatuses    = ['Reserved','Under Contract','Unconditional','Settled','Crashed']
  const uniqueSubscribers = [...new Set(SALES.map(s => s.subscriber))]
  const uniqueDevelopers  = [...new Set(SALES.map(s => s.developer))]

  return (
    <PageWrapper>
      {/* ── Filter Panel ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-5 py-4">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          {/* Row 1 */}
          <StyledSelect label="Status" value={status} onChange={setStatus}
            options={uniqueStatuses} placeholder="Select Status" />

          {/* Show Crashed toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider invisible">Toggle</label>
            <div className="flex items-center gap-3 py-2">
              <button
                onClick={() => setShowCrashed(v => !v)}
                className={`relative inline-flex items-center rounded-full transition-colors duration-200 ${showCrashed ? 'bg-orange-500' : 'bg-gray-200'}`}
                style={{ height: '20px', width: '36px' }}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${showCrashed ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs text-gray-600 font-medium">Show Crashed?</span>
            </div>
          </div>

          <StyledSelect label="Subscriber" value={subscriber} onChange={setSubscriber}
            options={uniqueSubscribers} placeholder="Select Subscriber" />

          {/* Row 2 */}
          <StyledSelect label="Sales Agent" value={salesAgent} onChange={setSalesAgent}
            options={uniqueDevelopers} placeholder="Select Sales Agent" />

          <StyledSelect label="Referral Partner" value={referralPartner} onChange={setReferralPartner}
            options={[]} placeholder="Select Referral Partner" />

          <StyledSelect label="Affiliate" value={affiliate} onChange={setAffiliate}
            options={[]} placeholder="Select Affiliate" />

          {/* Row 3 */}
          <StyledSelect label="BDM" value={bdm} onChange={setBdm}
            options={[]} placeholder="Select BDM" />

          {/* Form actions aligned right */}
          <div className="col-start-3 flex items-end justify-end gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add
            </button>
            <button
              onClick={clearFilters}
              className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ── Table Panel ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-end gap-3 px-4 py-3 border-b border-gray-100">
          <span className="text-xs text-gray-500">Selected Columns:</span>
          <div className="relative">
            <button
              onClick={() => setShowColPicker(v => !v)}
              className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 transition-colors"
            >
              {selectedCols} Selected
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {showColPicker && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2 max-h-72 overflow-y-auto">
                {ALL_COLUMNS.map(col => (
                  <label key={col.key} className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                    <input type="checkbox" defaultChecked className="accent-orange-500 w-3.5 h-3.5" />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <select
              value={perPage}
              onChange={e => { setPerPage(e.target.value); setPage(1) }}
              className="appearance-none pl-2.5 pr-6 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
            >
              {PER_PAGE_OPTS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-8 px-3 py-3" />
                {[
                  { key: 'status' as keyof Sale,   label: 'STATUS' },
                  { key: 'client' as keyof Sale,   label: 'CLIENT' },
                  { key: 'project' as keyof Sale,  label: 'PROJECT' },
                  { key: 'developer' as keyof Sale,label: 'DEVELOPER' },
                  { key: 'lot' as keyof Sale,      label: 'LOT' },
                  { key: 'commsIn' as keyof Sale,  label: 'COMMS IN' },
                  { key: 'piabComms' as keyof Sale,label: 'PIAB COMMS' },
                  { key: 'affiliate' as keyof Sale,label: 'AFFILIATE' },
                  { key: 'affiliateComms' as keyof Sale, label: 'AFFILIATE COMMS' },
                  { key: 'subscriber' as keyof Sale, label: 'SUBSCRIBER' },
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="px-3 py-3 text-left font-semibold text-[10px] text-gray-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 select-none group"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown className={`w-3 h-3 transition-colors ${sortKey === col.key ? 'text-orange-500' : 'text-gray-300 group-hover:text-gray-400'}`} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((sale, i) => (
                <tr
                  key={sale.id}
                  className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}
                >
                  <td className="px-3 py-3 relative">
                    <div className="relative inline-block" data-sales-action-root>
                      <button
                        onClick={() => setOpenActionMenuId(current => current === sale.id ? null : sale.id)}
                        className="text-gray-300 hover:text-gray-500 transition-colors"
                        aria-haspopup="menu"
                        aria-expanded={openActionMenuId === sale.id}
                        title="Row actions"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {openActionMenuId === sale.id && (
                        <div className="absolute left-0 top-full z-30 mt-1.5 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                          <button
                            onClick={() => setOpenActionMenuId(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </button>
                          <button
                            onClick={() => setOpenActionMenuId(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => setOpenActionMenuId(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={STATUS_STYLES[sale.status] ?? 'text-gray-600 font-medium'}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-orange-500 font-medium max-w-[140px]">
                    <span className="line-clamp-2 leading-tight">{sale.client}</span>
                  </td>
                  <td className="px-3 py-3 text-orange-500 font-medium max-w-[140px]">
                    <span className="line-clamp-2 leading-tight">{sale.project}</span>
                  </td>
                  <td className="px-3 py-3 text-orange-500 font-medium whitespace-nowrap">{sale.developer}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{sale.lot}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{sale.commsIn.toFixed(2)}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{sale.piabComms}</td>
                  <td className="px-3 py-3 text-gray-400 whitespace-nowrap">{sale.affiliate}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{sale.affiliateComms.toFixed(2)}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap max-w-[120px]">
                    <span className="line-clamp-2 leading-tight">{sale.subscriber}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {pages.map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                    page === p ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
              disabled={page === TOTAL_PAGES}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{startResult}</span> to <span className="font-medium">{endResult}</span> of <span className="font-medium">{TOTAL_RESULTS}</span> results
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
