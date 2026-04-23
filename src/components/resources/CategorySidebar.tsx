import clsx from 'clsx'
import { Library, Rocket, DollarSign, Globe, Users, Mail, Settings } from 'lucide-react'
import type { CategoryIconKey } from '../../data/resourcesData'

const ICON_MAP: Record<CategoryIconKey, React.ReactNode> = {
  library:  <Library    className="w-3.5 h-3.5" />,
  rocket:   <Rocket     className="w-3.5 h-3.5" />,
  dollar:   <DollarSign className="w-3.5 h-3.5" />,
  globe:    <Globe      className="w-3.5 h-3.5" />,
  users:    <Users      className="w-3.5 h-3.5" />,
  mail:     <Mail       className="w-3.5 h-3.5" />,
  settings: <Settings   className="w-3.5 h-3.5" />,
}

export interface SubCategory {
  id: string
  label: string
}

export interface Category {
  id: string
  label: string
  icon: CategoryIconKey
  subcategories: SubCategory[]
}

interface Props {
  categories: Category[]
  activeCategory: string
  activeSubcategory: string
  onCategoryChange: (cat: string) => void
  onSubcategoryChange: (sub: string) => void
  countFor?: (catId: string) => number
  countForSub?: (subId: string) => number
  mode?: 'sidebar' | 'compact'
}

export default function CategorySidebar({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  countFor,
  countForSub,
  mode = 'sidebar',
}: Props) {
  const isCompact = mode === 'compact'

  return (
    <aside className={clsx('flex-shrink-0', isCompact ? 'w-full' : 'w-48')}>
      <p className={clsx(
        'text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2',
        isCompact ? '' : 'px-2'
      )}>
        Categories
      </p>

      <nav className={clsx(
        isCompact
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5'
          : 'flex flex-col gap-0.5'
      )}>
        {categories.map(cat => {
          const isActive = activeCategory === cat.id
          return (
            <div key={cat.id}>
              <button
                onClick={() => { onCategoryChange(cat.id); onSubcategoryChange('') }}
                className={clsx(
                  'w-full flex items-center justify-between rounded-lg text-xs transition-colors text-left group',
                  isCompact ? 'px-3 py-2 border' : 'px-2.5 py-1.5',
                  isActive
                    ? isCompact
                      ? 'bg-orange-50 text-orange-600 border-orange-100 font-medium'
                      : 'bg-orange-50 text-orange-600 font-medium'
                    : isCompact
                      ? 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50 hover:border-gray-100'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="flex-shrink-0">{ICON_MAP[cat.icon]}</span>
                  <span className="truncate">{cat.label}</span>
                </span>
                {countFor && (
                  <span className={clsx(
                    'text-[10px] tabular-nums flex-shrink-0 ml-1',
                    isActive ? 'text-orange-400' : 'text-gray-300 group-hover:text-gray-400'
                  )}>
                    {countFor(cat.id)}
                  </span>
                )}
              </button>

              {isActive && cat.subcategories.length > 0 && (
                <div className={clsx(
                  isCompact
                    ? 'mt-1 mb-0.5 flex flex-wrap gap-1'
                    : 'ml-6 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-gray-100 pl-2.5'
                )}>
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => onSubcategoryChange(activeSubcategory === sub.id ? '' : sub.id)}
                      className={clsx(
                        isCompact
                          ? 'flex items-center gap-1.5 py-1 px-2 rounded text-[11px] transition-colors text-left'
                          : 'w-full flex items-center justify-between py-1 px-1.5 rounded text-[11px] transition-colors text-left',
                        activeSubcategory === sub.id
                          ? isCompact ? 'text-orange-500 font-medium bg-orange-50' : 'text-orange-500 font-medium'
                          : isCompact ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50' : 'text-gray-400 hover:text-gray-600'
                      )}
                    >
                      <span>{sub.label}</span>
                      {countForSub && (
                        <span className="text-gray-300 text-[10px]">{countForSub(sub.id)}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
