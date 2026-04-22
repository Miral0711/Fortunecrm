import { useState, useRef, useCallback } from 'react'
import {
  Upload, Search, Trash2, Download, Grid3X3, List,
  ChevronRight, ChevronDown, FolderOpen, Folder,
  X, Square, Filter,
} from 'lucide-react'
import clsx from 'clsx'
import { documents, folders, tagColors } from '../data/documentsData'
import type { DocFile, DocFolder, DocTag } from '../data/documentsData'
import DocumentCard, { FileIcon } from '../components/domain/DocumentCard'
import { useSelection } from '../hooks/useSelection'

// ── helpers ──────────────────────────────────────────────────────────────────

const ALL_TAGS: DocTag[] = ['Contract', 'Brochure', 'Floor Plan', 'Legal', 'Finance', 'Marketing', 'Report']

// ── Folder tree ───────────────────────────────────────────────────────────────

function FolderTree({
  selected, onSelect,
}: { selected: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState<Set<string>>(new Set(['projects']))

  const toggle = (id: string) => setOpen(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const roots = folders.filter(f => !f.parentId)

  const renderFolder = (f: DocFolder) => {
    const children = folders.filter(c => c.parentId === f.id)
    const hasChildren = children.length > 0
    const isOpen = open.has(f.id)
    const isSelected = selected === f.id

    return (
      <div key={f.id}>
        <button
          onClick={() => { onSelect(f.id); if (hasChildren) toggle(f.id) }}
          className={clsx(
            'w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors group',
            isSelected
              ? 'bg-orange-50 text-orange-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          )}
        >
          {hasChildren ? (
            isOpen
              ? <ChevronDown className="w-3 h-3 shrink-0 text-gray-400" />
              : <ChevronRight className="w-3 h-3 shrink-0 text-gray-400" />
          ) : (
            <span className="w-3 shrink-0" />
          )}
          {isSelected
            ? <FolderOpen className="w-4 h-4 shrink-0 text-orange-500" />
            : <Folder className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-gray-500" />
          }
          <span className="flex-1 text-left truncate">{f.label}</span>
          <span className={clsx(
            'text-xs tabular-nums',
            isSelected ? 'text-orange-400' : 'text-gray-400'
          )}>{f.count}</span>
        </button>

        {hasChildren && isOpen && (
          <div className="ml-4 border-l border-gray-100 pl-2 mt-0.5 space-y-0.5">
            {children.map(renderFolder)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-0.5">
      {roots.map(renderFolder)}
    </div>
  )
}

// ── Preview modal ─────────────────────────────────────────────────────────────

function PreviewModal({ file, onClose }: { file: DocFile; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <FileIcon type={file.type} className="w-5 h-5" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-400">{file.size} · {file.uploadedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="bg-gray-50 flex items-center justify-center" style={{ minHeight: 340 }}>
          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              className="max-h-80 max-w-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <FileIcon type={file.type} className="w-12 h-12 opacity-30" />
              <p className="text-sm text-gray-400">Preview not available</p>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors">
                <Download className="w-4 h-4" /> Download to view
              </button>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="px-5 py-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 border-t border-gray-100">
          <span><span className="text-gray-400">Uploaded by</span> {file.uploadedBy}</span>
          <span><span className="text-gray-400">Size</span> {file.size}</span>
          <span><span className="text-gray-400">Usage</span> {file.usageInfo}</span>
          {file.inherited && (
            <span className="text-gray-400 italic">Inherited from Project</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState<DocTag | 'All'>('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { selected: selectedIds, toggle: toggleSelect, selectAll, clear: clearSelection, hasAny } = useSelection<string>()
  const [previewFile, setPreviewFile] = useState<DocFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedNames, setUploadedNames] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter files
  const filtered = documents.filter(doc => {
    if (selectedFolder !== 'all') {
      const childIds = folders.filter(f => f.parentId === selectedFolder).map(f => f.id)
      const validIds = [selectedFolder, ...childIds]
      if (!validIds.includes(doc.folderId)) return false
    }
    if (tagFilter !== 'All' && doc.tag !== tagFilter) return false
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Selection
  const handleSelectAll = () => selectAll(filtered.map(f => f.id))

  // Drag & drop
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(true)
  }, [])
  const onDragLeave = useCallback(() => setIsDragging(false), [])
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadedNames(prev => [...prev, ...files.map(f => f.name)])
  }, [])
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setUploadedNames(prev => [...prev, ...files.map(f => f.name)])
  }

  const folderLabel = folders.find(f => f.id === selectedFolder)?.label ?? 'All Files'

  return (
    <div className="flex h-full gap-0 -m-5">
      {/* ── Left: folder tree ── */}
      <aside className="w-52 shrink-0 border-r border-gray-100 bg-white flex flex-col">
        <div className="px-4 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Folders</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <FolderTree selected={selectedFolder} onSelect={setSelectedFolder} />
        </nav>
      </aside>

      {/* ── Right: file area ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white shrink-0 flex-wrap">
          {/* Breadcrumb */}
          <p className="text-sm font-semibold text-gray-700 mr-2">{folderLabel}</p>

          {/* Search */}
          <div className="relative flex-1 min-w-40 max-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition"
            />
          </div>

          {/* Tag filter */}
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <select
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value as DocTag | 'All')}
              className="pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 appearance-none cursor-pointer"
            >
              <option value="All">All Tags</option>
              {ALL_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {/* View toggle */}
            <button
              onClick={() => setViewMode('grid')}
              className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-orange-50 text-orange-500' : 'text-gray-400 hover:bg-gray-100')}
            ><Grid3X3 className="w-4 h-4" /></button>
            <button
              onClick={() => setViewMode('list')}
              className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'list' ? 'bg-orange-50 text-orange-500' : 'text-gray-400 hover:bg-gray-100')}
            ><List className="w-4 h-4" /></button>

            {/* Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 ml-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5" /> Upload
            </button>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={onFileInput} />
          </div>
        </div>

        {/* Bulk action bar */}
        {hasAny && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 border-b border-orange-100 shrink-0">
            <span className="text-sm font-medium text-orange-700">{selectedIds.size} selected</span>
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
            <button onClick={clearSelection} className="ml-auto text-xs text-gray-400 hover:text-gray-600">
              Clear
            </button>
          </div>
        )}

        {/* Select all row */}
        {filtered.length > 0 && !hasAny && (
          <div className="flex items-center gap-2 px-5 py-2 border-b border-gray-50 bg-white shrink-0">
            <button onClick={handleSelectAll} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              <Square className="w-3.5 h-3.5" /> Select all
            </button>
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} file{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Drop zone + file area */}
        <div
          className={clsx(
            'flex-1 overflow-y-auto p-5 transition-colors',
            isDragging && 'bg-orange-50/60 ring-2 ring-inset ring-orange-300'
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="bg-white border-2 border-dashed border-orange-400 rounded-2xl px-10 py-8 text-center shadow-lg">
                <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-600">Drop files to upload</p>
              </div>
            </div>
          )}

          {/* Newly uploaded names */}
          {uploadedNames.length > 0 && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-700">
              Uploaded: {uploadedNames.join(', ')}
              <button onClick={() => setUploadedNames([])} className="ml-2 text-green-500 hover:text-green-700">×</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FolderOpen className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 font-medium">No files found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different folder or filter</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map(doc => (
                <DocumentCard
                  key={doc.id}
                  doc={{ ...doc, tagColor: tagColors[doc.tag] }}
                  selected={selectedIds.has(doc.id)}
                  onSelect={() => toggleSelect(doc.id)}
                  onPreview={() => setPreviewFile(doc)}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {filtered.map((doc, i) => (
                <DocumentCard
                  key={doc.id}
                  doc={{ ...doc, tagColor: tagColors[doc.tag] }}
                  selected={selectedIds.has(doc.id)}
                  onSelect={() => toggleSelect(doc.id)}
                  onPreview={() => setPreviewFile(doc)}
                  variant="list"
                  isLast={i === filtered.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview modal */}
      {previewFile && (
        <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  )
}
