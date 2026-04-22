import clsx from 'clsx'

interface Props {
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}

export default function ActionBar({ left, right, className }: Props) {
  return (
    <div className={clsx('flex items-center justify-between gap-3 flex-wrap', className)}>
      {left && <div className="flex items-center gap-2">{left}</div>}
      {right && <div className="flex items-center gap-2 ml-auto">{right}</div>}
    </div>
  )
}
