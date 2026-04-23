import { ArrowRight, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

interface ServiceBanner {
  id: string
  strap?: string
  title: string
  subtitle?: string
  cta: string
  background: string
  titleColor: string
  subtitleColor?: string
  button: 'dark' | 'orange'
}

const banners: ServiceBanner[] = [
  {
    id: 'academy',
    title: 'Property In A Box Growth Academy',
    subtitle: 'Mon | Wed | Fri  ·  9AM  |  MELB/SYD Time',
    cta: 'Register Here',
    background: 'bg-gradient-to-r from-white via-white to-orange-50 border border-orange-100',
    titleColor: 'text-gray-900',
    subtitleColor: 'text-gray-500',
    button: 'dark',
  },
  {
    id: 'founder',
    strap: '1-ON-1 FOUNDER STRATEGY SESSIONS',
    title: "Chris Bockisch's 1-on-1 coaching is designed to unlock growth fast",
    subtitle: 'Book your strategy session now',
    cta: 'Book Session',
    background: 'bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600',
    titleColor: 'text-white',
    subtitleColor: 'text-orange-50/90',
    button: 'dark',
  },
  {
    id: 'leads',
    title: 'Cut the chaos - manage all your leads in one place',
    subtitle: 'Simplify. Organise. Convert.',
    cta: 'Access Tools',
    background: 'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300',
    titleColor: 'text-white',
    subtitleColor: 'text-orange-50/90',
    button: 'dark',
  },
  {
    id: 'flexi',
    title: 'Boost income with Flexi Living Homes',
    subtitle: 'Unlock dual income potential with future-proof designs',
    cta: 'Learn More',
    background: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900',
    titleColor: 'text-white',
    subtitleColor: 'text-gray-200',
    button: 'orange',
  },
  {
    id: 'creatives',
    title: 'One click full access',
    subtitle: 'White-label creatives + sales kit ready to go',
    cta: 'Open Pack',
    background: 'bg-gradient-to-r from-orange-100 via-white to-orange-100 border border-orange-100',
    titleColor: 'text-gray-900',
    subtitleColor: 'text-gray-600',
    button: 'dark',
  },
  {
    id: 'info',
    title: 'Register for our info sessions',
    subtitle: 'Presenting new builders, products and services',
    cta: 'Register',
    background: 'bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700',
    titleColor: 'text-orange-300',
    subtitleColor: 'text-orange-50/90',
    button: 'orange',
  },
]

function ServiceStrip({ banner }: { banner: ServiceBanner }) {
  const buttonClass =
    banner.button === 'orange'
      ? 'bg-orange-500 text-white hover:bg-orange-600'
      : 'bg-gray-900 text-white hover:bg-black'

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={`group relative block w-full overflow-hidden rounded-md px-4 py-3 min-h-[74px] transition-shadow hover:shadow-md ${banner.background}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          {banner.strap ? (
            <p className="text-[10px] font-semibold tracking-wide text-white/90 mb-1">{banner.strap}</p>
          ) : null}
          <h3 className={`text-sm md:text-[17px] font-extrabold leading-tight ${banner.titleColor}`}>
            {banner.title}
          </h3>
          {banner.subtitle ? (
            <p className={`text-[11px] md:text-xs mt-1 ${banner.subtitleColor ?? 'text-white/80'}`}>
              {banner.subtitle}
            </p>
          ) : null}
        </div>
        <button
          className={`shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${buttonClass}`}
        >
          {banner.cta}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </a>
  )
}

export default function OtherServicesPage() {
  return (
    <PageWrapper>
      <div className="w-full">
        <div className="rounded-md border border-gray-200 bg-white shadow-sm p-4 md:p-5">
          <div className="space-y-3">
            {banners.map((banner) => (
              <ServiceStrip key={banner.id} banner={banner} />
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
          <ExternalLink className="w-3 h-3" />
          Preview layout only - links can be connected to live services later
        </p>
      </div>
    </PageWrapper>
  )
}
