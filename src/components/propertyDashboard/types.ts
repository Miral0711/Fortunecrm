export interface DashboardListItem {
  id: string
  name: string
  suburb: string
  state: string
  priceLabel: string
  type: string
  buildStatus: string
  rentalYield: string
  availableLots: number
  tags: string[]
  date: string
  image?: string
  imgGrad?: string
}

export interface DashboardMapItem {
  id: string
  name: string
  suburb: string
  state: string
  priceLabel: string
}
