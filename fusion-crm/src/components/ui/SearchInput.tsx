import { Search } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  className?: string
}

export default function SearchInput({ placeholder = 'Search...', value, onChange, className }: Props) {
  return (
    <div className={clsx('relative', className)}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
      />
    </div>
  )
}
