import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{children}</label>
}

function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
    />
  )
}

function SelectInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30">
        <option>{placeholder}</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  )
}

export default function SalesCreatePage() {
  const navigate = useNavigate()
  const [commentsEnabled, setCommentsEnabled] = useState(false)
  const [sasEnabled, setSasEnabled] = useState(false)

  return (
    <PageWrapper>
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Create</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">Reservation Details</p>
          </div>
          <button
            onClick={() => navigate('/sales')}
            className="rounded-lg border border-orange-200 px-3 py-1.5 text-xs font-medium text-orange-500 transition-colors hover:bg-orange-50"
          >
            Go Back
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <FieldLabel>Client</FieldLabel>
                <SelectInput placeholder="Select Client" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Developer</FieldLabel>
                <SelectInput placeholder="Select Developer" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Project</FieldLabel>
                <SelectInput placeholder="Select Project" />
              </div>
              <div className="space-y-1">
                <FieldLabel>Lot</FieldLabel>
                <SelectInput placeholder="Select Lot" />
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-3">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">Commission In - Received</h2>
              <div className="space-y-2">
                <div className="space-y-1">
                  <FieldLabel>Comm In Notes</FieldLabel>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
                  />
                </div>
                <div className="space-y-1">
                  <FieldLabel>Comms In - Total</FieldLabel>
                  <TextInput placeholder="" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-3">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">Reserve Comments</h2>
              <button
                type="button"
                onClick={() => setCommentsEnabled(v => !v)}
                className="mb-2 flex items-center gap-2"
              >
                <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${commentsEnabled ? 'bg-orange-500' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${commentsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </span>
                <span className="text-xs text-gray-600">Comments Enabled</span>
              </button>
              <div className="space-y-1">
                <FieldLabel>Comments</FieldLabel>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-100 p-3">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">Commission Out - Paid</h2>
              <div className="space-y-2">
                <div className="space-y-1">
                  <FieldLabel>Comm Out Notes</FieldLabel>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
                  />
                </div>
                <div className="space-y-1">
                  <FieldLabel>Comms Out - Total</FieldLabel>
                  <TextInput placeholder="" />
                </div>
                <div className="space-y-1">
                  <FieldLabel>PIAB Commissions</FieldLabel>
                  <TextInput placeholder="" />
                </div>
                <div className="space-y-1">
                  <FieldLabel>Affiliate</FieldLabel>
                  <SelectInput placeholder="Select an option" />
                </div>
                <div className="space-y-1">
                  <FieldLabel>Affiliate Commission</FieldLabel>
                  <TextInput placeholder="" />
                </div>
                <button
                  type="button"
                  onClick={() => setSasEnabled(v => !v)}
                  className="flex items-center gap-2"
                >
                  <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${sasEnabled ? 'bg-orange-500' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${sasEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </span>
                  <span className="text-xs text-gray-600">Is SAS Enabled</span>
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <FieldLabel>Min SAS</FieldLabel>
                    <TextInput placeholder="" />
                  </div>
                  <div className="space-y-1">
                    <FieldLabel>Max SAS</FieldLabel>
                    <TextInput placeholder="" />
                  </div>
                  <div className="space-y-1">
                    <FieldLabel>SAS Fee</FieldLabel>
                    <TextInput placeholder="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-3">
              <div className="space-y-2">
                {['Subscriber', 'Sales Agent', 'BDM', 'Referral Partner', 'Agent'].map((role) => (
                  <div key={role} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_80px_1fr]">
                    <div className="space-y-1">
                      <FieldLabel>{role}</FieldLabel>
                      <SelectInput placeholder={`Select ${role}`} />
                    </div>
                    <div className="space-y-1">
                      <FieldLabel>Percent</FieldLabel>
                      <TextInput placeholder="0" />
                    </div>
                    <div className="space-y-1">
                      <FieldLabel>Commission</FieldLabel>
                      <TextInput placeholder="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={() => navigate('/sales')}
            className="rounded-lg bg-slate-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Cancel
          </button>
          <button className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600">
            Submit
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
