import { Filter, Layers, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DashboardMapItem } from './types'

interface MapControlsPanelProps {
  className?: string
}

export function MapControlsPanel({ className = '' }: MapControlsPanelProps) {
  return (
    <div className={`absolute right-4 top-4 flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 shadow-md transition-colors hover:bg-orange-600"
        title="Filter map"
      >
        <Filter className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
        title="My location"
      >
        <MapPin className="h-3.5 w-3.5 text-gray-500" />
      </button>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
        title="Layers"
      >
        <Layers className="h-3.5 w-3.5 text-gray-500" />
      </button>
    </div>
  )
}

interface MapPanelProps {
  items: DashboardMapItem[]
}

const CLUSTER_CENTERS = [
  { x: 20, y: 26 },
  { x: 34, y: 52 },
  { x: 54, y: 38 },
  { x: 70, y: 56 },
  { x: 78, y: 28 },
]

export default function MapPanel({ items }: MapPanelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const clusters = useMemo(() => {
    return CLUSTER_CENTERS.map((center, centerIndex) => {
      const clusterItems = items.filter((_, itemIndex) => itemIndex % CLUSTER_CENTERS.length === centerIndex)
      return { ...center, items: clusterItems }
    })
  }, [items])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-100">
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
      </svg>

      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 185 Q 220 165 440 200 T 900 190" stroke="#d8dee8" strokeWidth="2.2" fill="none" />
        <path d="M 0 335 Q 320 305 640 340 T 950 320" stroke="#dbe2eb" strokeWidth="1.3" fill="none" />
        <path d="M 200 0 Q 220 200 205 430 T 215 760" stroke="#d9e1eb" strokeWidth="1.3" fill="none" />
        <path d="M 505 0 Q 490 200 515 410 T 500 760" stroke="#e5e9f0" strokeWidth="1" fill="none" />
        <ellipse cx="690" cy="290" rx="120" ry="78" fill="#d7ecff" opacity="0.55" />
        <ellipse cx="170" cy="500" rx="66" ry="42" fill="#d9f5dd" opacity="0.35" />
      </svg>

      {clusters.map((cluster, clusterIndex) => {
        if (cluster.items.length === 0) return null
        const representative = cluster.items[0]
        const isHovered = hoveredId === representative.id

        return (
          <div
            key={clusterIndex}
            className="group absolute cursor-pointer"
            style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, zIndex: isHovered ? 20 : 10 }}
            onMouseEnter={() => setHoveredId(representative.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 transition-all duration-150 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              <div className="whitespace-nowrap rounded-lg border border-white/10 bg-gray-900/95 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-xl backdrop-blur-sm">
                <p className="font-semibold">
                  {cluster.items.length > 1 ? `${cluster.items.length} listings` : representative.name}
                </p>
                <p className="mt-0.5 text-[9px] text-gray-300">
                  {representative.suburb}, {representative.state} . {representative.priceLabel}
                </p>
              </div>
              <div className="-mt-1 mx-auto h-2 w-2 rotate-45 rounded-sm bg-gray-900/95" />
            </div>

            <div className={`relative transition-all duration-150 ${isHovered ? 'scale-125' : 'scale-100'}`}>
              {cluster.items.length > 1 ? (
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white shadow-lg transition-colors duration-150 ${
                    isHovered ? 'bg-orange-600' : 'bg-orange-500'
                  }`}
                >
                  {cluster.items.length}
                </div>
              ) : (
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-colors duration-150 ${
                    isHovered ? 'bg-orange-500' : 'bg-orange-400'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-black/20 blur-sm" />
            </div>
          </div>
        )
      })}

      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 shadow-md transition-colors hover:bg-orange-600"
          title="Filter map"
        >
          <Filter className="h-3.5 w-3.5 text-white" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
          title="My location"
        >
          <MapPin className="h-3.5 w-3.5 text-gray-500" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
          title="Layers"
        >
          <Layers className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>

      <div className="absolute right-4 top-[152px] flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center border-b border-gray-100 text-base font-bold leading-none text-gray-600 transition-colors hover:bg-gray-50"
        >
          +
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-base font-bold leading-none text-gray-600 transition-colors hover:bg-gray-50"
        >
          -
        </button>
      </div>

      <div className="absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <p className="text-[10px] font-semibold text-gray-600">{items.length} listings shown</p>
      </div>

      <div className="absolute bottom-1.5 right-2 text-[9px] text-gray-400/70">Leaflet | OpenStreetMap contributors</div>
    </div>
  )
}
