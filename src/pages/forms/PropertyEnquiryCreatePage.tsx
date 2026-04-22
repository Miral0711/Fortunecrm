import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Plus, X } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

// ── Helpers ───────────────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {children}{required && <span className="text-orange-500 ml-0.5">*</span>}
    </label>
  )
}

function Input({ placeholder, value, onChange, disabled, className = '' }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void
  disabled?: boolean; className?: string
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value ?? ''}
      disabled={disabled}
      onChange={e => onChange?.(e.target.value)}
      className={`w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 disabled:bg-gray-50 disabled:text-gray-400 ${className}`}
    />
  )
}

function SelectInput({ placeholder, options, value, onChange }: {
  placeholder?: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none pl-3 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer"
      >
        <option value="">{placeholder ?? 'Select'}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-700 text-center mb-5">{children}</h3>
  )
}

function Divider() {
  return <hr className="border-gray-100 my-6" />
}

// ── Property Request Row ──────────────────────────────────────────────────────

interface PropertyRequest { id: number; property: string; lot: string }

function PropertyRequestRow({ row, onRemove, onChange }: {
  row: PropertyRequest
  onRemove: () => void
  onChange: (field: 'property' | 'lot', val: string) => void
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-1">
        <SelectInput
          placeholder="Property Name"
          options={['Sunrise Estate', 'Greenfield Park', 'Lakeside Heights', 'Metro Central']}
          value={row.property}
          onChange={v => onChange('property', v)}
        />
      </div>
      <div className="flex-1">
        <SelectInput
          placeholder="Lot No"
          options={['Lot 1', 'Lot 2', 'Lot 3', 'Lot 4', 'Lot 5']}
          value={row.lot}
          onChange={v => onChange('lot', v)}
        />
      </div>
      {onRemove && (
        <button onClick={onRemove} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const ACCOUNT_TYPES = ['Agent', 'Referral Partner', 'BDM', 'Affiliate']
const AGENTS = ['Chris Bockisch (Current User)', 'Jinalkumar Patel', 'Sandy Arora', 'Craig Cameron']
const CLIENTS = ['New User', 'Bhavesh Mishra', 'Gaurav Bhatia', 'Chris Bockisch']
const STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

const INFO_CHECKBOXES = [
  'Lots or stocks availability',
  'Lot Brochure',
  'Floor plan',
  'Stage/Site Plan',
  'Inclusions and Specifications',
  'Rental Appraisal',
  'Body Corporate Fees',
  'Council Rates',
  'Deposit Requirements i.e holding fee',
  'Land Registration date',
  'Specific Property Report ($55 per SPR)',
  'Property Inspection (refer to property inspection request section below)',
]

export default function PropertyEnquiryCreatePage() {
  const navigate = useNavigate()

  // Agent/Referrer
  const [accountType,    setAccountType]    = useState('')
  const [agentName,      setAgentName]      = useState('Chris Bockisch (Current User)')
  const [agentFirstName, setAgentFirstName] = useState('Chris')
  const [agentLastName,  setAgentLastName]  = useState('Bockisch')
  const [agentEmail,     setAgentEmail]     = useState('chris@propertymailbox.com.au')
  const [agentPhone,     setAgentPhone]     = useState('0414 274 357')

  // Client
  const [clientSelect,   setClientSelect]   = useState('New User')
  const [clientFirst,    setClientFirst]    = useState('')
  const [clientLast,     setClientLast]     = useState('')
  const [clientEmail,    setClientEmail]    = useState('')
  const [clientPhone,    setClientPhone]    = useState('')
  const [street,         setStreet]         = useState('')
  const [suburb,         setSuburb]         = useState('')
  const [city,           setCity]           = useState('')
  const [state,          setState]          = useState('')
  const [postcode,       setPostcode]       = useState('')

  // Purchaser type
  const [purchaserTypes, setPurchaserTypes] = useState<string[]>([])
  const [otherPurchaser, setOtherPurchaser] = useState('')

  // Finance
  const [financeType, setFinanceType] = useState<'pre-approval' | 'cash'>('cash')

  // Property requests
  const [requests, setRequests] = useState<PropertyRequest[]>([{ id: 1, property: '', lot: '' }])
  const nextId = () => Math.max(...requests.map(r => r.id)) + 1

  // Info checkboxes
  const [infoChecked, setInfoChecked] = useState<string[]>([])
  const [otherInfo,   setOtherInfo]   = useState(false)
  const [comments,    setComments]    = useState('')

  function togglePurchaser(val: string) {
    setPurchaserTypes(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  function toggleInfo(val: string) {
    setInfoChecked(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  function addRequest() {
    setRequests(prev => [...prev, { id: nextId(), property: '', lot: '' }])
  }

  function removeRequest(id: number) {
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  function updateRequest(id: number, field: 'property' | 'lot', val: string) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/forms/property-enquiry')
  }

  return (
    <div>
      <PageHeader
        title="Property Enquiry Form - Create"
        subtitle="Complete this form when requesting for more information about a specific property (one property enquiry form per client)."
        breadcrumbs={[{ label: 'Online Forms' }, { label: 'Property Enquiry', path: '/forms/property-enquiry' }, { label: 'Create' }]}
        actions={
          <button
            onClick={() => navigate('/forms/property-enquiry')}
            className="px-4 py-2 text-xs font-medium border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Back to Property Enquiry
          </button>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          {/* ── Agent/Referrer Details ── */}
          <SectionTitle>Agent/Referrer Details</SectionTitle>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Account type</Label>
              <SelectInput placeholder="Select Account type" options={ACCOUNT_TYPES} value={accountType} onChange={setAccountType} />
            </div>
            <div>
              <Label required>Select Name of Agent/Referrer</Label>
              <SelectInput placeholder="Select Agent" options={AGENTS} value={agentName} onChange={setAgentName} />
            </div>
          </div>

          <div className="mb-4">
            <Label required>Name of Agent/Referrer</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Firstname" value={agentFirstName} onChange={setAgentFirstName} />
              <Input placeholder="Lastname" value={agentLastName} onChange={setAgentLastName} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label required>Agent/Referrer Email</Label>
              <Input placeholder="example@example.com" value={agentEmail} onChange={setAgentEmail} />
            </div>
            <div>
              <Label required>Agent/Referrer Number</Label>
              <Input placeholder="" value={agentPhone} onChange={setAgentPhone} />
            </div>
          </div>

          <Divider />

          {/* ── Client Details ── */}
          <SectionTitle>Client Details</SectionTitle>

          <div className="mb-4">
            <Label required>Select Name of Client</Label>
            <div className="max-w-xs">
              <SelectInput placeholder="Select Client" options={CLIENTS} value={clientSelect} onChange={setClientSelect} />
            </div>
          </div>

          <div className="mb-4">
            <Label required>Name of Client</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Firstname" value={clientFirst} onChange={setClientFirst} />
              <Input placeholder="Lastname" value={clientLast} onChange={setClientLast} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>Client Email</Label>
              <Input placeholder="example@example.com" value={clientEmail} onChange={setClientEmail} />
            </div>
            <div>
              <Label required>Client Phone Number</Label>
              <Input placeholder="" value={clientPhone} onChange={setClientPhone} />
            </div>
          </div>

          <div className="mb-4">
            <Label>Client Address</Label>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Input placeholder="Street" value={street} onChange={setStreet} />
              <Input placeholder="Suburb" value={suburb} onChange={setSuburb} />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <Input placeholder="City" value={city} onChange={setCity} />
              <SelectInput placeholder="Select State" options={STATES} value={state} onChange={setState} />
              <Input placeholder="State/Province" disabled />
            </div>
            <div className="max-w-[160px]">
              <Input placeholder="Postal/Zip code" value={postcode} onChange={setPostcode} />
            </div>
          </div>

          <div className="mb-4">
            <Label required>Type of Purchaser</Label>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {['Investor', 'Owner Occupier', 'FIRB'].map(t => (
                <label key={t} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purchaserTypes.includes(t)}
                    onChange={() => togglePurchaser(t)}
                    className="w-3.5 h-3.5 accent-orange-500"
                  />
                  {t}
                </label>
              ))}
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={purchaserTypes.includes('Other')}
                  onChange={() => togglePurchaser('Other')}
                  className="w-3.5 h-3.5 accent-orange-500"
                />
                Other
              </label>
              {purchaserTypes.includes('Other') && (
                <Input placeholder="Other" value={otherPurchaser} onChange={setOtherPurchaser} className="max-w-[160px]" />
              )}
            </div>
          </div>

          <div className="mb-4">
            <Label>Finance</Label>
            <div className="flex flex-col gap-1.5 mt-1">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="finance"
                  value="pre-approval"
                  checked={financeType === 'pre-approval'}
                  onChange={() => setFinanceType('pre-approval')}
                  className="accent-orange-500"
                />
                Pre-approval (attach the finance pre-approval letter from the lender or a screenshot of the confirmation of finance pre-approval from the broker or bank)
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="finance"
                  value="cash"
                  checked={financeType === 'cash'}
                  onChange={() => setFinanceType('cash')}
                  className="accent-orange-500"
                />
                Cash Purchase
              </label>
            </div>
            {financeType === 'pre-approval' && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Attach finance pre-approval letter OR finance comfort letter/email from the finance broker:</p>
                <input type="file" className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-gray-200 file:text-xs file:bg-white file:text-gray-600 hover:file:bg-gray-50" />
              </div>
            )}
          </div>

          <Divider />

          {/* ── Property Request ── */}
          <SectionTitle>Detail your specific request below</SectionTitle>
          <p className="text-xs text-gray-500 text-center -mt-3 mb-4">
            Enter the name of the project and select the lot number then click ADD Button. You can select multiple lots and enquire for multiple projects.
          </p>

          <div className="mb-2">
            <Label required>Requesting information for</Label>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Name of Property/Development</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Unit/Lot Number</span>
          </div>

          {requests.map((row, idx) => (
            <PropertyRequestRow
              key={row.id}
              row={row}
              onRemove={requests.length > 1 ? () => removeRequest(row.id) : () => {}}
              onChange={(field, val) => updateRequest(row.id, field, val)}
            />
          ))}

          <button
            type="button"
            onClick={addRequest}
            className="mt-1 mb-5 flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>

          <div className="mb-4">
            <Label>Requesting info regarding (Select one or more)</Label>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
              {INFO_CHECKBOXES.map(item => (
                <label key={item} className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={infoChecked.includes(item)}
                    onChange={() => toggleInfo(item)}
                    className="mt-0.5 w-3.5 h-3.5 accent-orange-500 shrink-0"
                  />
                  {item}
                </label>
              ))}
              <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={otherInfo}
                  onChange={() => setOtherInfo(v => !v)}
                  className="mt-0.5 w-3.5 h-3.5 accent-orange-500 shrink-0"
                />
                Other
              </label>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-500">
              SPECIFIC PROPERTY REPORT SAMPLE{' '}
              <a href="#" className="text-orange-500 font-medium hover:underline">CLICK HERE</a>
            </p>
          </div>

          <div className="mb-4">
            <Label>Additional Comments or Instructions</Label>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Comments"
              rows={4}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 resize-y"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}
