import { useState, useCallback } from 'react'

export function useSelection<T extends string>(initialIds: T[] = []) {
  const [selected, setSelected] = useState<Set<T>>(new Set(initialIds))

  const toggle = useCallback((id: T) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const selectAll = useCallback((ids: T[]) => {
    setSelected(new Set(ids))
  }, [])

  const clear = useCallback(() => {
    setSelected(new Set())
  }, [])

  const isSelected = useCallback((id: T) => selected.has(id), [selected])

  const toggleAll = useCallback((ids: T[]) => {
    const allSelected = ids.every(id => selected.has(id))
    if (allSelected) {
      setSelected(prev => {
        const next = new Set(prev)
        ids.forEach(id => next.delete(id))
        return next
      })
    } else {
      setSelected(prev => {
        const next = new Set(prev)
        ids.forEach(id => next.add(id))
        return next
      })
    }
  }, [selected])

  return {
    selected,
    toggle,
    selectAll,
    clear,
    isSelected,
    toggleAll,
    count: selected.size,
    hasAny: selected.size > 0,
  }
}
