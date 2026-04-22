import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import PageHeader from '../layout/PageHeader'
import FilterBar from '../ui/FilterBar'
import DataTable from '../ui/DataTable'
import StatusBadge from '../ui/StatusBadge'
import Pagination from '../ui/Pagination'
import Avatar from '../ui/Avatar'
import StatCard from '../dashboard/StatCard'
import type { TableColumn, BadgeVariant } from '../../types'
import type { LucideIcon } from 'lucide-react'

export interface AccountRow {
  id: string
  name: string
  email: string
  phone: string
  status: BadgeVariant
  statusLabel: string
  joined: string
  extra?: string
  extraLabel?: string
}

interface Stat {
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down'
  icon?: LucideIcon
  iconBg?: string
  iconColor?: string
}

interface Props {
  title: string
  subtitle?: string
  data: AccountRow[]
  stats?: Stat[]
  extraColumn?: { label: string; key: 'extra' }
}

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Inactive', value: 'Inactive' },
]

const PER_PAGE = 8

export default function AccountsTable({ title, subtitle, data, stats, extraColumn }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = data.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || r.statusLabel === filter
    return matchSearch && matchFilter
  })

  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const columns: TableColumn<AccountRow>[] = [
    {
      key: 'name', label: 'Name', render: row => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-gray-800 text-sm leading-none">{row.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'phone', label: 'Phone' },
    ...(extraColumn ? [{
      key: extraColumn.key as keyof AccountRow,
      label: extraColumn.label,
      render: (row: AccountRow) => <span className="text-xs text-gray-600">{row.extra ?? '—'}</span>
    }] : []),
    {
      key: 'status', label: 'Status', render: row => (
        <StatusBadge variant={row.status}>{row.statusLabel}</StatusBadge>
      )
    },
    { key: 'joined', label: 'Joined' },
    {
      key: 'id', label: '', render: () => (
        <button className="text-xs text-orange-500 font-medium hover:underline">View</button>
      ), className: 'text-right'
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ label: 'Accounts' }, { label: title }]}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add {title.replace(/s$/, '')}
            </button>
          </div>
        }
      />

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <FilterBar
            search={search}
            onSearch={v => { setSearch(v); setPage(1) }}
            filters={STATUS_FILTERS}
            activeFilter={filter}
            onFilter={v => { setFilter(v); setPage(1) }}
          />
        </div>
        <DataTable columns={columns} data={paged} keyField="id" />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      </div>
    </div>
  )
}
