export type LibraryTab = 'designs' | 'facades' | 'inclusions' | 'pricing-rules'

export type LibraryCategory =
  | 'Single Storey'
  | 'Double Storey'
  | 'Duplex'
  | 'Townhouse'
  | 'Granny Flat'
  | 'Standard'
  | 'Premium'
  | 'Luxury'
  | 'Structural'
  | 'Electrical'
  | 'Plumbing'
  | 'Flooring'
  | 'Cabinetry'
  | 'Fixed Price'
  | 'Provisional Sum'
  | 'Prime Cost'

export type LibraryIconName =
  | 'Home' | 'Building2' | 'LayoutGrid' | 'Layers' | 'Building'
  | 'PaintBucket' | 'Blocks' | 'Mountain' | 'Gem'
  | 'ChefHat' | 'Footprints' | 'Sun' | 'Wind' | 'Droplets'
  | 'Receipt' | 'TrendingUp' | 'Tag'

export interface LibraryItem {
  id: string
  name: string
  category: LibraryCategory
  tab: LibraryTab
  price: number
  sku: string
  supplier?: string
  description: string
  specs?: Record<string, string>
  icon: LibraryIconName
  iconColor: string
  iconBg: string
  tags: string[]
  status: 'active' | 'draft' | 'archived'
  updatedAt: string
}

