import { useMemo } from 'react'

export interface PricingItem {
  label: string
  value: number
  prefix?: string
}

export function usePricing(items: PricingItem[]) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.value, 0),
    [items]
  )

  const formatted = useMemo(
    () => `$${total.toLocaleString()}`,
    [total]
  )

  return { total, formatted, items }
}
