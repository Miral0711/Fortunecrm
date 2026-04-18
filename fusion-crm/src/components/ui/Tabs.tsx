import clsx from 'clsx'

interface Tab {
  label: string
  value: string
}

interface Props {
  tabs: Tab[]
  active: string
  onChange: (v: string) => void
  className?: string
}

export default function Tabs({ tabs, active, onChange, className }: Props) {
  return (
    <div className={clsx('flex gap-1 bg-gray-100 p-0.5 rounded-lg', className)}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
            active === tab.value
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
