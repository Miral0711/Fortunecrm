import { Play, FileText, ClipboardList, BookOpen, Monitor, ExternalLink, Clock } from 'lucide-react'
import clsx from 'clsx'
import type { Resource } from '../../data/resourcesData'

interface Props {
  resource: Resource
  featured?: boolean
  onWatch: (resource: Resource) => void
}

const TYPE_META: Record<Resource['type'], { icon: React.ReactNode; color: string; label: string }> = {
  video:        { icon: <Monitor className="w-3 h-3" />,       color: 'text-orange-500 bg-orange-50',  label: 'Video'  },
  document:     { icon: <FileText className="w-3 h-3" />,      color: 'text-blue-500 bg-blue-50',      label: 'Doc'    },
  form:         { icon: <ClipboardList className="w-3 h-3" />, color: 'text-green-500 bg-green-50',    label: 'Form'   },
  ebook:        { icon: <BookOpen className="w-3 h-3" />,      color: 'text-purple-500 bg-purple-50',  label: 'Ebook'  },
  presentation: { icon: <FileText className="w-3 h-3" />,      color: 'text-teal-500 bg-teal-50',      label: 'Slides' },
}

export default function ResourceCard({ resource, featured = false, onWatch }: Props) {
  const meta    = TYPE_META[resource.type]
  const isVideo = resource.type === 'video'

  return (
    <div
      className={clsx(
        'group bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden cursor-pointer',
        'hover:border-gray-200 hover:shadow-md transition-all duration-200',
        featured && 'shadow-sm'
      )}
      onClick={() => onWatch(resource)}
    >
      {/* Thumbnail */}
      <div className={clsx(
        'relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50/40 flex-shrink-0',
        featured ? 'h-36' : 'h-28'
      )}>
        <span className={clsx('select-none', featured ? 'text-5xl' : 'text-4xl')}>
          {resource.thumbnail ?? '📄'}
        </span>

        {/* Play overlay — videos only */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div className="w-9 h-9 rounded-full bg-orange-500/90 flex items-center justify-center shadow-md">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Type pill */}
        <span className={clsx(
          'absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium',
          meta.color
        )}>
          {meta.icon}
          {meta.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-2">
        <h3 className={clsx(
          'font-medium text-gray-800 leading-snug line-clamp-2',
          featured ? 'text-sm' : 'text-xs'
        )}>
          {resource.title}
        </h3>

        {/* Duration + level */}
        <div className="flex items-center justify-between mt-auto">
          {resource.duration ? (
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="w-3 h-3" />
              {resource.duration}
            </span>
          ) : <span />}
          <span className={clsx(
            'text-[10px] font-medium px-1.5 py-0.5 rounded',
            resource.level === 'Beginner'     && 'bg-green-50 text-green-600',
            resource.level === 'Intermediate' && 'bg-yellow-50 text-yellow-600',
            resource.level === 'Advanced'     && 'bg-blue-50 text-blue-600',
          )}>
            {resource.level}
          </span>
        </div>

        {/* Action button */}
        <button
          onClick={e => { e.stopPropagation(); onWatch(resource) }}
          className={clsx(
            'w-full flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-colors',
            featured ? 'py-2' : 'py-1.5',
            'bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white'
          )}
        >
          {isVideo ? (
            <><Play className="w-3 h-3 fill-current" /> Watch</>
          ) : resource.isUrl ? (
            <><ExternalLink className="w-3 h-3" /> Open</>
          ) : (
            <><FileText className="w-3 h-3" /> Open</>
          )}
        </button>
      </div>
    </div>
  )
}
