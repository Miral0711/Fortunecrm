import { useState } from 'react'
import {
  Search, Bell, Trash2, Calendar, MapPin,
  ChevronRight, ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'

interface SavedSearch {
  id: string
  name: string
  filters: string
  date: string
  results: number
  newResults: number
}

const SAVED_SEARCHES: SavedSearch[] = [
  { id: '1', name: 'Houses in Tarneit', filters: 'Project: Harlow · Type: House · Beds: 4+', date: '14 Apr 2026', results: 24, newResults: 3 },
  { id: '2', name: 'Duplex SMSF Diggers Rest', filters: 'Type: Duplex · SMSF: Yes · Suburb: Diggers Rest', date: '08 Mar 2026', results: 5, newResults: 0 },
  { id: '3', name: 'Clyde North Land', filters: 'Type: Land · Price: < 400k', date: '22 Feb 2026', results: 12, newResults: 1 },
]

export default function SavedSearchesPage() {
  const navigate = useNavigate()
  const [searches, setSearches] = useState(SAVED_SEARCHES)

  const deleteSearch = (id: string) => {
    setSearches(searches.filter(s => s.id !== id))
  }

  return (
    <PageWrapper>
      {/* Header removed */}

      <div className="grid grid-cols-1 gap-4">
        {searches.map((search) => (
          <div
            key={search.id}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-orange-100 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-base group-hover:text-orange-600 transition-colors">{search.name}</h3>
                  {search.newResults > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {search.newResults} NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Saved on {search.date}</span>
                  <span className="flex items-center gap-1"><Search className="w-3.5 h-3.5" /> {search.results} total results</span>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium text-gray-400 uppercase text-[9px] tracking-wider block mb-1">Search Criteria</span>
                    {search.filters}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all border border-transparent hover:border-gray-100"
                  title="Notifications"
                >
                  <Bell className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => deleteSearch(search.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                  title="Delete"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => navigate('/portal/listings')}
                  className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-all shadow-sm"
                >
                  View Results <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {searches.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-800">No saved searches</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">You haven't saved any property searches yet. Use the filters on the listings page to find what you're looking for!</p>
            <button
              onClick={() => navigate('/portal/listings')}
              className="mt-6 px-6 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-all"
            >
              Go to Listings
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
