import { ArrowRight, ExternalLink } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ServiceBanner {
  id: string
  tag?: string
  title: string
  titleAccent?: string        // part of title in accent colour
  subtitle?: string
  note?: string
  cta: string
  ctaStyle: 'dark' | 'orange' | 'white-outline'
  layout: 'split-left' | 'split-right' | 'full-orange' | 'full-dark'
  bg: string                  // tailwind gradient / bg class
  accentColor: string         // text colour for accent words
  imgSlot?: React.ReactNode   // decorative right side
}

// ── Banner component ──────────────────────────────────────────────────────────

function Banner({ b }: { b: ServiceBanner }) {
  const ctaClass =
    b.ctaStyle === 'dark'
      ? 'bg-gray-900 text-white hover:bg-gray-800'
      : b.ctaStyle === 'orange'
      ? 'bg-orange-500 text-white hover:bg-orange-600'
      : 'border border-white text-white hover:bg-white/10'

  return (
    <a
      href="#"
      onClick={e => e.preventDefault()}
      className={`flex items-center justify-between rounded-xl overflow-hidden min-h-[88px] px-6 py-4 gap-4 transition-shadow hover:shadow-lg ${b.bg}`}
    >
      {/* Left content */}
      <div className="flex-1 min-w-0">
        {b.tag && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1 block">{b.tag}</span>
        )}
        <h3 className="text-lg font-extrabold leading-tight text-white">
          {b.titleAccent ? (
            <>
              {b.title}{' '}
              <span className={b.accentColor}>{b.titleAccent}</span>
            </>
          ) : (
            <span className={b.accentColor || 'text-white'}>{b.title}</span>
          )}
        </h3>
        {b.subtitle && (
          <p className="text-xs text-white/80 mt-1 leading-snug max-w-sm">{b.subtitle}</p>
        )}
        {b.note && (
          <p className="text-[10px] text-white/50 mt-1 italic">{b.note}</p>
        )}
      </div>

      {/* Right: image slot + CTA */}
      <div className="flex items-center gap-4 shrink-0">
        {b.imgSlot}
        <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${ctaClass}`}>
          {b.cta}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </a>
  )
}

// ── Decorative image slots ────────────────────────────────────────────────────

function PersonAvatar({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center shrink-0 ${side === 'left' ? 'order-first' : ''}`}>
      <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/60">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="w-10 h-16 rounded-lg border-2 border-white/40 bg-white/10 flex flex-col items-center justify-center gap-1 shrink-0">
      <div className="w-5 h-1 bg-white/40 rounded" />
      <div className="w-5 h-1 bg-white/40 rounded" />
      <div className="w-5 h-1 bg-white/40 rounded" />
      <div className="w-3 h-3 rounded-full border border-white/40 mt-1" />
    </div>
  )
}

function HouseSilhouette() {
  return (
    <div className="w-20 h-14 shrink-0 flex items-end justify-center opacity-60">
      <svg viewBox="0 0 80 50" className="w-full h-full fill-white/40">
        <polygon points="40,2 78,28 68,28 68,48 12,48 12,28 2,28" />
        <rect x="28" y="32" width="10" height="16" fill="white" opacity="0.3"/>
        <rect x="44" y="32" width="12" height="10" fill="white" opacity="0.3"/>
      </svg>
    </div>
  )
}

function GridDots() {
  return (
    <div className="w-16 h-12 shrink-0 grid grid-cols-4 gap-1 opacity-30">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-white" />
      ))}
    </div>
  )
}

function VideoGrid() {
  return (
    <div className="grid grid-cols-2 gap-1 w-20 shrink-0 opacity-60">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-8 rounded bg-white/20 border border-white/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/40" />
        </div>
      ))}
    </div>
  )
}

// ── Banner data ───────────────────────────────────────────────────────────────

const BANNERS = [
  {
    id: 'b1',
    bg: 'bg-white border border-gray-100 shadow-sm',
    layout: 'split-left' as const,
    title: 'Property In A Box',
    titleAccent: 'Growth Academy',
    accentColor: 'text-orange-500',
    subtitle: 'Mon | Wed | Fri  ·  9AM | MELB/SYD Time',
    cta: 'Register Here',
    ctaStyle: 'dark' as const,
    imgSlot: <PersonAvatar side="right" />,
  },
  {
    id: 'b2',
    bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
    layout: 'split-left' as const,
    tag: '1-ON-1 FOUNDER STRATEGY SESSIONS',
    title: "Chris Bockisch's 1-on-1 coaching is designed to unlock growth, fast.",
    accentColor: 'text-white',
    note: 'Note: Only for annual paying members · Max 1x session per week',
    cta: 'Book My Coaching Session Now',
    ctaStyle: 'dark' as const,
    imgSlot: <PersonAvatar side="left" />,
  },
  {
    id: 'b3',
    bg: 'bg-gradient-to-r from-orange-500 to-orange-400',
    layout: 'split-right' as const,
    title: 'Cut the Chaos — Manage All Your',
    titleAccent: 'Leads In One Place',
    accentColor: 'text-white',
    subtitle: 'Simplify. Organise. Convert.',
    cta: 'Access the Tools Here',
    ctaStyle: 'dark' as const,
    imgSlot: <PhoneMockup />,
  },
  {
    id: 'b4',
    bg: 'bg-gradient-to-r from-gray-800 to-gray-900',
    layout: 'split-left' as const,
    title: 'BOOST INCOME WITH',
    titleAccent: 'FLEXI LIVING HOMES!',
    accentColor: 'text-orange-400',
    subtitle: 'Unlock dual income potential with flexible, future-proof designs. Click to learn more and increase your sales!',
    cta: 'LEARN MORE',
    ctaStyle: 'orange' as const,
    imgSlot: <HouseSilhouette />,
  },
  {
    id: 'b5',
    bg: 'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400',
    layout: 'split-right' as const,
    title: 'One Click.',
    titleAccent: 'Full Access.',
    accentColor: 'text-white',
    subtitle: 'White-Label Creatives + Sales Kit — Ready to Go.',
    cta: 'Get Access',
    ctaStyle: 'dark' as const,
    imgSlot: <GridDots />,
  },
  {
    id: 'b6',
    bg: 'bg-gradient-to-r from-gray-900 to-gray-800',
    layout: 'split-left' as const,
    title: 'REGISTER FOR OUR INFO SESSIONS.',
    titleAccent: 'PRESENTING NEW BUILDERS, PRODUCTS AND SERVICES',
    accentColor: 'text-orange-400',
    cta: 'REGISTER HERE',
    ctaStyle: 'orange' as const,
    imgSlot: <VideoGrid />,
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OtherServicesPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-4">
      {BANNERS.map(b => (
        <Banner key={b.id} b={b as ServiceBanner} />
      ))}

      <p className="text-center text-[10px] text-gray-400 pt-2 flex items-center justify-center gap-1">
        <ExternalLink className="w-3 h-3" />
        All links open in a new tab when connected to live services
      </p>
    </div>
  )
}
