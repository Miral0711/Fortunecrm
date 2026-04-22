import { useState } from 'react'
import { Eye, Pencil, Plus, Trash2, Globe } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface WebsiteEntry {
  id: string
  name: string
  logoText: string
  enabled: boolean
}

interface WordpressSite {
  id: string
  slot: string
  status: 'initializing' | 'active' | 'inactive' | null
  title: string
  username: string
  password: string
  enabled: boolean
  empty: boolean
}

// ── Toggle component ──────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        value ? 'bg-orange-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          value ? 'translate-x-4.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

// ── Logo placeholder ──────────────────────────────────────────────────────────

function LogoPlaceholder({ text }: { text: string }) {
  return (
    <div className="w-[88px] h-[72px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center shrink-0">
      <div className="flex flex-col items-center gap-1 px-2">
        <Globe className="w-5 h-5 text-orange-400" />
        <span className="text-[9px] font-bold text-orange-500 text-center leading-tight">{text}</span>
      </div>
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: WordpressSite['status'] }) {
  if (!status) return null
  const map = {
    initializing: 'bg-orange-100 text-orange-600',
    active:       'bg-green-100 text-green-700',
    inactive:     'bg-gray-100 text-gray-500',
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${map[status]}`}>
      {status}
    </span>
  )
}

// ── Website card (Your Websites section) ─────────────────────────────────────

function WebsiteCard({ site, onToggle }: { site: WebsiteEntry; onToggle: (id: string, v: boolean) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Card header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-orange-500">{site.name}</h3>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <LogoPlaceholder text={site.logoText} />
          <div>
            <p className="text-sm font-semibold text-gray-800">Hot Property Online</p>
          </div>
        </div>

        {/* Enabled toggle */}
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <span className="text-xs text-gray-500 font-medium">Enabled?</span>
          <span className="text-xs text-gray-400">No</span>
          <Toggle value={site.enabled} onChange={v => onToggle(site.id, v)} />
          <span className="text-xs text-gray-400">Yes</span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 pb-4 flex justify-end gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
          <Pencil className="w-3.5 h-3.5" /> Editor
        </button>
      </div>
    </div>
  )
}

// ── WordPress site card ───────────────────────────────────────────────────────

function WordpressCard({
  site,
  onToggle,
  onAdd,
  onRemove,
}: {
  site: WordpressSite
  onToggle: (id: string, v: boolean) => void
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Card header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-orange-500">{site.slot}</h3>
        {site.empty && (
          <button
            onClick={() => onAdd(site.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Website
          </button>
        )}
      </div>

      {/* Card body */}
      {site.empty ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-gray-400 font-medium">No Websites Found!</p>
        </div>
      ) : (
        <>
          <div className="px-5 py-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <LogoPlaceholder text="HPO" />
              <div className="space-y-1.5">
                {site.status && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Status</span>
                    <StatusPill status={site.status} />
                  </div>
                )}
                <p className="text-sm font-semibold text-gray-800">{site.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {site.username && <span>Username: <span className="text-gray-600">{site.username}</span></span>}
                  {site.password && <span>Password: <span className="text-gray-600">{site.password}</span></span>}
                </div>
              </div>
            </div>

            {/* Enabled toggle */}
            <div className="flex items-center gap-2 shrink-0 mt-1">
              <span className="text-xs text-gray-500 font-medium">Enabled?</span>
              <span className="text-xs text-gray-400">No</span>
              <Toggle value={site.enabled} onChange={v => onToggle(site.id, v)} />
              <span className="text-xs text-gray-400">Yes</span>
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-5 pb-4 flex justify-end gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500/70 rounded-lg hover:bg-orange-500 transition-colors">
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500/70 rounded-lg hover:bg-orange-500 transition-colors">
              <Pencil className="w-3.5 h-3.5" /> Editor
            </button>
            <button
              onClick={() => onRemove(site.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500/70 rounded-lg hover:bg-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const INITIAL_WEBSITES: WebsiteEntry[] = [
  { id: 'w1', name: 'Wealth Creation Website', logoText: 'HOT PROPERTY', enabled: true },
  { id: 'w2', name: 'Real Estate Website',      logoText: 'HOT PROPERTY', enabled: true },
]

const INITIAL_WP: WordpressSite[] = [
  {
    id: 'wp1', slot: 'Website 1', status: 'initializing',
    title: 'HPO', username: '', password: '', enabled: true, empty: false,
  },
  { id: 'wp2', slot: 'Website 2', status: null, title: '', username: '', password: '', enabled: false, empty: true },
  { id: 'wp3', slot: 'Website 3', status: null, title: '', username: '', password: '', enabled: false, empty: true },
]

export default function WebsitePage() {
  const [websites, setWebsites] = useState<WebsiteEntry[]>(INITIAL_WEBSITES)
  const [wpSites,  setWpSites]  = useState<WordpressSite[]>(INITIAL_WP)

  function toggleWebsite(id: string, v: boolean) {
    setWebsites(prev => prev.map(s => s.id === id ? { ...s, enabled: v } : s))
  }

  function toggleWp(id: string, v: boolean) {
    setWpSites(prev => prev.map(s => s.id === id ? { ...s, enabled: v } : s))
  }

  function addWp(id: string) {
    setWpSites(prev => prev.map(s =>
      s.id === id
        ? { ...s, empty: false, status: 'initializing', title: 'New Site', enabled: false }
        : s
    ))
  }

  function removeWp(id: string) {
    setWpSites(prev => prev.map(s =>
      s.id === id
        ? { ...s, empty: true, status: null, title: '', username: '', password: '', enabled: false }
        : s
    ))
  }

  return (
    <div className="space-y-4">

      {/* ── Your Websites ── */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Your Websites</h2>
        <div className="space-y-4">
          {websites.map(site => (
            <WebsiteCard key={site.id} site={site} onToggle={toggleWebsite} />
          ))}
        </div>
      </section>

      {/* ── Your WordPress Websites ── */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Your Wordpress Websites</h2>
        <div className="space-y-4">
          {wpSites.map(site => (
            <WordpressCard
              key={site.id}
              site={site}
              onToggle={toggleWp}
              onAdd={addWp}
              onRemove={removeWp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
