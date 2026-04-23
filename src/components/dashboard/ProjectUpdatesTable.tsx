import { ArrowUpRight } from 'lucide-react'
import DataTable from '../ui/DataTable'
import type { TableColumn } from '../../types'

export interface ProjectUpdate {
  id: string
  project: string
  created: number
  updated: number
  lastUpdated: string
  trend: 'up' | 'down' | 'flat'
}

const DEFAULT_UPDATES: ProjectUpdate[] = [
  { id: '1', project: 'Horizon Estate — Stage 3', created: 24, updated: 18, lastUpdated: '17 Apr 2026', trend: 'up' },
  { id: '2', project: 'Parkview Residences',       created: 31, updated: 27, lastUpdated: '16 Apr 2026', trend: 'up' },
  { id: '3', project: 'Coastal Sands',             created: 12, updated:  9, lastUpdated: '15 Apr 2026', trend: 'flat' },
  { id: '4', project: 'Greenfield Heights',         created: 19, updated: 14, lastUpdated: '14 Apr 2026', trend: 'up' },
  { id: '5', project: 'Metro Quarter — Tower B',    created:  8, updated:  3, lastUpdated: '12 Apr 2026', trend: 'down' },
]

const TREND_CLASSES = {
  up:   'text-green-600 bg-green-50',
  down: 'text-red-500 bg-red-50',
  flat: 'text-gray-500 bg-gray-100',
}
const TREND_LABELS = { up: '↑', down: '↓', flat: '—' }

interface Props {
  data?: ProjectUpdate[]
  title?: string
  subtitle?: string
  onViewAll?: () => void
  className?: string
  tableClassName?: string
}

export default function ProjectUpdatesTable({
  data = DEFAULT_UPDATES,
  title = 'Project Updates',
  subtitle = 'Lot creation & update activity',
  onViewAll,
  className = '',
  tableClassName = '',
}: Props) {
  const columns: TableColumn<ProjectUpdate>[] = [
    {
      key: 'project', label: 'Project',
      render: row => <span className="text-xs font-medium text-gray-800">{row.project}</span>,
    },
    {
      key: 'created', label: 'Created',
      render: row => <span className="text-xs text-gray-600">{row.created}</span>,
    },
    {
      key: 'updated', label: 'Updated',
      render: row => <span className="text-xs text-gray-600">{row.updated}</span>,
    },
    {
      key: 'trend', label: 'Trend',
      render: row => (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${TREND_CLASSES[row.trend]}`}>
          {TREND_LABELS[row.trend]}
        </span>
      ),
    },
    {
      key: 'lastUpdated', label: 'Last Updated',
      render: row => <span className="text-xs text-gray-400">{row.lastUpdated}</span>,
    },
  ]

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          All Projects <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
      <DataTable columns={columns} data={data} keyField="id" className={tableClassName} />
    </div>
  )
}