export const LIBRARY_ITEMS: LibraryItem[] = [
  // Designs
  {
    id: 'd1', tab: 'designs', name: 'Horizon 28', category: 'Single Storey',
    price: 285000, sku: 'DES-H28', supplier: 'Fortune Homes',
    description: 'A modern single-storey design with open-plan living, 4 bedrooms and a double garage. Ideal for suburban lots.',
    specs: { 'Bedrooms': '4', 'Bathrooms': '2', 'Garage': 'Double', 'Area': '280 m²', 'Width': '14 m', 'Depth': '22 m' },
    icon: 'Home', iconColor: 'text-orange-500', iconBg: 'bg-orange-50',
    tags: ['open-plan', 'family', 'suburban'],
    status: 'active', updatedAt: '2026-04-10',
  },
  {
    id: 'd2', tab: 'designs', name: 'Pinnacle 35', category: 'Double Storey',
    price: 420000, sku: 'DES-P35', supplier: 'Fortune Homes',
    description: 'Elegant double-storey design with master retreat upstairs, 5 bedrooms and alfresco entertaining.',
    specs: { 'Bedrooms': '5', 'Bathrooms': '3', 'Garage': 'Double', 'Area': '350 m²', 'Width': '12 m', 'Depth': '28 m' },
    icon: 'Building2', iconColor: 'text-blue-500', iconBg: 'bg-blue-50',
    tags: ['luxury', 'double-storey', 'alfresco'],
    status: 'active', updatedAt: '2026-04-08',
  },
  {
    id: 'd3', tab: 'designs', name: 'Metro Duplex 22', category: 'Duplex',
    price: 510000, sku: 'DES-MD22', supplier: 'Fortune Homes',
    description: 'Side-by-side duplex design optimised for investment. Each unit features 3 beds, 2 baths and single garage.',
    specs: { 'Bedrooms': '3+3', 'Bathrooms': '2+2', 'Garage': 'Single x2', 'Area': '220 m² each', 'Width': '16 m', 'Depth': '20 m' },
    icon: 'LayoutGrid', iconColor: 'text-purple-500', iconBg: 'bg-purple-50',
    tags: ['investment', 'duplex', 'rental'],
    status: 'active', updatedAt: '2026-03-28',
  },
  {
    id: 'd4', tab: 'designs', name: 'Retreat 18', category: 'Granny Flat',
    price: 145000, sku: 'DES-R18', supplier: 'Fortune Homes',
    description: 'Compact granny flat with 2 bedrooms, open kitchen/living and covered patio.',
    specs: { 'Bedrooms': '2', 'Bathrooms': '1', 'Garage': 'None', 'Area': '75 m²', 'Width': '8 m', 'Depth': '10 m' },
    icon: 'Home', iconColor: 'text-green-500', iconBg: 'bg-green-50',
    tags: ['granny-flat', 'compact', 'secondary-dwelling'],
    status: 'active', updatedAt: '2026-04-01',
  },
  {
    id: 'd5', tab: 'designs', name: 'Urban Row 24', category: 'Townhouse',
    price: 340000, sku: 'DES-UR24', supplier: 'Fortune Homes',
    description: 'Contemporary townhouse design with rooftop terrace, 3 bedrooms and integrated garage.',
    specs: { 'Bedrooms': '3', 'Bathrooms': '2.5', 'Garage': 'Single', 'Area': '240 m²', 'Width': '6 m', 'Depth': '18 m' },
    icon: 'Layers', iconColor: 'text-teal-500', iconBg: 'bg-teal-50',
    tags: ['townhouse', 'urban', 'rooftop'],
    status: 'draft', updatedAt: '2026-04-15',
  },

  // Facades
  {
    id: 'f1', tab: 'facades', name: 'Coastal Render', category: 'Standard',
    price: 8500, sku: 'FAC-CR01', supplier: 'Dulux Render Co.',
    description: 'Clean white render finish with horizontal feature lines. Suits coastal and contemporary homes.',
    specs: { 'Finish': 'Acrylic Render', 'Colour': 'Antique White', 'Texture': 'Fine', 'Warranty': '10 years' },
    icon: 'PaintBucket', iconColor: 'text-sky-500', iconBg: 'bg-sky-50',
    tags: ['render', 'coastal', 'white'],
    status: 'active', updatedAt: '2026-04-05',
  },
  {
    id: 'f2', tab: 'facades', name: 'Hamptons Cladding', category: 'Premium',
    price: 14200, sku: 'FAC-HC02', supplier: 'James Hardie',
    description: 'Weatherboard-style fibre cement cladding with colonial trim. Classic Hamptons aesthetic.',
    specs: { 'Material': 'Fibre Cement', 'Colour': 'Surfmist', 'Profile': 'Linea Weatherboard', 'Warranty': '15 years' },
    icon: 'Building', iconColor: 'text-amber-500', iconBg: 'bg-amber-50',
    tags: ['cladding', 'hamptons', 'weatherboard'],
    status: 'active', updatedAt: '2026-03-20',
  },
  {
    id: 'f3', tab: 'facades', name: 'Dark Brick Modern', category: 'Premium',
    price: 18900, sku: 'FAC-DB03', supplier: 'Boral Bricks',
    description: 'Charcoal face brick with black aluminium window frames. Bold contemporary statement.',
    specs: { 'Material': 'Face Brick', 'Colour': 'Charcoal', 'Bond': 'Stretcher', 'Warranty': '25 years' },
    icon: 'Blocks', iconColor: 'text-gray-600', iconBg: 'bg-gray-100',
    tags: ['brick', 'dark', 'contemporary'],
    status: 'active', updatedAt: '2026-04-12',
  },
  {
    id: 'f4', tab: 'facades', name: 'Limestone Luxe', category: 'Luxury',
    price: 32000, sku: 'FAC-LL04', supplier: 'Stone Artisans',
    description: 'Natural limestone cladding panels with brushed steel accents. Premium prestige finish.',
    specs: { 'Material': 'Natural Limestone', 'Colour': 'Ivory/Cream', 'Finish': 'Honed', 'Warranty': '30 years' },
    icon: 'Mountain', iconColor: 'text-stone-500', iconBg: 'bg-stone-50',
    tags: ['limestone', 'luxury', 'natural-stone'],
    status: 'active', updatedAt: '2026-04-02',
  },

  // Inclusions
  {
    id: 'i1', tab: 'inclusions', name: 'Stone Benchtop 40mm', category: 'Cabinetry',
    price: 4200, sku: 'INC-SB40', supplier: 'Caesarstone',
    description: '40mm engineered stone benchtop in Calacatta Gold. Includes waterfall edge to island bench.',
    specs: { 'Thickness': '40mm', 'Material': 'Engineered Stone', 'Colour': 'Calacatta Gold', 'Edge': 'Waterfall' },
    icon: 'ChefHat', iconColor: 'text-orange-500', iconBg: 'bg-orange-50',
    tags: ['benchtop', 'stone', 'kitchen'],
    status: 'active', updatedAt: '2026-04-09',
  },
  {
    id: 'i2', tab: 'inclusions', name: 'Hybrid Flooring Oak', category: 'Flooring',
    price: 3800, sku: 'INC-HF01', supplier: 'Quick-Step',
    description: 'Hybrid floating floor in Natural Oak. Waterproof, scratch-resistant, suitable for all areas.',
    specs: { 'Width': '1800mm planks', 'Thickness': '8mm', 'Colour': 'Natural Oak', 'Rating': 'AC5' },
    icon: 'Footprints', iconColor: 'text-amber-600', iconBg: 'bg-amber-50',
    tags: ['flooring', 'hybrid', 'oak'],
    status: 'active', updatedAt: '2026-03-30',
  },
  {
    id: 'i3', tab: 'inclusions', name: 'Solar 6.6kW System', category: 'Electrical',
    price: 6500, sku: 'INC-SOL66', supplier: 'SunPower',
    description: '6.6kW solar panel system with 5kW inverter. Includes installation and grid connection.',
    specs: { 'Capacity': '6.6kW', 'Inverter': '5kW Fronius', 'Panels': '18 x 370W', 'Warranty': '25 years' },
    icon: 'Sun', iconColor: 'text-yellow-500', iconBg: 'bg-yellow-50',
    tags: ['solar', 'electrical', 'energy'],
    status: 'active', updatedAt: '2026-04-11',
  },
  {
    id: 'i4', tab: 'inclusions', name: 'Ducted Air Conditioning', category: 'Structural',
    price: 9800, sku: 'INC-DAC01', supplier: 'Daikin',
    description: 'Fully ducted reverse-cycle air conditioning. 10kW system with 8 zones and smart controller.',
    specs: { 'Capacity': '10kW', 'Zones': '8', 'Brand': 'Daikin', 'Controller': 'MyAir Smart' },
    icon: 'Wind', iconColor: 'text-blue-400', iconBg: 'bg-blue-50',
    tags: ['aircon', 'ducted', 'hvac'],
    status: 'active', updatedAt: '2026-04-07',
  },
  {
    id: 'i5', tab: 'inclusions', name: 'Tapware Matte Black Set', category: 'Plumbing',
    price: 2100, sku: 'INC-TMB01', supplier: 'Methven',
    description: 'Full home tapware package in matte black. Includes kitchen mixer, bathroom basin, shower and bath sets.',
    specs: { 'Finish': 'Matte Black', 'Material': 'Brass', 'Pieces': '12 piece set', 'Warranty': '5 years' },
    icon: 'Droplets', iconColor: 'text-slate-500', iconBg: 'bg-slate-50',
    tags: ['tapware', 'matte-black', 'plumbing'],
    status: 'active', updatedAt: '2026-04-03',
  },

  // Pricing Rules
  {
    id: 'pr1', tab: 'pricing-rules', name: 'Corner Lot Premium', category: 'Fixed Price',
    price: 4500, sku: 'PR-CLP01', supplier: undefined,
    description: 'Fixed price uplift applied to all designs on corner lots. Covers additional fencing, landscaping and siting costs.',
    specs: { 'Trigger': 'Corner Lot', 'Type': 'Fixed Uplift', 'Applies To': 'All Designs', 'GST': 'Inclusive' },
    icon: 'Receipt', iconColor: 'text-green-600', iconBg: 'bg-green-50',
    tags: ['corner-lot', 'siting', 'uplift'],
    status: 'active', updatedAt: '2026-04-01',
  },
  {
    id: 'pr2', tab: 'pricing-rules', name: 'Sloping Site Allowance', category: 'Provisional Sum',
    price: 12000, sku: 'PR-SSA01', supplier: undefined,
    description: 'Provisional sum for sites with fall greater than 1m. Final cost subject to soil and survey report.',
    specs: { 'Trigger': 'Fall > 1000mm', 'Type': 'Provisional Sum', 'Review': 'Post-survey', 'GST': 'Exclusive' },
    icon: 'TrendingUp', iconColor: 'text-orange-500', iconBg: 'bg-orange-50',
    tags: ['sloping', 'site-costs', 'provisional'],
    status: 'active', updatedAt: '2026-03-25',
  },
  {
    id: 'pr3', tab: 'pricing-rules', name: 'Upgrade Facade PC Item', category: 'Prime Cost',
    price: 5000, sku: 'PR-UFP01', supplier: undefined,
    description: 'Prime cost allowance for facade upgrades beyond standard inclusions. Client selects from approved supplier list.',
    specs: { 'Trigger': 'Facade Upgrade', 'Type': 'Prime Cost', 'Allowance': '$5,000', 'GST': 'Inclusive' },
    icon: 'Tag', iconColor: 'text-purple-500', iconBg: 'bg-purple-50',
    tags: ['facade', 'prime-cost', 'upgrade'],
    status: 'active', updatedAt: '2026-04-14',
  },
]

export const TAB_LABELS: Record<LibraryTab, string> = {
  designs: 'Designs',
  facades: 'Facades',
  inclusions: 'Inclusions',
  'pricing-rules': 'Pricing Rules',
}

export const CATEGORY_OPTIONS: Record<LibraryTab, LibraryCategory[]> = {
  designs: ['Single Storey', 'Double Storey', 'Duplex', 'Townhouse', 'Granny Flat'],
  facades: ['Standard', 'Premium', 'Luxury'],
  inclusions: ['Structural', 'Electrical', 'Plumbing', 'Flooring', 'Cabinetry'],
  'pricing-rules': ['Fixed Price', 'Provisional Sum', 'Prime Cost'],
}
