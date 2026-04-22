import { useState, useRef, useEffect } from 'react'
import { Search, X, Globe, Lock, Users, CheckCircle2, ChevronDown, Info } from 'lucide-react'
import clsx from 'clsx'

// ── Mock data ─────────────────────────────────────────────────────────────────

interface Agent {
  id: string
  name: string
  email: string
  initials: string
  role: string
}

const ALL_AGENTS: Agent[] = [
  { id: 'a1', name: 'Sarah Mitchell',  email: 'sarah@example.com',  initials: 'SM', role: 'Sales Agent' },
  { id: 'a2', name: 'James Thornton',  email: 'james@example.com',  initials: 'JT', role: 'BDM' },
  { id: 'a3', name: 'Priya Sharma',    email: 'priya@example.com',  initials: 'PS', role: 'Sales Agent' },
  { id: 'a4', name: 'David Chen',      email: 'david@example.com',  initials: 'DC', role: 'Affiliate' },
  { id: 'a5', name: 'Emma Wilson',     email: 'emma@example.com',   initials: 'EW', role: 'Sales Agent' },
  { id: 'a6', name: 'Liam Nguyen',     email: 'liam@example.com',   initials: 'LN', role: 'Referral Partner' },
  { id: 'a7', name: 'Chloe Adams',     email: 'chloe@example.com',  initials: 'CA', role: 'BDM' },
  { id: 'a8', name: 'Marcus Lee',      email: 'marcus@example.com', initials: 'ML', role: 'Sales Agent' },
  { id: 'a9', name: 'Natalie Brown',   email: 'natalie@example.com',initials: 'NB', role: 'Affiliate' },
  { id: 'a10',name: 'Oliver Scott',    email: 'oliver@example.com', initials: 'OS', role: 'Sales Agent' },
]

const PACKAGES = [
  { id: 'p1', name: 'Horizon Estate – 4BR Package' },
  { id: 'p2', name: 'Solaris Estate – Premium Package' },
  { id: 'p3', name: 'Parkview Rise – Starter Package' },
]

// ── Agent tag ─────────────────────────────────────────────────────────────────

function AgentTag({ agent, onRemove }: { agent: Agent; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-1.5 pr-1 py-1 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-medium rounded-lg">
      <span className="w-4 h-4 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-[9px] font-bold shrink-0">
        {agent.initials}
      </span>
      {agent.name}
      <button
        onClick={onRemove}
        className="ml-0.5 text-orange-400 hover:text-orange-600 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

// ── Agent selector dropdown ───────────────────────────────────────────────────

function AgentSelector({
  selected, onChange,
}: { selected: Agent[]; onChange: (agents: Agent[]) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedIds = new Set(selected.map(a => a.id))
  const filtered = ALL_AGENTS.filter(a =>
    !selectedIds.has(a.id) &&
    (a.name.toLowerCase().includes(query.toLowerCase()) ||
     a.role.toLowerCase().includes(query.toLowerCase()))
  )

  const add = (agent: Agent) => {
    onChange([...selected, agent])
    setQuery('')
  }
  const remove = (id: string) => onChange(selected.filter(a => a.id !== id))

  return (
    <div ref={ref} className="relative">
      {/* Input trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm bg-white border rounded-xl transition-colors text-left',
          open ? 'border-orange-400 ring-2 ring-orange-400/20' : 'border-gray-200 hover:border-gray-300'
        )}
      >
        <div className="flex items-center gap-1.5 text-gray-500">
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span>{selected.length === 0 ? 'Search agents…' : `${selected.length} agent${selected.length !== 1 ? 's' : ''} selected`}</span>
        </div>
        <ChevronDown className={clsx('w-3.5 h-3.5 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 top-full mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name or role…"
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:bg-white transition"
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-xs text-gray-400 text-center">No agents found</p>
            ) : filtered.map(agent => (
              <button
                key={agent.id}
                type="button"
                onClick={() => add(agent)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-orange-50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-semibold text-orange-600 shrink-0">
                  {agent.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{agent.name}</p>
                  <p className="text-xs text-gray-400 truncate">{agent.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Distribution card ─────────────────────────────────────────────────────────

function DistributionCard({ pkg }: { pkg: { id: string; name: string } }) {
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([])
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">{pkg.name}</h3>
      </div>

      <div className="p-5 space-y-5 flex-1 flex flex-col">
        {/* Visibility toggle */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Visibility</p>
          <div className="flex gap-3">
            {/* Public */}
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={clsx(
                'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left',
                visibility === 'public'
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              )}
            >
              <div className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                visibility === 'public' ? 'bg-orange-100' : 'bg-gray-100'
              )}>
                <Globe className={clsx('w-4 h-4', visibility === 'public' ? 'text-orange-500' : 'text-gray-400')} />
              </div>
              <div>
                <p className={clsx('text-sm font-medium', visibility === 'public' ? 'text-orange-700' : 'text-gray-600')}>
                  Public
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Visible to all agents</p>
              </div>
              {visibility === 'public' && (
                <CheckCircle2 className="w-4 h-4 text-orange-500 ml-auto shrink-0" />
              )}
            </button>

            {/* Private */}
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={clsx(
                'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left',
                visibility === 'private'
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              )}
            >
              <div className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                visibility === 'private' ? 'bg-orange-100' : 'bg-gray-100'
              )}>
                <Lock className={clsx('w-4 h-4', visibility === 'private' ? 'text-orange-500' : 'text-gray-400')} />
              </div>
              <div>
                <p className={clsx('text-sm font-medium', visibility === 'private' ? 'text-orange-700' : 'text-gray-600')}>
                  Private
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Restricted to selected agents</p>
              </div>
              {visibility === 'private' && (
                <CheckCircle2 className="w-4 h-4 text-orange-500 ml-auto shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Agent selector — only when private */}
        {visibility === 'private' && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Agents</p>
            <AgentSelector selected={selectedAgents} onChange={setSelectedAgents} />

            {/* Selected agent tags */}
            {selectedAgents.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedAgents.map(agent => (
                  <AgentTag
                    key={agent.id}
                    agent={agent}
                    onRemove={() => setSelectedAgents(prev => prev.filter(a => a.id !== agent.id))}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info panel */}
        <div className={clsx(
          'flex items-start gap-2.5 px-4 py-3 rounded-xl text-xs',
          visibility === 'public'
            ? 'bg-blue-50 text-blue-700'
            : selectedAgents.length > 0
              ? 'bg-orange-50 text-orange-700'
              : 'bg-gray-50 text-gray-500'
        )}>
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {visibility === 'public'
            ? `This package is visible to all ${ALL_AGENTS.length} agents.`
            : selectedAgents.length > 0
              ? `This package is visible to ${selectedAgents.length} agent${selectedAgents.length !== 1 ? 's' : ''}.`
              : 'No agents selected. Package will not be visible to anyone.'
          }
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end pt-1 mt-auto">
          <button
            onClick={handleSave}
            className={clsx(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
              saved
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            )}
          >
            {saved ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved</>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DistributionPage() {
  return (
    <div className="w-full px-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Distribution Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Control which agents can see each package listing.
        </p>
      </div>

      {/* Summary strip */}
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 px-5 py-4 w-full">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          <Users className="w-4.5 h-4.5 text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">{ALL_AGENTS.length} agents in your network</p>
          <p className="text-xs text-gray-400 mt-0.5">Manage visibility per package below</p>
        </div>
      </div>

      {/* Package cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PACKAGES.map(pkg => (
          <DistributionCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  )
}
