import { useState, useRef } from 'react'
import {
  Plus, Download, Upload, Eye, MoreVertical,
  FileText, Image, Type, DollarSign, ChevronDown,
  Search, X, Check, Palette, AlignLeft, Package,
} from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/ui/StatusBadge'
import Modal from '../../components/ui/Modal'

// ── Types ─────────────────────────────────────────────────────────────────────

type BrochureType = 'Generated' | 'Uploaded'

interface BrochureRow {
  id: string
  name: string
  type: BrochureType
  linkedPackage: string
  createdAt: string
}

type SectionKind = 'image' | 'text' | 'pricing'

interface BuilderSection {
  id: string
  kind: SectionKind
  content: string
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const PACKAGES = [
  'Voltaire Estate – Lot 37',
  'Slacks Street – Lot 8 Unit 2',
  'Whiterock – Lot 2231',
  'Ripley Central – Lot 18',
  'The Springs Estate – Lot 175',
  'Parkview – Lot 26',
  'Greenfield Heights – Lot 42',
  'Coastal Sands – Lot 7',
]

const FONTS = ['Inter', 'Georgia', 'Playfair Display', 'Lato', 'Montserrat']

const TEMPLATES = [
  { id: 'classic',  label: 'Classic',   desc: 'Clean single-column layout' },
  { id: 'modern',   label: 'Modern',    desc: 'Two-column with hero image' },
  { id: 'minimal',  label: 'Minimal',   desc: 'Text-focused, no frills' },
  { id: 'premium',  label: 'Premium',   desc: 'Full-bleed with accent band' },
]

const INITIAL_BROCHURES: BrochureRow[] = [
  { id: '1', name: 'Voltaire Estate Brochure',       type: 'Generated', linkedPackage: 'Voltaire Estate – Lot 37',       createdAt: '12 Apr 2026' },
  { id: '2', name: 'Slacks Street Duplex Info Pack', type: 'Uploaded',  linkedPackage: 'Slacks Street – Lot 8 Unit 2',   createdAt: '10 Apr 2026' },
  { id: '3', name: 'Whiterock Land Package',         type: 'Generated', linkedPackage: 'Whiterock – Lot 2231',           createdAt: '8 Apr 2026'  },
  { id: '4', name: 'Ripley Central Investor Pack',   type: 'Uploaded',  linkedPackage: 'Ripley Central – Lot 18',        createdAt: '5 Apr 2026'  },
  { id: '5', name: 'Springs Estate Overview',        type: 'Generated', linkedPackage: 'The Springs Estate – Lot 175',   createdAt: '2 Apr 2026'  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// ── Section icon map ──────────────────────────────────────────────────────────

const SECTION_ICONS: Record<SectionKind, React.ElementType> = {
  image:   Image,
  text:    AlignLeft,
  pricing: DollarSign,
}

const SECTION_LABELS: Record<SectionKind, string> = {
  image:   'Image Block',
  text:    'Text Block',
  pricing: 'Pricing Block',
}

// ── Row actions menu ──────────────────────────────────────────────────────────

function RowMenu({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
            {['Preview', 'Download'].map(a => (
              <button
                key={a}
                onClick={() => setOpen(false)}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {a}
              </button>
            ))}
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => { setOpen(false); onDelete() }}
              className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Live Preview ──────────────────────────────────────────────────────────────

function LivePreview({
  template, sections, primaryColor, font, logoUrl, packageName,
}: {
  template: string
  sections: BuilderSection[]
  primaryColor: string
  font: string
  logoUrl: string | null
  packageName: string
}) {
  return (
    <div
      className="h-full min-h-[480px] rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col"
      style={{ fontFamily: font }}
    >
      {/* Header band */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-7 object-contain" />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/30" />
            <span className="text-xs font-bold text-white tracking-wide">YOUR LOGO</span>
          </div>
        )}
        <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">
          {template.toUpperCase()}
        </span>
      </div>

      {/* Package name */}
      <div className="px-5 pt-4 pb-2 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-800 truncate">
          {packageName || 'Select a package…'}
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {sections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="w-8 h-8 text-gray-200 mb-2" />
            <p className="text-xs text-gray-400">Add sections to preview your brochure</p>
          </div>
        )}
        {sections.map(s => {
          if (s.kind === 'image') return (
            <div key={s.id} className="rounded-md bg-gray-100 h-24 flex items-center justify-center border border-dashed border-gray-200">
              <Image className="w-5 h-5 text-gray-300" />
            </div>
          )
          if (s.kind === 'pricing') return (
            <div key={s.id} className="rounded-md border border-gray-100 p-3">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Pricing</p>
              <p className="text-sm font-bold" style={{ color: primaryColor }}>
                {s.content || '$000,000'}
              </p>
            </div>
          )
          return (
            <div key={s.id} className="text-xs text-gray-600 leading-relaxed">
              {s.content || <span className="text-gray-300 italic">Text block…</span>}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-gray-100">
        <p className="text-[9px] text-gray-400 text-center">Generated by Fusion CRM</p>
      </div>
    </div>
  )
}

// ── Builder Section Item ──────────────────────────────────────────────────────

function SectionItem({
  section, onChange, onRemove,
}: {
  section: BuilderSection
  onChange: (content: string) => void
  onRemove: () => void
}) {
  const Icon = SECTION_ICONS[section.kind]
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <span className="text-xs font-medium text-gray-700">{SECTION_LABELS[section.kind]}</span>
        </div>
        <button onClick={onRemove} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
          <X className="w-3 h-3" />
        </button>
      </div>
      {section.kind === 'image' && (
        <div className="h-16 rounded-md bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors">
          <span className="text-xs text-gray-400">Click to upload image</span>
        </div>
      )}
      {section.kind === 'text' && (
        <textarea
          rows={3}
          value={section.content}
          onChange={e => onChange(e.target.value)}
          placeholder="Enter text content…"
          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
        />
      )}
      {section.kind === 'pricing' && (
        <input
          type="text"
          value={section.content}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. $650,000"
          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
        />
      )}
    </div>
  )
}

// ── Upload Brochure Modal ─────────────────────────────────────────────────────

function UploadModal({ open, onClose, onSave }: {
  open: boolean
  onClose: () => void
  onSave: (name: string, pkg: string) => void
}) {
  const [name, setName]       = useState('')
  const [pkg, setPkg]         = useState('')
  const [file, setFile]       = useState<File | null>(null)
  const fileRef               = useRef<HTMLInputElement>(null)

  function handleSave() {
    if (!name.trim() || !pkg) return
    onSave(name.trim(), pkg)
    setName(''); setPkg(''); setFile(null)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Upload Brochure" size="sm">
      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Brochure Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Voltaire Estate Info Pack"
            className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
          />
        </div>

        {/* Package */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Assign to Package</label>
          <div className="relative">
            <select
              value={pkg}
              onChange={e => setPkg(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
            >
              <option value="">Select package…</option>
              {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* File upload */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">PDF File</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="h-20 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-colors"
          >
            {file ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600 font-medium">{file.name}</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">Click to upload PDF</span>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !pkg}
            className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Save Brochure
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type Tab = 'list' | 'builder' | 'upload'

export default function BrochuresPage() {
  const [tab, setTab]               = useState<Tab>('list')
  const [brochures, setBrochures]   = useState<BrochureRow[]>(INITIAL_BROCHURES)
  const [search, setSearch]         = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  // Builder state
  const [template, setTemplate]         = useState('classic')
  const [sections, setSections]         = useState<BuilderSection[]>([])
  const [primaryColor, setPrimaryColor] = useState('#e07b39')
  const [font, setFont]                 = useState('Inter')
  const [logoUrl, setLogoUrl]           = useState<string | null>(null)
  const [builderPkg, setBuilderPkg]     = useState('')
  const [brochureName, setBrochureName] = useState('')
  const logoRef                         = useRef<HTMLInputElement>(null)

  // ── List helpers ────────────────────────────────────────────────────────────

  const filtered = brochures.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.linkedPackage.toLowerCase().includes(search.toLowerCase())
  )

  function deleteBrochure(id: string) {
    setBrochures(prev => prev.filter(b => b.id !== id))
  }

  function handleUploadSave(name: string, pkg: string) {
    const row: BrochureRow = {
      id: uid(), name, type: 'Uploaded', linkedPackage: pkg,
      createdAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setBrochures(prev => [row, ...prev])
  }

  // ── Builder helpers ─────────────────────────────────────────────────────────

  function addSection(kind: SectionKind) {
    setSections(prev => [...prev, { id: uid(), kind, content: '' }])
  }

  function updateSection(id: string, content: string) {
    setSections(prev => prev.map(s => s.id === id ? { ...s, content } : s))
  }

  function removeSection(id: string) {
    setSections(prev => prev.filter(s => s.id !== id))
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLogoUrl(url)
  }

  function handleGenerate() {
    if (!brochureName.trim() || !builderPkg) return
    const row: BrochureRow = {
      id: uid(), name: brochureName.trim(), type: 'Generated',
      linkedPackage: builderPkg,
      createdAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setBrochures(prev => [row, ...prev])
    setTab('list')
    setBrochureName(''); setBuilderPkg(''); setSections([]); setTemplate('classic')
  }

  // ── Tabs ────────────────────────────────────────────────────────────────────

  const TABS: { key: Tab; label: string }[] = [
    { key: 'list',    label: 'Brochure List'    },
    { key: 'builder', label: 'Brochure Builder' },
    { key: 'upload',  label: 'Upload Brochure'  },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Brochures"
        breadcrumbs={[{ label: 'Marketing Tools' }, { label: 'Brochures' }]}
        actions={
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Brochure
          </button>
        }
      />

      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── LIST TAB ─────────────────────────────────────────────────────────── */}
      {tab === 'list' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="relative w-60">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search brochures…"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab('builder')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" /> New Brochure
              </button>
              <button
                onClick={() => setUploadOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Upload PDF
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Linked Package</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Created</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-orange-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">No brochures found</p>
                        <p className="text-xs text-gray-400">Try adjusting your search or add a new brochure</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map(row => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5 text-orange-500" />
                          </div>
                          <span className="text-xs font-medium text-gray-800">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge variant={row.type === 'Generated' ? 'orange' : 'info'}>
                          {row.type}
                        </StatusBadge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Package className="w-3 h-3 text-gray-400 shrink-0" />
                          {row.linkedPackage}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{row.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Preview">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Download PDF">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <RowMenu onDelete={() => deleteBrochure(row.id)} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/30">
              <p className="text-[10px] text-gray-400">{filtered.length} brochure{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>
      )}

      {/* ── BUILDER TAB ──────────────────────────────────────────────────────── */}
      {tab === 'builder' && (
        <div className="space-y-4">
          {/* Brochure name + package row */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Brochure Name</label>
                <input
                  type="text"
                  value={brochureName}
                  onChange={e => setBrochureName(e.target.value)}
                  placeholder="e.g. Voltaire Estate Brochure"
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Linked Package</label>
                <div className="relative">
                  <select
                    value={builderPkg}
                    onChange={e => setBuilderPkg(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
                  >
                    <option value="">Select package…</option>
                    {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Two-column builder */}
          <div className="grid grid-cols-[1fr_380px] gap-4 items-start">

            {/* LEFT: Controls */}
            <div className="space-y-4">

              {/* Template selection */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
                <p className="text-xs font-semibold text-gray-700">Template</p>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        template === t.id
                          ? 'border-orange-400 bg-orange-50 ring-1 ring-orange-400/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-800">{t.label}</span>
                        {template === t.id && <Check className="w-3 h-3 text-orange-500" />}
                      </div>
                      <p className="text-[10px] text-gray-400">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section controls */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-700">Sections</p>
                  <div className="flex items-center gap-1.5">
                    {([
                      { kind: 'image'   as SectionKind, icon: Image,      label: 'Image'   },
                      { kind: 'text'    as SectionKind, icon: Type,       label: 'Text'    },
                      { kind: 'pricing' as SectionKind, icon: DollarSign, label: 'Pricing' },
                    ]).map(({ kind, icon: Icon, label }) => (
                      <button
                        key={kind}
                        onClick={() => addSection(kind)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        <Icon className="w-3 h-3" /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                {sections.length === 0 ? (
                  <div className="py-6 text-center border border-dashed border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-400">No sections yet — add Image, Text, or Pricing above</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sections.map(s => (
                      <SectionItem
                        key={s.id}
                        section={s}
                        onChange={content => updateSection(s.id, content)}
                        onRemove={() => removeSection(s.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Customization */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
                <p className="text-xs font-semibold text-gray-700">Customization</p>

                <div className="grid grid-cols-3 gap-4">
                  {/* Logo upload */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Logo</label>
                    <button
                      onClick={() => logoRef.current?.click()}
                      className="w-full h-10 rounded-lg border border-dashed border-gray-200 flex items-center justify-center gap-1.5 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    >
                      {logoUrl ? (
                        <img src={logoUrl} alt="logo" className="h-6 object-contain" />
                      ) : (
                        <>
                          <Upload className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] text-gray-400">Upload</span>
                        </>
                      )}
                    </button>
                    <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </div>

                  {/* Primary color */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Palette className="w-3 h-3" /> Color</span>
                    </label>
                    <div className="flex items-center gap-2 h-10 px-2 border border-gray-200 rounded-lg bg-white">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={e => setPrimaryColor(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                      <span className="text-[10px] text-gray-500 font-mono">{primaryColor}</span>
                    </div>
                  </div>

                  {/* Font */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Font</label>
                    <div className="relative">
                      <select
                        value={font}
                        onChange={e => setFont(e.target.value)}
                        className="w-full appearance-none pl-3 pr-7 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
                      >
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={!brochureName.trim() || !builderPkg}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> Generate Brochure
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* RIGHT: Live preview */}
            <div className="sticky top-5 space-y-2">
              <p className="text-xs font-semibold text-gray-700">Live Preview</p>
              <LivePreview
                template={template}
                sections={sections}
                primaryColor={primaryColor}
                font={font}
                logoUrl={logoUrl}
                packageName={builderPkg}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── UPLOAD TAB ───────────────────────────────────────────────────────── */}
      {tab === 'upload' && (
        <UploadTabPanel
          onSave={(name, pkg) => {
            handleUploadSave(name, pkg)
            setTab('list')
          }}
        />
      )}

      {/* Upload modal (from header button) */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSave={handleUploadSave}
      />
    </div>
  )
}

// ── Upload Tab Panel ──────────────────────────────────────────────────────────

function UploadTabPanel({ onSave }: { onSave: (name: string, pkg: string) => void }) {
  const [name, setName]   = useState('')
  const [pkg, setPkg]     = useState('')
  const [file, setFile]   = useState<File | null>(null)
  const fileRef           = useRef<HTMLInputElement>(null)

  function handleSave() {
    if (!name.trim() || !pkg) return
    onSave(name.trim(), pkg)
    setName(''); setPkg(''); setFile(null)
  }

  return (
    <div className="max-w-lg">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
        <p className="text-sm font-semibold text-gray-800">Upload a Brochure PDF</p>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Brochure Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Voltaire Estate Info Pack"
            className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Assign to Package</label>
          <div className="relative">
            <select
              value={pkg}
              onChange={e => setPkg(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
            >
              <option value="">Select package…</option>
              {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">PDF File</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="h-28 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-colors"
          >
            {file ? (
              <>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-xs text-gray-700 font-medium">{file.name}</span>
                <span className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(0)} KB</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">Click to upload PDF</span>
                <span className="text-[10px] text-gray-400">PDF up to 20MB</span>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={!name.trim() || !pkg}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Upload className="w-3.5 h-3.5" /> Save Brochure
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
