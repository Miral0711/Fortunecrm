import {
  Play, FileText, ClipboardList, BookOpen, Monitor, ExternalLink, Clock,
  Lock, RefreshCw, CheckSquare, Pencil, Target, Globe, Handshake,
  User, Palette, Bot, Settings, BarChart2, Home, Building2, CreditCard,
  DollarSign, Clipboard, Mail, BookMarked, Rocket, Library,
} from 'lucide-react'
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

const THUMBNAIL_ICON: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  '1':  { icon: <Lock className="w-8 h-8" />,          bg: 'bg-blue-50',    color: 'text-blue-400'    },
  '2':  { icon: <Monitor className="w-8 h-8" />,       bg: 'bg-orange-50',  color: 'text-orange-400'  },
  '3':  { icon: <Home className="w-8 h-8" />,          bg: 'bg-green-50',   color: 'text-green-400'   },
  '4':  { icon: <Clipboard className="w-8 h-8" />,     bg: 'bg-yellow-50',  color: 'text-yellow-500'  },
  '5':  { icon: <DollarSign className="w-8 h-8" />,    bg: 'bg-emerald-50', color: 'text-emerald-400' },
  '6':  { icon: <FileText className="w-8 h-8" />,      bg: 'bg-gray-50',    color: 'text-gray-400'    },
  '7':  { icon: <Globe className="w-8 h-8" />,         bg: 'bg-sky-50',     color: 'text-sky-400'     },
  '8':  { icon: <Pencil className="w-8 h-8" />,        bg: 'bg-violet-50',  color: 'text-violet-400'  },
  '9':  { icon: <Target className="w-8 h-8" />,        bg: 'bg-red-50',     color: 'text-red-400'     },
  '10': { icon: <User className="w-8 h-8" />,          bg: 'bg-indigo-50',  color: 'text-indigo-400'  },
  '11': { icon: <Handshake className="w-8 h-8" />,     bg: 'bg-teal-50',    color: 'text-teal-400'    },
  '12': { icon: <RefreshCw className="w-8 h-8" />,     bg: 'bg-cyan-50',    color: 'text-cyan-400'    },
  '13': { icon: <CheckSquare className="w-8 h-8" />,   bg: 'bg-green-50',   color: 'text-green-400'   },
  '14': { icon: <FileText className="w-8 h-8" />,      bg: 'bg-gray-50',    color: 'text-gray-400'    },
  '15': { icon: <Mail className="w-8 h-8" />,          bg: 'bg-orange-50',  color: 'text-orange-400'  },
  '16': { icon: <Palette className="w-8 h-8" />,       bg: 'bg-pink-50',    color: 'text-pink-400'    },
  '17': { icon: <Bot className="w-8 h-8" />,           bg: 'bg-purple-50',  color: 'text-purple-400'  },
  '18': { icon: <Settings className="w-8 h-8" />,      bg: 'bg-gray-50',    color: 'text-gray-400'    },
  '19': { icon: <ClipboardList className="w-8 h-8" />, bg: 'bg-yellow-50',  color: 'text-yellow-500'  },
  '20': { icon: <CreditCard className="w-8 h-8" />,    bg: 'bg-blue-50',    color: 'text-blue-400'    },
  '21': { icon: <Lock className="w-8 h-8" />,          bg: 'bg-slate-50',   color: 'text-slate-400'   },
  '22': { icon: <Building2 className="w-8 h-8" />,     bg: 'bg-orange-50',  color: 'text-orange-400'  },
  '23': { icon: <BarChart2 className="w-8 h-8" />,     bg: 'bg-blue-50',    color: 'text-blue-400'    },
  '24': { icon: <BookMarked className="w-8 h-8" />,    bg: 'bg-purple-50',  color: 'text-purple-400'  },
  '25': { icon: <Library className="w-8 h-8" />,       bg: 'bg-indigo-50',  color: 'text-indigo-400'  },
  '26': { icon: <Rocket className="w-8 h-8" />,        bg: 'bg-orange-50',  color: 'text-orange-400'  },
}

const DEFAULT_THUMB = { icon: <FileText className="w-8 h-8" />, bg: 'bg-gray-50', color: 'text-gray-300' }

export default function ResourceCard({ resource, featured = false, onWatch }: Props) {
  const meta    = TYPE_META[resource.type]
  const isVideo = resource.type === 'video'
  const thumb   = THUMBNAIL_ICON[resource.id] ?? DEFAULT_THUMB

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
        'relative flex items-center justify-center flex-shrink-0 rounded-t-xl',
        thumb.bg,
        featured ? 'h-36' : 'h-28'
      )}>
        <span className={clsx(thumb.color, 'opacity-70')}>{thumb.icon}</span>

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
