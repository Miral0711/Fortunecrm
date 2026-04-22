import clsx from 'clsx'

interface Props {
  enabled: boolean
  onChange: () => void
  label?: string
  className?: string
}

export default function Toggle({ enabled, onChange, label, className }: Props) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={clsx('flex items-center gap-2', className)}
    >
      <div
        className={clsx(
          'relative inline-flex items-center rounded-full transition-colors duration-200',
          enabled ? 'bg-orange-500' : 'bg-gray-200'
        )}
        style={{ height: 18, width: 32 }}
      >
        <span
          className={clsx(
            'inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200',
            enabled ? 'translate-x-4' : 'translate-x-0.5'
          )}
        />
      </div>
      {label && (
        <span className={clsx('text-xs font-medium transition-colors', enabled ? 'text-gray-800' : 'text-gray-500')}>
          {label}
        </span>
      )}
    </button>
  )
}
