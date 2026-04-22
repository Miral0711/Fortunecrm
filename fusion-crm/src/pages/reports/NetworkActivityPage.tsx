import { useState } from 'react'
import {
  ChevronLeft, ChevronRight, MapPin, Calendar, User,
  Tag, Eye, TrendingUp, Activity, MoreHorizontal,
} from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/ui/StatusBadge'

// ── Types ─────────────────────────────────────────────────────────────────────

interface MetaRow {
  label: string
  value: string
  highlight?: boolean
}

interface ImageBlock {
  type: 'portrait' | 'plan' | 'landscape'
  alt: string
  caption?: string
  gradient: string
}

interface ContentSection {
  id: string
  heading: string
  subheading?: string
  meta: MetaRow[]
  body: string[]
  images: ImageBlock[]
  tags: string[]
  date: string
  author: string
  views: number
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const LOREM_SHORT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

const LOREM_LONG = `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`

const LOREM_DENSE = `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`

const SECTIONS: ContentSection[] = [
  {
    id: 's1',
    heading: 'Harlow Estate — Stage 3 Network Activity',
    subheading: 'Tarneit, VIC · House and Land Package',
    meta: [
      { label: 'Project',      value: 'Harlow Estate Stage 3' },
      { label: 'Location',     value: 'Tarneit, VIC 3029' },
      { label: 'Category',     value: 'House and Land', highlight: true },
      { label: 'Status',       value: 'Active' },
      { label: 'Lead Source',  value: 'PHP Website' },
      { label: 'Assigned BDM', value: 'David Chen' },
      { label: 'Created',      value: '17 Apr 2026' },
      { label: 'Last Updated', value: '17 Apr 2026 · 09:42 AM' },
    ],
    body: [LOREM_LONG, LOREM_DENSE],
    images: [
      { type: 'portrait',  alt: 'Property front elevation', caption: 'Front elevation — Lot 37', gradient: 'from-slate-300 to-slate-400' },
      { type: 'plan',      alt: 'Floor plan',               caption: 'Ground floor plan — 214m²',  gradient: 'from-stone-200 to-stone-300' },
      { type: 'landscape', alt: 'Estate aerial view',       caption: 'Harlow Estate aerial — Stage 3 release', gradient: 'from-sky-200 to-sky-300' },
    ],
    tags: ['HIGH CAPITAL GROWTH', 'SMSF', 'House and Land'],
    date: '17 Apr 2026',
    author: 'Admin',
    views: 284,
  },
  {
    id: 's2',
    heading: 'Hamlet Estate — Lot 8 Unit 2 Activity Log',
    subheading: 'Diggers Rest, VIC · Duplex Package',
    meta: [
      { label: 'Project',      value: 'Hamlet Estate' },
      { label: 'Location',     value: 'Diggers Rest, VIC 3427' },
      { label: 'Category',     value: 'Duplex', highlight: true },
      { label: 'Status',       value: 'Active' },
      { label: 'Lead Source',  value: 'API' },
      { label: 'Assigned BDM', value: 'Sarah Mitchell' },
      { label: 'Created',      value: '16 Apr 2026' },
      { label: 'Last Updated', value: '17 Apr 2026 · 08:15 AM' },
    ],
    body: [LOREM_SHORT, LOREM_LONG, LOREM_DENSE],
    images: [
      { type: 'portrait',  alt: 'Duplex front',   caption: 'Duplex elevation — Lot 8 Unit 2', gradient: 'from-amber-200 to-amber-300' },
      { type: 'plan',      alt: 'Duplex plan',    caption: 'Upper floor plan — 180m²',         gradient: 'from-orange-100 to-orange-200' },
      { type: 'landscape', alt: 'Street view',    caption: 'Slacks Street streetscape',        gradient: 'from-teal-200 to-teal-300' },
    ],
    tags: ['SMSF', 'Duplex', 'Dual Income'],
    date: '16 Apr 2026',
    author: 'James Thornton',
    views: 197,
  },
  {
    id: 's3',
    heading: 'Kinship — The Springs Estate Enquiry Report',
    subheading: 'Clyde North, VIC · House and Land',
    meta: [
      { label: 'Project',      value: 'Kinship — The Springs Estate' },
      { label: 'Location',     value: 'Clyde North, VIC 3978' },
      { label: 'Category',     value: 'House and Land', highlight: true },
      { label: 'Status',       value: 'Pending' },
      { label: 'Lead Source',  value: 'Wordpress Website' },
      { label: 'Assigned BDM', value: 'Priya Sharma' },
      { label: 'Created',      value: '15 Apr 2026' },
      { label: 'Last Updated', value: '16 Apr 2026 · 03:30 PM' },
    ],
    body: [LOREM_DENSE, LOREM_SHORT],
    images: [
      { type: 'portrait',  alt: 'Home facade',    caption: 'Lot 175 — The Springs Estate',    gradient: 'from-green-200 to-green-300' },
      { type: 'plan',      alt: 'Site plan',      caption: 'Site plan — 200m² home area',     gradient: 'from-indigo-100 to-indigo-200' },
      { type: 'landscape', alt: 'Estate view',    caption: 'The Springs Estate — Clyde North', gradient: 'from-sky-100 to-sky-200' },
    ],
    tags: ['HIGH CAPITAL GROWTH', 'House and Land'],
    date: '15 Apr 2026',
    author: 'Priya Sharma',
    views: 143,
  },
]

const SUMMARY_STATS = [
  { label: 'Total Events',    value: '1,284', icon: Activity,   color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Unique Users',    value: '347',   icon: User,       color: 'text-blue-500',   bg: 'bg-blue-50'   },
  { label: 'Page Views',      value: '8,902', icon: Eye,        color: 'text-green-500',  bg: 'bg-green-50'  },
  { label: 'Avg. Engagement', value: '4m 32s',icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
]

const TAG_COLORS: Record<string, string> = {
  'HIGH CAPITAL GROWTH': 'bg-orange-100 text-orange-700',
  'SMSF':                'bg-green-100 text-green-700',
  'Duplex':              'bg-amber-100 text-amber-700',
  'House and Land':      'bg-blue-100 text-blue-700',
  'Dual Income':         'bg-teal-100 text-teal-700',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SummaryStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      {SUMMARY_STATS.map(s => {
        const Icon = s.icon
        return (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
              <Icon className={`w-4.5 h-4.5 ${s.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MetaTable({ rows }: { rows: MetaRow[] }) {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden mb-5">
      {rows.map((row, i) => (
        <div key={row.label} className={`flex items-start gap-4 px-4 py-2 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
          <span className="w-32 shrink-0 text-[11px] font-semibold text-gray-400 uppercase tracking-wide pt-0.5">{row.label}</span>
          <span className={`text-xs flex-1 ${row.highlight ? 'text-orange-600 font-semibold' : 'text-gray-700'}`}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}

function InlineImageBlock({ img }: { img: ImageBlock }) {
  if (img.type === 'portrait') {
    return (
      <div className="float-right ml-5 mb-3 w-36 shrink-0">
        <div className={`w-36 h-44 rounded-lg bg-gradient-to-br ${img.gradient} flex items-end justify-center overflow-hidden border border-gray-100`}>
          <div className="w-full h-2/3 flex items-center justify-center opacity-30">
            <svg viewBox="0 0 80 60" className="w-14 h-10 fill-gray-600"><polygon points="40,5 75,30 65,30 65,55 15,55 15,30 5,30" /></svg>
          </div>
        </div>
        {img.caption && <p className="text-[10px] text-gray-400 mt-1 text-center leading-snug">{img.caption}</p>}
      </div>
    )
  }
  if (img.type === 'plan') {
    return (
      <div className="my-4 mx-auto max-w-sm">
        <div className={`w-full h-36 rounded-lg bg-gradient-to-br ${img.gradient} border border-gray-100 flex items-center justify-center`}>
          {/* Floor plan grid lines */}
          <svg viewBox="0 0 200 100" className="w-48 h-24 opacity-40">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="#374151" strokeWidth="2"/>
            <rect x="110" y="10" width="80" height="80" fill="none" stroke="#374151" strokeWidth="2"/>
            <line x1="10" y1="50" x2="90" y2="50" stroke="#374151" strokeWidth="1"/>
            <line x1="50" y1="10" x2="50" y2="90" stroke="#374151" strokeWidth="1"/>
            <line x1="110" y1="50" x2="190" y2="50" stroke="#374151" strokeWidth="1"/>
            <rect x="20" y="20" width="25" height="20" fill="#374151" opacity="0.2"/>
            <rect x="120" y="20" width="25" height="20" fill="#374151" opacity="0.2"/>
          </svg>
        </div>
        {img.caption && <p className="text-[10px] text-gray-400 mt-1.5 text-center">{img.caption}</p>}
      </div>
    )
  }
  // landscape
  return (
    <div className="my-4">
      <div className={`w-full h-44 rounded-lg bg-gradient-to-br ${img.gradient} border border-gray-100 flex items-center justify-center overflow-hidden`}>
        <div className="opacity-20">
          <svg viewBox="0 0 300 100" className="w-64 h-20 fill-gray-600">
            <rect x="0" y="60" width="300" height="40" />
            <polygon points="50,60 80,20 110,60" />
            <polygon points="130,60 170,10 210,60" />
            <polygon points="220,60 250,30 280,60" />
            <rect x="55" y="40" width="15" height="20" fill="white" opacity="0.4"/>
            <rect x="140" y="35" width="20" height="25" fill="white" opacity="0.4"/>
          </svg>
        </div>
      </div>
      {img.caption && <p className="text-[10px] text-gray-400 mt-1.5 text-center">{img.caption}</p>}
    </div>
  )
}

function ContentSectionBlock({ section }: { section: ContentSection }) {
  return (
    <div className="pb-8 mb-8 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
      {/* Section heading */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800">{section.heading}</h3>
          {section.subheading && (
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />{section.subheading}
            </p>
          )}
        </div>
        <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 shrink-0">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4 flex-wrap">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{section.date}</span>
        <span className="flex items-center gap-1"><User className="w-3 h-3" />{section.author}</span>
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{section.views} views</span>
        <div className="flex items-center gap-1 flex-wrap">
          <Tag className="w-3 h-3" />
          {section.tags.map(t => (
            <span key={t} className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${TAG_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Metadata table */}
      <MetaTable rows={section.meta} />

      {/* Body + images */}
      <div className="text-xs text-gray-600 leading-relaxed space-y-3 clearfix">
        {/* Portrait image floated right with first paragraph */}
        {section.images.filter(i => i.type === 'portrait').map(img => (
          <InlineImageBlock key={img.alt} img={img} />
        ))}
        {section.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Plan + landscape images below */}
      {section.images.filter(i => i.type !== 'portrait').map(img => (
        <InlineImageBlock key={img.alt} img={img} />
      ))}
    </div>
  )
}

function PaginationFooter({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mt-5">
      <p className="text-xs text-gray-500">
        Showing record <span className="font-semibold text-gray-700">{page}</span> of{' '}
        <span className="font-semibold text-gray-700">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        {Array.from({ length: Math.min(total, 7) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onChange(p)}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${page === p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            {p}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}
          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="success">Live</StatusBadge>
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
          Export Report
        </button>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NetworkActivityPage() {
  const [page, setPage] = useState(1)

  return (
    <div className="space-y-0">
      <PageHeader
        title="Network Activity"
        subtitle="Detailed activity log across all property listings and user interactions"
        breadcrumbs={[{ label: 'Reports' }, { label: 'Network Activity' }]}
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            Export Report
          </button>
        }
      />

      {/* Summary strip */}
      <SummaryStrip />

      {/* Main detail card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5">
        {SECTIONS.map(section => (
          <ContentSectionBlock key={section.id} section={section} />
        ))}
      </div>

      {/* Pagination footer */}
      <PaginationFooter page={page} total={7} onChange={setPage} />
    </div>
  )
}
