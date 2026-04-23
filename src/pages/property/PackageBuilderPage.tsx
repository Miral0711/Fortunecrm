import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, Save, Send } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import { usePackageBuilder } from '../../hooks/usePackageBuilder'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Lot {
  id: string
  name: string
  suburb: string
  state: string
  price: number
  [key: string]: unknown
}

interface Design {
  id: string
  name: string
  bedrooms: number
  bathrooms: number
  sqm: number
  price: number
  thumbnail: string
  [key: string]: unknown
}

interface Facade {
  id: string
  name: string
  price: number
  thumbnail: string
  [key: string]: unknown
}

interface Inclusion {
  id: string
  name: string
  category: string
  price: number
  [key: string]: unknown
}

const LOTS: Lot[] = [
  { id: '1', name: 'Harlow Estate - 741', suburb: 'Tarneit', state: 'VIC', price: 450000 },
  { id: '2', name: 'Hamlet Estate - 39', suburb: 'Diggers Rest', state: 'VIC', price: 420000 },
  { id: '3', name: 'Kinship - 135', suburb: 'Tarneit', state: 'VIC', price: 380000 },
  { id: '4', name: 'Horizon Estate - 22', suburb: 'Werribee', state: 'VIC', price: 350000 },
]

const DESIGNS: Design[] = [
  { id: '1', name: 'The Hampton', bedrooms: 4, bathrooms: 2, sqm: 220, price: 320000, thumbnail: 'from-blue-200 to-blue-300' },
  { id: '2', name: 'The Riviera', bedrooms: 3, bathrooms: 2, sqm: 180, price: 280000, thumbnail: 'from-teal-200 to-teal-300' },
  { id: '3', name: 'The Monaco', bedrooms: 5, bathrooms: 3, sqm: 280, price: 420000, thumbnail: 'from-purple-200 to-purple-300' },
  { id: '4', name: 'The Capri', bedrooms: 3, bathrooms: 2, sqm: 160, price: 250000, thumbnail: 'from-amber-200 to-amber-300' },
]

const FACADES: Facade[] = [
  { id: '1', name: 'Modern Classic', price: 15000, thumbnail: 'from-slate-200 to-slate-300' },
  { id: '2', name: 'Contemporary', price: 18000, thumbnail: 'from-stone-200 to-stone-300' },
  { id: '3', name: 'Hamptons', price: 22000, thumbnail: 'from-sky-200 to-sky-300' },
  { id: '4', name: 'Coastal', price: 20000, thumbnail: 'from-cyan-200 to-cyan-300' },
]

const INCLUSIONS: Inclusion[] = [
  { id: '1', name: 'Upgraded Kitchen Appliances', category: 'Kitchen', price: 8000 },
  { id: '2', name: 'Stone Benchtops', category: 'Kitchen', price: 5000 },
  { id: '3', name: 'Walk-in Pantry', category: 'Kitchen', price: 3500 },
  { id: '4', name: 'Ducted Heating', category: 'Climate', price: 6000 },
  { id: '5', name: 'Evaporative Cooling', category: 'Climate', price: 4500 },
  { id: '6', name: 'Split System AC', category: 'Climate', price: 3000 },
  { id: '7', name: 'Timber Flooring', category: 'Flooring', price: 7000 },
  { id: '8', name: 'Carpet Upgrade', category: 'Flooring', price: 2500 },
  { id: '9', name: 'Alfresco Area', category: 'Outdoor', price: 12000 },
  { id: '10', name: 'Landscaping Package', category: 'Outdoor', price: 8500 },
]

// ── Accordion Section ─────────────────────────────────────────────────────────

interface AccordionProps {
  title: string
  step: number
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  completed?: boolean
}

