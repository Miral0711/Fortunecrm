import clsx from 'clsx'
import { FileText, FileImage, FileSpreadsheet, File, Eye, Download, CheckSquare, Square } from 'lucide-react'

export type DocType = 'pdf' | 'image' | 'docx' | 'xlsx'

export interface DocumentCardData {
  id: string
  name: string
  type: DocType
  size: string
  tag: string
  tagColor?: string
  usageInfo?: string
  inherited?: boolean
  thumbnailUrl?: string
}

interface Props {
  doc: DocumentCardData
  selected?: boolean
  onSelect?: () => void
  onPreview?: () => void
  variant?: 'grid' | 'list'
  isLast?: boolean
}

export function FileIcon({ type, className }: { type: DocType; className?: string }) {
  const cls = clsx('shrink-0', className)
  if (type === 'pdf')   return <FileText className={clsx(cls, 'text-red-400')} />
  if (type === 'image') return <FileImage className={clsx(cls, 'text-blue-400')} />
  if (type === 'xlsx')  return <FileSpreadsheet className={clsx(cls, 'text-green-500')} />
  return <File className={clsx(cls, 'text-gray-400')} />
}

export default function DocumentCard({ doc, selected, onSelect, onPreview, variant = 'grid', isLast }: Props) {
  if (variant === 'list') {
    return (
      <div
        className={clsx(
          'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group',
          !isLast && 'border-b border-gray-50',
          selected && 'bg-orange-50/50'
        )}
        onClick={onPreview}
      >
        <button onClick={e => { e.stopPropagation(); onSelect?.() }} className="shrink-0">
          {selected
            ? <CheckSquare className="w-4 h-4 text-orange-500" />
            : <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
          }
        </button>
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          {doc.thumbnailUrl
            ? <img src={doc.thumbnailUrl} alt="" className="w-full h-full object-cover" />
            : <FileIcon type={doc.type} className="w-4 h-4" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">{doc.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {doc.usageInfo && <p className="text-xs text-gray-400">{doc.usageInfo}</p>}
            {doc.inherited && <span className="text-xs text-gray-400 italic">· Inherited from Project</span>}
          </div>
        </div>
        {doc.tagColor && (
          <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full shrink-0', doc.tagColor)}>
            {doc.tag}
          </span>
        )}
        <span className="text-xs text-gray-400 w-16 text-right shrink-0 hidden sm:block">{doc.size}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={e => { e.stopPropagation(); onPreview?.() }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(
      'group relative bg-white rounded-xl border transition-all cursor-pointer',
      selected ? 'border-orange-300 ring-2 ring-orange-200' : 'border-gray-100 hover:border-orange-100 hover:shadow-sm'
    )}>
      <button
        onClick={e => { e.stopPropagation(); onSelect?.() }}
        className={clsx('absolute top-2 left-2 z-10 transition-opacity', selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
      >
        {selected
          ? <CheckSquare className="w-4 h-4 text-orange-500" />
          : <Square className="w-4 h-4 text-gray-400" />
        }
      </button>
      <button
        onClick={e => { e.stopPropagation(); onPreview?.() }}
        className="absolute top-2 right-2 z-10 p-1 rounded-md bg-white/80 text-gray-400 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
      <div className="h-28 rounded-t-xl overflow-hidden bg-gray-50 flex items-center justify-center" onClick={onPreview}>
        {doc.thumbnailUrl
          ? <img src={doc.thumbnailUrl} alt={doc.name} className="w-full h-full object-cover" />
          : <FileIcon type={doc.type} className="w-10 h-10 opacity-30" />
        }
      </div>
      <div className="p-3" onClick={onPreview}>
        <p className="text-xs font-medium text-gray-700 truncate leading-snug mb-1">{doc.name}</p>
        {doc.usageInfo && <p className="text-[10px] text-gray-400 mb-2">{doc.usageInfo}</p>}
        {doc.inherited && <p className="text-[10px] text-gray-400 italic mb-1.5">Inherited from Project</p>}
        {doc.tagColor && (
          <span className={clsx('inline-block text-[10px] font-medium px-2 py-0.5 rounded-full', doc.tagColor)}>
            {doc.tag}
          </span>
        )}
      </div>
    </div>
  )
}
