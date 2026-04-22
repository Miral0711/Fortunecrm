import clsx from 'clsx'

export interface SubCategory {
  id: string
  label: string
}

export interface Category {
  id: string
  label: string
  icon: string
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
}

export default function CategorySidebar({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  countFor,
  countForSub,
}: Props) {
  return (
    <aside className="w-48 flex-shrink-0">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
        Categories
      </p>

      <nav className="flex flex-col gap-0.5">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id
          return (
            <div key={cat.id}>
              <button
                onClick={() => { onCategoryChange(cat.id); onSubcategoryChange('') }}
                className={clsx(
                  'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left group',
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-sm leading-none flex-shrink-0">{cat.icon}</span>
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
                <div className="ml-6 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-gray-100 pl-2.5">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => onSubcategoryChange(activeSubcategory === sub.id ? '' : sub.id)}
                      className={clsx(
                        'w-full flex items-center justify-between py-1 px-1.5 rounded text-[11px] transition-colors text-left',
                        activeSubcategory === sub.id
                          ? 'text-orange-500 font-medium'
                          : 'text-gray-400 hover:text-gray-600'
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