function AccordionSection({ title, step, isOpen, onToggle, children, completed }: AccordionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${completed ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {step}
          </div>
          <span className="font-medium text-gray-800 text-sm">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {isOpen && <div className="px-4 py-3 border-t border-gray-100">{children}</div>}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PackageBuilderPage() {
  const [activeTab, setActiveTab] = useState<'floorplan' | 'media' | 'documents'>('floorplan')
  const [openSection, setOpenSection] = useState<number>(1)
  const [lotSearch, setLotSearch] = useState('')

  const { state: packageData, setLot, setDesign, setFacade, toggleInclusion, updateAdjustment, calculateTotal, isIncluded } = usePackageBuilder<
    typeof LOTS[0], typeof DESIGNS[0], typeof FACADES[0], typeof INCLUSIONS[0]
  >([
    { label: 'Site Costs', value: 0 },
    { label: 'Discount', value: 0 },
  ])

  const filteredLots = LOTS.filter(lot =>
    lot.name.toLowerCase().includes(lotSearch.toLowerCase()) ||
    lot.suburb.toLowerCase().includes(lotSearch.toLowerCase())
  )

  const inclusionsByCategory = INCLUSIONS.reduce((acc, inc) => {
    if (!acc[inc.category]) acc[inc.category] = []
    acc[inc.category].push(inc)
    return acc
  }, {} as Record<string, Inclusion[]>)

  const setupProgress = [
    { label: 'Lot selected', done: !!packageData.lot },
    { label: 'Design selected', done: !!packageData.design },
    { label: 'Facade selected', done: !!packageData.facade },
    { label: 'Inclusions added', done: packageData.inclusions.length > 0 },
  ]

  return (
    <div>
      <PageHeader
        title="Package Builder"
        subtitle="Create custom property packages"
        breadcrumbs={[
          { label: 'Property', path: '/property/projects' },
          { label: 'Package Builder' },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 items-start gap-5">
        {/* Left Panel - Builder */}
        <div className="xl:col-span-7 space-y-3">
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-800">Create Package</h3>
            <p className="text-xs text-gray-500 mt-0.5">Configure your property package</p>
          </div>

          {/* Step 1: Select Lot */}
          <AccordionSection
            title="Select Lot"
            step={1}
            isOpen={openSection === 1}
            onToggle={() => setOpenSection(openSection === 1 ? 0 : 1)}
            completed={!!packageData.lot}
          >
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lots..."
                value={lotSearch}
                onChange={e => setLotSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredLots.map(lot => (
                <button
                  key={lot.id}
                  onClick={() => {
                    setLot(lot)
                    setOpenSection(2)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md border transition-colors ${
                    packageData.lot?.id === lot.id
                      ? 'border-orange-400 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-800">{lot.name}</p>
                  <p className="text-xs text-gray-500">{lot.suburb}, {lot.state} · ${lot.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* Step 2: Select Design */}
          <AccordionSection
            title="Select Design"
            step={2}
            isOpen={openSection === 2}
            onToggle={() => setOpenSection(openSection === 2 ? 0 : 2)}
            completed={!!packageData.design}
          >
            <div className="grid grid-cols-2 gap-2">
              {DESIGNS.map(design => (
                <button
                  key={design.id}
                  onClick={() => {
                    setDesign(design)
                    setOpenSection(3)
                  }}
                  className={`text-left rounded-lg border overflow-hidden transition-colors ${
                    packageData.design?.id === design.id
                      ? 'border-orange-400 ring-2 ring-orange-400/30'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className={`h-20 bg-gradient-to-br ${design.thumbnail}`} />
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-800">{design.name}</p>
                    <p className="text-[10px] text-gray-500">{design.bedrooms}BR · {design.bathrooms}BA · {design.sqm}m²</p>
                    <p className="text-xs font-medium text-orange-600 mt-1">${design.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* Step 3: Select Facade */}
          <AccordionSection
            title="Select Facade"
            step={3}
            isOpen={openSection === 3}
            onToggle={() => setOpenSection(openSection === 3 ? 0 : 3)}
            completed={!!packageData.facade}
          >
            <div className="flex gap-2 overflow-x-auto pb-2">
              {FACADES.map(facade => (
                <button
                  key={facade.id}
                  onClick={() => {
                    setFacade(facade)
                    setOpenSection(4)
                  }}
                  className={`shrink-0 w-28 rounded-lg border overflow-hidden transition-colors ${
                    packageData.facade?.id === facade.id
                      ? 'border-orange-400 ring-2 ring-orange-400/30'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className={`h-16 bg-gradient-to-br ${facade.thumbnail}`} />
                  <div className="p-2">
                    <p className="text-[10px] font-semibold text-gray-800 truncate">{facade.name}</p>
                    <p className="text-xs font-medium text-orange-600">+${facade.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* Step 4: Add Inclusions */}
          <AccordionSection
            title="Add Inclusions"
            step={4}
            isOpen={openSection === 4}
            onToggle={() => setOpenSection(openSection === 4 ? 0 : 4)}
            completed={packageData.inclusions.length > 0}
          >
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Object.entries(inclusionsByCategory).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-gray-600 mb-1.5">{category}</p>
                  <div className="space-y-1">
                    {items.map(inc => (
                      <label
                        key={inc.id}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                        checked={isIncluded(inc.id)}
                          onChange={() => toggleInclusion(inc)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-orange-500 focus:ring-orange-400/30"
                        />
                        <span className="flex-1 text-xs text-gray-700">{inc.name}</span>
                        <span className="text-xs font-medium text-gray-600">+${inc.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* Step 5: Pricing Adjustments */}
          <AccordionSection
            title="Pricing Adjustments"
            step={5}
            isOpen={openSection === 5}
            onToggle={() => setOpenSection(openSection === 5 ? 0 : 5)}
          >
            <div className="space-y-2">
              {packageData.adjustments.map(adj => (
                <div key={adj.label}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{adj.label}</label>
                  <input
                    type="number"
                    value={adj.value}
                    onChange={e => updateAdjustment(adj.label, Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>

        {/* Right Panel - Preview */}
        <div className="xl:col-span-5 xl:self-start">
          <div className="xl:sticky xl:top-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Summary Header */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Package Summary</h3>
              <p className="text-xs text-gray-500 mt-0.5">Review your selections</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['floorplan', 'media', 'documents'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2.5 text-xs font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50/30'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-5">
              {activeTab === 'floorplan' && (
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Package setup progress</p>
                    <div className="grid grid-cols-2 gap-2">
                      {setupProgress.map(item => (
                        <div
                          key={item.label}
                          className={`px-2.5 py-2 rounded-md text-[11px] font-medium border ${
                            item.done
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              : 'text-gray-500 bg-white border-gray-200'
                          }`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Items */}
                  <div className="space-y-3">
                    {packageData.lot && (
                      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{packageData.lot.name}</p>
                          <p className="text-[10px] text-gray-500">{packageData.lot.suburb}, {packageData.lot.state}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">${packageData.lot.price.toLocaleString()}</p>
                      </div>
                    )}

                    {packageData.design && (
                      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{packageData.design.name}</p>
                          <p className="text-[10px] text-gray-500">{packageData.design.bedrooms}BR · {packageData.design.bathrooms}BA · {packageData.design.sqm}m²</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">${packageData.design.price.toLocaleString()}</p>
                      </div>
                    )}

                    {packageData.facade && (
                      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{packageData.facade.name} Facade</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">+${packageData.facade.price.toLocaleString()}</p>
                      </div>
                    )}

                    {packageData.inclusions.length > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-800 mb-2">Inclusions ({packageData.inclusions.length})</p>
                        <div className="space-y-1.5">
                          {packageData.inclusions.map(inc => (
                            <div key={inc.id} className="flex items-center justify-between">
                              <p className="text-[10px] text-gray-600">{inc.name}</p>
                              <p className="text-xs font-medium text-gray-700">+${inc.price.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {packageData.adjustments.some(adj => adj.value !== 0) && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-800 mb-2">Adjustments</p>
                        <div className="space-y-1.5">
                          {packageData.adjustments.filter(adj => adj.value !== 0).map(adj => (
                            <div key={adj.label} className="flex items-center justify-between">
                              <p className="text-[10px] text-gray-600">{adj.label}</p>
                              <p className="text-xs font-medium text-gray-700">${adj.value.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {!packageData.lot && !packageData.design && !packageData.facade && packageData.inclusions.length === 0 && (
                    <div className="text-center py-2">
                      <p className="text-xs text-gray-500">
                        Start from the left panel to build your package.
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-800">Total Package Price</p>
                      <p className="text-xl font-bold text-orange-600">${calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">Media preview coming soon</p>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">Documents preview coming soon</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
                <Send className="w-4 h-4" />
                Publish Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
