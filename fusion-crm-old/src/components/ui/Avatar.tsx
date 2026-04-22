import clsx from 'clsx'

interface Props {
  name: string
  size?: 'sm' | 'md'
  className?: string
}

const COLORS = [
  'from-orange-400 to-orange-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
]

function initials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

function colorFor(name: string) {
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx]
}

export default function Avatar({ name, size = 'md', className }: Props) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-8 h-8 text-xs'
  return (
    <div className={clsx(`rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold shrink-0`, sz, colorFor(name), className)}>
      {initials(name)}
    </div>
  )
}
