import { useState } from 'react'
import { Globe, Lock, Users, CheckCircle2, Info } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../components/layout/PageHeader'
import AgentSelector, { AgentTag } from '../components/domain/AgentSelector'
import InfoBanner from '../components/common/InfoBanner'
import type { Agent } from '../components/domain/AgentSelector'

const ALL_AGENTS: Agent[] = [
  { id: 'a1', name: 'Sarah Mitchell',  initials: 'SM', role: 'Sales Agent' },
  { id: 'a2', name: 'James Thornton',  initials: 'JT', role: 'BDM' },
  { id: 'a3', name: 'Priya Sharma',    initials: 'PS', role: 'Sales Agent' },
  { id: 'a4', name: 'David Chen',      initials: 'DC', role: 'Affiliate' },
  { id: 'a5', name: 'Emma Wilson',     initials: 'EW', role: 'Sales Agent' },
  { id: 'a6', name: 'Liam Nguyen',     initials: 'LN', role: 'Referral Partner' },
  { id: 'a7', name: 'Chloe Adams',     initials: 'CA', role: 'BDM' },
  { id: 'a8', name: 'Marcus Lee',      initials: 'ML', role: 'Sales Agent' },
  { id: 'a9', name: 'Natalie Brown',   initials: 'NB', role: 'Affiliate' },
  { id: 'a10',name: 'Oliver Scott',    initials: 'OS', role: 'Sales Agent' },
]

const PACKAGES = [
  { id: 'p1', name: 'Horizon Estate – 4BR Package' },
  { id: 'p2', name: 'Solaris Estate – Premium Package' },
  { id: 'p3', name: 'Parkview Rise – Starter Package' },
]

function DistributionCard({ pkg }: { pkg: { id: string; name: string } }) {
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([])
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const infoBannerMessage = visibility === 'public'
    ? `This package is visible to all ${ALL_AGENTS.length} agents.`
    : selectedAgents.length > 0
      ? `This package is visible to ${selectedAgents.length} agent${selectedAgents.length !== 1 ? 's' : ''}.`
      : 'No agents selected. Package will not be visible to anyone.'

  const infoBannerVariant = visibility === 'public' ? 'info' : selectedAgents.length > 0 ? 'orange' : 'info'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">{pkg.name}</h3>
      </div>

      <div className="p-5 space-y-5 flex-1 flex flex-col">
        {/* Visibility toggle */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Visibility</p>
          <div className="flex gap-3">
            {(['public', 'private'] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setVisibility(v)}
                className={clsx(
                  'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left',
                  visibility === v ? 'border-orange-400 bg-orange-50' : 'border-gray-100 bg-white hover:border-gray-200'
                )}
              >
                <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', visibility === v ? 'bg-orange-100' : 'bg-gray-100')}>
                  {v === 'public'
                    ? <Globe className={clsx('w-4 h-4', visibility === v ? 'text-orange-500' : 'text-gray-400')} />
                    : <Lock className={clsx('w-4 h-4', visibility === v ? 'text-orange-500' : 'text-gray-400')} />
                  }
                </div>
                <div>
                  <p className={clsx('text-sm font-medium capitalize', visibility === v ? 'text-orange-700' : 'text-gray-600')}>{v}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {v === 'public' ? 'Visible to all agents' : 'Restricted to selected agents'}
                  </p>
                </div>
                {visibility === v && <CheckCircle2 className="w-4 h-4 text-orange-500 ml-auto shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {visibility === 'private' && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Agents</p>
            <AgentSelector
              agents={ALL_AGENTS}
              selected={selectedAgents}
              onChange={setSelectedAgents}
            />
          </div>
        )}

        <InfoBanner message={infoBannerMessage} variant={infoBannerVariant} />

        <div className="flex items-center justify-end pt-1 mt-auto">
          <button
            onClick={handleSave}
            className={clsx(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
              saved ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
            )}
          >
            {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DistributionPage() {
  return (
    <div className="w-full px-6 space-y-6">
      <PageHeader
        title="Distribution Settings"
        subtitle="Control which agents can see each package listing."
      />

      <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 px-5 py-4 w-full">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">{ALL_AGENTS.length} agents in your network</p>
          <p className="text-xs text-gray-400 mt-0.5">Manage visibility per package below</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PACKAGES.map(pkg => (
          <DistributionCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  )
}
