import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Bed, Bath, Car, Ruler, Download,
  Mail, Heart, CheckCircle2, ChevronRight,
} from 'lucide-react'
import clsx from 'clsx'
import { listings } from '../data/listingsData'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = listings.find(l => l.id === id)
  const [saved, setSaved] = useState(false)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [enquireSent, setEnquireSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  if (!listing) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Property not found.</p>
        <button onClick={() => navigate('/portal/listings')} className="mt-4 text-sm text-orange-500 hover:underline">
          Back to listings
        </button>
      </div>
    )
  }

  const handleEnquire = (e: React.FormEvent) => {
    e.preventDefault()
    setEnquireSent(true)
    setTimeout(() => { setEnquireOpen(false); setEnquireSent(false) }, 2000)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
      {/* Back */}
      <button
        onClick={() => navigate('/portal/listings')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-72 md:h-96">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.featured && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            <button
              onClick={() => setSaved(s => !s)}
              className={clsx(
                'absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm',
                saved ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 hover:text-orange-500'
              )}
            >
              <Heart className={clsx('w-4 h-4', saved && 'fill-current')} />
            </button>
          </div>

          {/* Title & location */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-1">{listing.project}</p>
                <h1 className="text-xl font-semibold text-gray-800">{listing.title}</h1>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {listing.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{listing.priceLabel}</p>
                <span className={clsx(
                  'inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded-full',
                  listing.status === 'Available' ? 'bg-green-50 text-green-700' :
                  listing.status === 'Under Offer' ? 'bg-orange-50 text-orange-600' :
                  'bg-gray-100 text-gray-500'
                )}>
                  {listing.status}
                </span>
              </div>
            </div>
          </div>

          {/* Specs row */}
          {listing.type !== 'Land' && (
            <div className="flex items-center gap-6 bg-white rounded-2xl border border-gray-100 px-6 py-4">
              <SpecItem icon={Bed} label="Bedrooms" value={String(listing.bedrooms)} />
              <div className="w-px h-8 bg-gray-100" />
              <SpecItem icon={Bath} label="Bathrooms" value={String(listing.bathrooms)} />
              <div className="w-px h-8 bg-gray-100" />
              <SpecItem icon={Car} label="Garage" value={String(listing.garage)} />
              <div className="w-px h-8 bg-gray-100" />
              <SpecItem icon={Ruler} label="Land Size" value={listing.landSize} />
            </div>
          )}

          {/* Description */}
          <Section title="About this property">
            <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
          </Section>

          {/* Features */}
          {listing.features.length > 0 && (
            <Section title="Features">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Inclusions */}
          {listing.inclusions.length > 0 && (
            <Section title="Inclusions">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.inclusions.map(inc => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-orange-300 shrink-0 mt-0.5" />
                    {inc}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Right: action panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 space-y-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Interested in this property?</p>

            {/* Enquire */}
            <button
              onClick={() => setEnquireOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enquire Now
            </button>

            {/* Download brochure */}
            <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-xl border border-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              Download Brochure
            </button>

            {/* Save */}
            <button
              onClick={() => setSaved(s => !s)}
              className={clsx(
                'w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl border transition-colors',
                saved
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              )}
            >
              <Heart className={clsx('w-4 h-4', saved && 'fill-current text-orange-500')} />
              {saved ? 'Saved' : 'Save Property'}
            </button>

            <div className="border-t border-gray-50 pt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Type</span>
                <span className="text-gray-700 font-medium">{listing.type}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Land Size</span>
                <span className="text-gray-700 font-medium">{listing.landSize}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Status</span>
                <span className="text-gray-700 font-medium">{listing.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquire modal */}
      {enquireOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {enquireSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Enquiry sent!</p>
                <p className="text-sm text-gray-500 mt-1">We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-gray-800">Enquire about {listing.title}</h2>
                  <button onClick={() => setEnquireOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                </div>
                <form onSubmit={handleEnquire} className="space-y-3">
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                  />
                  <input
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                  />
                  <textarea
                    rows={3}
                    placeholder="Your message (optional)"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                  >
                    Send Enquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function SpecItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <Icon className="w-4 h-4 text-orange-400" />
      <p className="text-sm font-semibold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  )
}
