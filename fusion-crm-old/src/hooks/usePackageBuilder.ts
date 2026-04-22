import { useState, useCallback } from 'react'

export interface PackageItem {
  id: string
  name: string
  price: number
  [key: string]: unknown
}

export interface PriceAdjustment {
  label: string
  value: number
}

export interface PackageState<TLot, TDesign, TFacade, TInclusion> {
  lot: TLot | null
  design: TDesign | null
  facade: TFacade | null
  inclusions: TInclusion[]
  adjustments: PriceAdjustment[]
}

export function usePackageBuilder<
  TLot extends PackageItem,
  TDesign extends PackageItem,
  TFacade extends PackageItem,
  TInclusion extends PackageItem,
>(initialAdjustments: PriceAdjustment[] = []) {
  const [state, setState] = useState<PackageState<TLot, TDesign, TFacade, TInclusion>>({
    lot: null,
    design: null,
    facade: null,
    inclusions: [],
    adjustments: initialAdjustments,
  })

  const setLot = useCallback((lot: TLot | null) => {
    setState(prev => ({ ...prev, lot }))
  }, [])

  const setDesign = useCallback((design: TDesign | null) => {
    setState(prev => ({ ...prev, design }))
  }, [])

  const setFacade = useCallback((facade: TFacade | null) => {
    setState(prev => ({ ...prev, facade }))
  }, [])

  const toggleInclusion = useCallback((inclusion: TInclusion) => {
    setState(prev => ({
      ...prev,
      inclusions: prev.inclusions.some(i => i.id === inclusion.id)
        ? prev.inclusions.filter(i => i.id !== inclusion.id)
        : [...prev.inclusions, inclusion],
    }))
  }, [])

  const updateAdjustment = useCallback((label: string, value: number) => {
    setState(prev => ({
      ...prev,
      adjustments: prev.adjustments.map(adj =>
        adj.label === label ? { ...adj, value } : adj
      ),
    }))
  }, [])

  const calculateTotal = useCallback(() => {
    const lotPrice = state.lot?.price ?? 0
    const designPrice = state.design?.price ?? 0
    const facadePrice = state.facade?.price ?? 0
    const inclusionsTotal = state.inclusions.reduce((sum, i) => sum + i.price, 0)
    const adjustmentsTotal = state.adjustments.reduce((sum, a) => sum + a.value, 0)
    return lotPrice + designPrice + facadePrice + inclusionsTotal + adjustmentsTotal
  }, [state])

  const reset = useCallback(() => {
    setState({
      lot: null,
      design: null,
      facade: null,
      inclusions: [],
      adjustments: initialAdjustments,
    })
  }, [initialAdjustments])

  return {
    state,
    setLot,
    setDesign,
    setFacade,
    toggleInclusion,
    updateAdjustment,
    calculateTotal,
    reset,
    isIncluded: (id: string) => state.inclusions.some(i => i.id === id),
  }
}
