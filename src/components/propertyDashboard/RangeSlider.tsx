interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  ariaLabel: string
  compact?: boolean
  hideBounds?: boolean
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled,
  ariaLabel,
  compact = false,
  hideBounds = false,
}: RangeSliderProps) {
  const progress = ((value - min) / (max - min)) * 100

  return (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      <div className={compact ? 'relative h-5' : 'relative h-8'}>
        <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 ${compact ? 'h-1.5' : 'h-2'}`} />
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 ${compact ? 'h-1.5' : 'h-2'}`}
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={ariaLabel}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed disabled:opacity-60 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent ${
            compact
              ? '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orange-400 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-400 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow'
              : '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orange-400 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-400 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow'
          }`}
        />
      </div>
      {!hideBounds && (
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
