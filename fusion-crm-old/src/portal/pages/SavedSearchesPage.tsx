import { useState } from 'react'
import { Bell, BellOff, Trash2, MapPin, DollarSign, Home } from 'lucide-react'
import clsx from 'clsx'

interface SavedSearch {
  id: string
  name: string
  priceRange: string
  type: string
  location: string
  alertsEnabled: boolean
  createdAt: string
  matchCount: number
}

const initialSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'Family homes in Clyde North',
    priceRange: '$600k – $800k',
    type: 'House & Land',
    location: 'Clyde North, VIC',
    alertsEnabled: true,
    createdAt: '12 Apr 2026',
    matchCount: 8,
  },
  {
    id: '2',
    name: 'Affordable apartments',
    priceRange: 'Under $500k',
    type: 'Apartment',
    location: 'All Locations',
    alertsEnabled: false,
    createdAt: '8 Apr 2026',
    matchCount: 12,
  },
  {
    id: '3',
    name: 'Land in Wollert',
    priceRange: '$300k – $400k',
    type: 'Land',
    location: 'Wollert, VIC',
    alertsEnabled: true,
    createdAt: '3 Apr 2026',
    matchCount: 3,
  },
]

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState(initialSearches)

  const toggleAlert = (id: string) => {
    setSearches(prev => prev.map(s => s.id === id ? { ...s, alertsEnabled: !s.alertsEnabled } : s))
  }

  const deleteSearch = (id: string) => {
    setSearches(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Saved Searches</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your saved property searches and email alerts
        </p>
      </div>

      {/* List */}
      {searches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">No saved searches yet</p>
          <p className="text-xs text-gray-400 mt-1">Create a search from the listings page</p>
        </div>
      ) : (
        <div className="space-y-4">
          {searches.map(search => (
            <div
              key={search.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-orange-100 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">{search.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      {search.priceRange}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-gray-400" />
                      {search.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {search.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <span className="text-gray-400">Created {search.createdAt}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="font-medium text-orange-600">{search.matchCount} matches</span>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Alert toggle */}
                  <button
                    onClick={() => toggleAlert(search.id)}
                    className={clsx(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors',
                      search.alertsEnabled
                        ? 'bg-orange-50 border-orange-200 text-orange-600'
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    )}
                    title={search.alertsEnabled ? 'Alerts enabled' : 'Alerts disabled'}
                  >
                    {search.alertsEnabled ? (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Alerts On</span>
                      </>
                    ) : (
                      <>
                        <BellOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Alerts Off</span>
                      </>
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteSearch(search.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete search"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info box */}
      {searches.length > 0 && (
        <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Bell className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800">Email Alerts</p>
              <p className="text-xs text-orange-600 mt-1 leading-relaxed">
                When alerts are enabled, you'll receive an email notification whenever a new property matches your saved search criteria.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
