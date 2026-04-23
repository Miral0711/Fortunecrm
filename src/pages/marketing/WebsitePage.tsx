import { useMemo, useState } from 'react'
import {
  Eye, Pencil, Plus, Trash2, Globe, Link2, Activity, RefreshCcw, Sparkles, LayoutDashboard,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface WebsiteEntry {
  id: string
  name: string
  logoText: string
  domain: string
  platform: string
  monthlyVisits: number
  enabled: boolean
}

interface WordpressSite {
  id: string
  slot: string
  status: 'initializing' | 'active' | 'inactive' | null
  title: string
  domain: string
  plan: 'Starter' | 'Growth' | 'Pro' | ''
  username: string
  password: string
  enabled: boolean
  empty: boolean
}

function num(n: number) {
  return n.toLocaleString()
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
    initializing: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    active:       'bg-green-50 text-green-700 ring-1 ring-green-200',
    inactive:     'bg-gray-100 text-gray-500 ring-1 ring-gray-200',
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
      <div className="px-5 pt-4 pb-3 border-b border-gray-50 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{site.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            {site.domain}
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 ring-1 ring-orange-200">
          {site.platform}
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <LogoPlaceholder text={site.logoText} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800">Website Health: Good</p>
            <p className="text-xs text-gray-500">Monthly visits: {num(site.monthlyVisits)}</p>
            <p className="text-xs text-emerald-600 font-medium">SSL active · CDN enabled</p>
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
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Pencil className="w-3.5 h-3.5" /> Editor
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Activity className="w-3.5 h-3.5" /> Analytics
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
        <h3 className="text-sm font-semibold text-gray-800">{site.slot}</h3>
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
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Link2 className="w-3 h-3" />
                  {site.domain}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                  {site.plan && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 font-medium">
                      {site.plan}
                    </span>
                  )}
                  {site.username && <span>Username: <span className="text-gray-600">{site.username}</span></span>}
                  {site.password && <span>Password: <span className="text-gray-600">••••••••</span></span>}
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
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Pencil className="w-3.5 h-3.5" /> Editor
            </button>
            <button
              onClick={() => onRemove(site.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
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
  {
    id: 'w1', name: 'Wealth Creation Website', logoText: 'HOT PROPERTY',
    domain: 'wealth.hotpropertyonline.com.au', platform: 'Custom Builder', monthlyVisits: 12462, enabled: true,
  },
  {
    id: 'w2', name: 'Real Estate Website', logoText: 'HOT PROPERTY',
    domain: 'realestate.hotpropertyonline.com.au', platform: 'Custom Builder', monthlyVisits: 8740, enabled: true,
  },
]

const INITIAL_WP: WordpressSite[] = [
  {
    id: 'wp1', slot: 'Website 1', status: 'initializing',
    title: 'HPO', domain: 'hpo-wordpress.com.au', plan: 'Starter',
    username: '', password: '', enabled: true, empty: false,
  },
  {
    id: 'wp2', slot: 'Website 2', status: null, title: '', domain: '', plan: '',
    username: '', password: '', enabled: false, empty: true,
  },
  {
    id: 'wp3', slot: 'Website 3', status: null, title: '', domain: '', plan: '',
    username: '', password: '', enabled: false, empty: true,
  },
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
        ? {
            ...s,
            empty: false,
            status: 'initializing',
            title: 'New Site',
            domain: 'newsite-wordpress.com.au',
            plan: 'Starter',
            enabled: false,
          }
        : s
    ))
  }

  function removeWp(id: string) {
    setWpSites(prev => prev.map(s =>
      s.id === id
        ? {
            ...s,
            empty: true,
            status: null,
            title: '',
            domain: '',
            plan: '',
            username: '',
            password: '',
            enabled: false,
          }
        : s
    ))
  }

  const enabledTotal = useMemo(
    () => websites.filter(s => s.enabled).length + wpSites.filter(s => !s.empty && s.enabled).length,
    [websites, wpSites]
  )
  const wpActive = useMemo(
    () => wpSites.filter(s => !s.empty && s.status === 'active').length,
    [wpSites]
  )
  const totalVisits = useMemo(
    () => websites.reduce((acc, site) => acc + site.monthlyVisits, 0),
    [websites]
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <LayoutDashboard className="w-4.5 h-4.5 text-orange-500" />
              Website Control Center
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your branded and WordPress websites, monitor status, and launch actions quickly.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCcw className="w-3.5 h-3.5" />
              Sync Status
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Website
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs text-gray-500">Total Websites</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">{websites.length + wpSites.filter(s => !s.empty).length}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs text-gray-500">Enabled</p>
            <p className="text-xl font-semibold text-emerald-600 mt-1">{enabledTotal}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs text-gray-500">WordPress Active</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">{wpActive}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3">
            <p className="text-xs text-gray-500">Monthly Visits</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">{num(totalVisits)}</p>
          </div>
        </div>
      </section>

      {/* ── Your Websites ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Your Websites</h2>
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-orange-50 text-orange-700 ring-1 ring-orange-200">
            {websites.length} connected
          </span>
        </div>
        <div className="space-y-4">
          {websites.map(site => (
            <WebsiteCard key={site.id} site={site} onToggle={toggleWebsite} />
          ))}
        </div>
      </section>

      {/* ── Your WordPress Websites ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Your WordPress Websites</h2>
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600">
            {wpSites.filter(s => !s.empty).length} / {wpSites.length} slots used
          </span>
        </div>
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
        {wpSites.every(s => s.empty) && (
          <div className="mt-4 rounded-xl border border-dashed border-orange-200 bg-orange-50/40 p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700">No WordPress sites configured yet</p>
            <p className="text-xs text-gray-500 mt-1">Create your first WordPress website and start publishing landing pages quickly.</p>
          </div>
        )}
      </section>
    </div>
  )
}
