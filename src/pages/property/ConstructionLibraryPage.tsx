import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Search, SlidersHorizontal, ArrowUpDown, Plus, Download,
  ChevronDown, X, CheckSquare, Square, Trash2, Package,
  Pencil, Tag, DollarSign, LayoutGrid, List,
  Home, Building2, Layers, Building,
  PaintBucket, Mountain, ChefHat, Sun, Wind, Droplets,
  Receipt, TrendingUp, Footprints, Blocks, Gem,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../../components/layout/PageHeader'
import Drawer from '../../components/ui/Drawer'
import StatusBadge from '../../components/ui/StatusBadge'
import { useSelection } from '../../hooks/useSelection'
import {
  LIBRARY_ITEMS, TAB_LABELS, CATEGORY_OPTIONS,
  type LibraryItem, type LibraryTab, type LibraryCategory, type LibraryIconName,
} from '../../data/constructionLibraryData'

const ICON_MAP: Record<LibraryIconName, LucideIcon> = {
  Home, Building2, LayoutGrid, Layers, Building,
  PaintBucket, Blocks, Mountain, Gem,
  ChefHat, Footprints, Sun, Wind, Droplets,
  Receipt, TrendingUp, Tag,
}

function LibraryIcon({ name, className }: { name: LibraryIconName; className?: string }) {
  const Icon = ICON_MAP[name]
  return Icon ? <Icon className={className} /> : null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
}

const STATUS_VARIANT = {
  active: 'success',
  draft: 'warning',
  archived: 'neutral',
} as const

const SORT_OPTIONS = [
  { value: 'name-asc',   label: 'Name A–Z' },
  { value: 'name-desc',  label: 'Name Z–A' },
  { value: 'price-asc',  label: 'Price Low–High' },
  { value: 'price-desc', label: 'Price High–Low' },
  { value: 'updated',    label: 'Recently Updated' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: LibraryTab; onChange: (t: LibraryTab) => void }) {
  return (
    <div className="flex gap-1 border-b border-gray-100">
      {(Object.keys(TAB_LABELS) as LibraryTab[]).map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={clsx(
            'px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap',
            active === tab
              ? 'text-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {TAB_LABELS[tab]}
          {active === tab && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t" />
          )}
        </button>
      ))}
    </div>
  )
}

function CategoryBadge({ category }: { category: LibraryCategory }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-200">
      {category}
    </span>
  )
}

interface SelectDropdownProps {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
  icon?: React.ReactNode
}

function SelectDropdown({ label, value, options, onChange, icon }: SelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors',
          value !== 'all'
            ? 'border-orange-300 bg-orange-50 text-orange-700'
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
        )}
      >
        {icon}
        <span>{selected?.label ?? label}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[140px]">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={clsx(
                'w-full text-left px-3 py-1.5 text-xs transition-colors',
                opt.value === value
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Item Card ─────────────────────────────────────────────────────────────────

interface ItemCardProps {
  item: LibraryItem
  selected: boolean
  onSelect: (id: string) => void
  onClick: (item: LibraryItem) => void
}

