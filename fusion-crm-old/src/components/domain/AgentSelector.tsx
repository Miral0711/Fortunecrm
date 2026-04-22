import { useState, useRef, useEffect } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

export interface Agent {
  id: string
  name: string
  email?: string
  initials: string
  role?: string
}

interface AgentTagProps {
  agent: Agent
  onRemove: () => void
}

export function AgentTag({ agent, onRemove }: AgentTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-1.5 pr-1 py-1 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-medium rounded-lg">
      <span className="w-4 h-4 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-[9px] font-bold shrink-0">
        {agent.initials}
      </span>
      {agent.name}
      <button onClick={onRemove} className="ml-0.5 text-orange-400 hover:text-orange-600 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

interface Props {
  agents: Agent[]
  selected: Agent[]
  onChange: (agents: Agent[]) => void
  placeholder?: string
}

export default function AgentSelector({ agents, selected, onChange, placeholder = 'Search agents…' }: Props) {
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
  const filtered = agents.filter(a =>
    !selectedIds.has(a.id) &&
    (a.name.toLowerCase().includes(query.toLowerCase()) ||
     (a.role ?? '').toLowerCase().includes(query.toLowerCase()))
  )

  const add = (agent: Agent) => { onChange([...selected, agent]); setQuery('') }
  const remove = (id: string) => onChange(selected.filter(a => a.id !== id))

  return (
    <div ref={ref} className="relative">
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
          <span>{selected.length === 0 ? placeholder : `${selected.length} agent${selected.length !== 1 ? 's' : ''} selected`}</span>
        </div>
        <ChevronDown className={clsx('w-3.5 h-3.5 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

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
                  {agent.role && <p className="text-xs text-gray-400 truncate">{agent.role}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(agent => (
            <AgentTag key={agent.id} agent={agent} onRemove={() => remove(agent.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