function ItemCard({ item, selected, onSelect, onClick }: ItemCardProps) {
  return (
    <div
      onClick={() => onClick(item)}
      className={clsx(
        'group bg-white rounded-xl border transition-all duration-150 cursor-pointer flex flex-col overflow-hidden',
        selected
          ? 'border-orange-300 ring-1 ring-orange-200'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-28 bg-gradient-to-br from-gray-50 to-orange-50/30 flex items-center justify-center flex-shrink-0">
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', item.iconBg)}>
          <LibraryIcon name={item.icon} className={clsx('w-6 h-6', item.iconColor)} />
        </div>
        {/* Checkbox */}
        <button
          onClick={e => { e.stopPropagation(); onSelect(item.id) }}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {selected
            ? <CheckSquare className="w-4 h-4 text-orange-500" />
            : <Square className="w-4 h-4 text-gray-400" />
          }
        </button>
        <StatusBadge
          variant={STATUS_VARIANT[item.status]}
          className="absolute top-2 right-2 !text-[10px]"
        >
          {item.status}
        </StatusBadge>
      </div>

      {/* Body */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1.5 flex-1">
        <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{item.name}</p>
        <CategoryBadge category={item.category} />
        <p className="text-xs text-gray-400 mt-auto">{item.sku}</p>
        <p className="text-sm font-semibold text-gray-800">{fmt(item.price)}</p>
      </div>
    </div>
  )
}

// ── Table Row ─────────────────────────────────────────────────────────────────

interface TableRowProps {
  item: LibraryItem
  selected: boolean
  onSelect: (id: string) => void
  onClick: (item: LibraryItem) => void
}

function TableRow({ item, selected, onSelect, onClick }: TableRowProps) {
  return (
    <tr
      onClick={() => onClick(item)}
      className={clsx(
        'border-b border-gray-50 transition-colors cursor-pointer',
        selected ? 'bg-orange-50/50' : 'hover:bg-gray-50/60'
      )}
    >
      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
        <button onClick={() => onSelect(item.id)}>
          {selected
            ? <CheckSquare className="w-4 h-4 text-orange-500" />
            : <Square className="w-4 h-4 text-gray-300 hover:text-gray-500" />
          }
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg)}>
            <LibraryIcon name={item.icon} className={clsx('w-4 h-4', item.iconColor)} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-400">{item.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><CategoryBadge category={item.category} /></td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{fmt(item.price)}</td>
      <td className="px-4 py-3">
        <StatusBadge variant={STATUS_VARIANT[item.status]}>{item.status}</StatusBadge>
      </td>
      <td className="px-4 py-3 text-xs text-gray-400">{item.updatedAt}</td>
    </tr>
  )
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────

function DetailDrawer({ item, onClose }: { item: LibraryItem | null; onClose: () => void }) {
  return (
    <Drawer open={!!item} onClose={onClose} title={item?.name ?? ''} side="right">
      {item && (
        <div className="space-y-5">
          {/* Media preview */}
          <div className="h-36 bg-gradient-to-br from-gray-50 to-orange-50/40 rounded-xl flex items-center justify-center">
            <div className={clsx('w-16 h-16 rounded-2xl flex items-center justify-center', item.iconBg)}>
              <LibraryIcon name={item.icon} className={clsx('w-8 h-8', item.iconColor)} />
            </div>
          </div>

          {/* Meta */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={item.category} />
              <StatusBadge variant={STATUS_VARIANT[item.status]}>{item.status}</StatusBadge>
            </div>
            <p className="text-xs text-gray-400">{item.sku}{item.supplier ? ` · ${item.supplier}` : ''}</p>
          </div>

          {/* Price */}
          <div className="bg-orange-50 rounded-lg px-4 py-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-500" />
            <span className="text-lg font-semibold text-orange-700">{fmt(item.price)}</span>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</p>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Specs */}
          {item.specs && Object.keys(item.specs).length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specifications</p>
              <div className="space-y-1.5">
                {Object.entries(item.specs).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <span className="text-xs text-gray-500">{k}</span>
                    <span className="text-xs font-medium text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]">
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
              <Package className="w-4 h-4" />
              Use in Package
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors">
              <Pencil className="w-4 h-4" />
              Edit Item
            </button>
          </div>
        </div>
      )}
    </Drawer>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ConstructionLibraryPage() {
  const [activeTab, setActiveTab]       = useState<LibraryTab>('designs')
  const [search, setSearch]             = useState('')
  const [category, setCategory]         = useState('all')
  const [status, setStatus]             = useState('all')
  const [sort, setSort]                 = useState('name-asc')
  const [viewMode, setViewMode]         = useState<'grid' | 'list'>('grid')
  const { selected, toggle: toggleSelect, clear: clearSelected, selectAll, count: selectedCount, hasAny: someSelected } = useSelection<string>()
  const [drawerItem, setDrawerItem]     = useState<LibraryItem | null>(null)

  // Reset filters on tab change
  useEffect(() => {
    setCategory('all')
    setSearch('')
    clearSelected()
  }, [activeTab, clearSelected])

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORY_OPTIONS[activeTab].map(c => ({ value: c, label: c })),
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
  ]

  const filtered = useMemo(() => {
    let list = LIBRARY_ITEMS.filter(i => i.tab === activeTab)
    if (category !== 'all') list = list.filter(i => i.category === category)
    if (status !== 'all')   list = list.filter(i => i.status === status)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.tags.some(t => t.includes(q))
      )
    }
    if (sort === 'name-asc')   list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name-desc')  list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'updated')    list = [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return list
  }, [activeTab, category, status, search, sort])

  function toggleAll() {
    if (selected.size === filtered.length) {
      clearSelected()
    } else {
      selectAll(filtered.map(i => i.id))
    }
  }

  const allSelected = filtered.length > 0 && selected.size === filtered.length

  return (
    <>
      <div className="space-y-4">
        <PageHeader
          title="Construction Library"
          subtitle="Manage designs, facades, inclusions and pricing rules"
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Property', path: '/property/projects' }, { label: 'Construction Library' }]}
          actions={
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Item
            </button>
          }
        />

        {/* Card wrapper */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          {/* Tabs */}
          <div className="px-4 pt-1">
            <TabBar active={activeTab} onChange={t => setActiveTab(t)} />
          </div>

          {/* Controls */}
          <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${TAB_LABELS[activeTab].toLowerCase()}…`}
                className="pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="h-4 w-px bg-gray-200" />

            {/* Filters */}
            <SelectDropdown
              label="Category"
              value={category}
              options={categoryOptions}
              onChange={setCategory}
              icon={<SlidersHorizontal className="w-3 h-3" />}
            />
            <SelectDropdown
              label="Status"
              value={status}
              options={statusOptions}
              onChange={setStatus}
            />

            <div className="ml-auto flex items-center gap-2">
              {/* Sort */}
              <SelectDropdown
                label="Sort"
                value={sort}
                options={SORT_OPTIONS}
                onChange={setSort}
                icon={<ArrowUpDown className="w-3 h-3" />}
              />

              {/* View toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx('p-1.5 transition-colors', viewMode === 'grid' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:text-gray-600')}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx('p-1.5 transition-colors', viewMode === 'list' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:text-gray-600')}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 hover:border-gray-300 text-xs rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>

          {/* Bulk action bar */}
          {someSelected && (
            <div className="px-4 py-2 bg-orange-50 border-b border-orange-100 flex items-center gap-3">
              <span className="text-xs font-medium text-orange-700">{selected.size} selected</span>
              <div className="h-3 w-px bg-orange-200" />
              <button className="flex items-center gap-1 text-xs text-orange-700 hover:text-orange-900 transition-colors">
                <Package className="w-3.5 h-3.5" />
                Add to Package
              </button>
              <button className="flex items-center gap-1 text-xs text-orange-700 hover:text-orange-900 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export Selected
              </button>
              <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors ml-auto">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
              <button onClick={clearSelected} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            {filtered.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600">No items found</p>
                <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(''); setCategory('all'); setStatus('all') }}
                  className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filtered.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selected.has(item.id)}
                    onSelect={toggleSelect}
                    onClick={setDrawerItem}
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-2.5 w-10">
                        <button onClick={toggleAll}>
                          {allSelected
                            ? <CheckSquare className="w-4 h-4 text-orange-500" />
                            : <Square className="w-4 h-4 text-gray-300" />
                          }
                        </button>
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Item</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(item => (
                      <TableRow
                        key={item.id}
                        item={item}
                        selected={selected.has(item.id)}
                        onSelect={toggleSelect}
                        onClick={setDrawerItem}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer count */}
          <div className="px-4 py-2.5 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-400">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
            {someSelected && (
              <span className="text-xs text-orange-600 font-medium">{selectedCount} selected</span>
            )}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <DetailDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
    </>
  )
}
