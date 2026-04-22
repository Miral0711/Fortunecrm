export interface Listing {
  id: string
  title: string
  project: string
  location: string
  suburb: string
  state: string
  type: 'House & Land' | 'Apartment' | 'Townhouse' | 'Land'
  price: number
  priceLabel: string
  bedrooms: number
  bathrooms: number
  garage: number
  landSize: string
  status: 'Available' | 'Under Offer' | 'Sold'
  image: string
  featured: boolean
  description: string
  features: string[]
  inclusions: string[]
  brochureUrl?: string
}

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Lot 42 – Horizon Estate',
    project: 'Horizon Estate',
    location: 'Clyde North, VIC',
    suburb: 'Clyde North',
    state: 'VIC',
    type: 'House & Land',
    price: 685000,
    priceLabel: '$685,000',
    bedrooms: 4,
    bathrooms: 2,
    garage: 2,
    landSize: '448 m²',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    featured: true,
    description: 'A stunning house and land package nestled in the heart of Horizon Estate. This 4-bedroom home offers modern living with premium finishes throughout, set on a generous 448m² block with north-facing orientation.',
    features: ['Double lock-up garage', 'Alfresco entertaining area', 'Open plan kitchen & living', 'Master with walk-in robe & ensuite', 'Ducted heating & cooling', 'Landscaping included'],
    inclusions: ['Flooring throughout', 'Window furnishings', 'Dishwasher', 'Stone benchtops', 'LED downlights', 'Driveway & letterbox'],
  },
  {
    id: '2',
    title: 'Lot 18 – Parkview Rise',
    project: 'Parkview Rise',
    location: 'Tarneit, VIC',
    suburb: 'Tarneit',
    state: 'VIC',
    type: 'House & Land',
    price: 595000,
    priceLabel: '$595,000',
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: '320 m²',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    featured: false,
    description: 'A beautifully designed 3-bedroom home in the thriving Parkview Rise community. Perfect for first home buyers or investors seeking strong rental yields in a high-growth corridor.',
    features: ['Single garage', 'Covered alfresco', 'Modern kitchen with island bench', 'Built-in robes to all bedrooms', 'Reverse cycle air conditioning'],
    inclusions: ['Carpet & tiles', 'Blinds', 'Clothesline & letterbox', 'Driveway'],
  },
  {
    id: '3',
    title: 'Unit 5 – The Meridian',
    project: 'The Meridian',
    location: 'Footscray, VIC',
    suburb: 'Footscray',
    state: 'VIC',
    type: 'Apartment',
    price: 480000,
    priceLabel: '$480,000',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    landSize: '–',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: true,
    description: 'Contemporary 2-bedroom apartment in the vibrant Footscray precinct. Walking distance to train station, cafes, and the upcoming Footscray Hospital precinct.',
    features: ['City views', 'Secure car space', 'Rooftop terrace access', 'Intercom entry', 'European appliances'],
    inclusions: ['Integrated fridge', 'Washer/dryer', 'Roller blinds', 'Bike storage'],
  },
  {
    id: '4',
    title: 'Lot 7 – Greenfield Gardens',
    project: 'Greenfield Gardens',
    location: 'Wollert, VIC',
    suburb: 'Wollert',
    state: 'VIC',
    type: 'Land',
    price: 310000,
    priceLabel: '$310,000',
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    landSize: '500 m²',
    status: 'Under Offer',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: false,
    description: 'Flat, rectangular 500m² block in the sought-after Greenfield Gardens estate. Titled and ready to build. Close to future town centre and primary school.',
    features: ['Titled & ready to build', 'Flat rectangular block', 'North-facing rear', 'Underground power', 'NBN ready'],
    inclusions: [],
  },
  {
    id: '5',
    title: 'Lot 23 – Solaris Estate',
    project: 'Solaris Estate',
    location: 'Cranbourne East, VIC',
    suburb: 'Cranbourne East',
    state: 'VIC',
    type: 'House & Land',
    price: 720000,
    priceLabel: '$720,000',
    bedrooms: 4,
    bathrooms: 2,
    garage: 2,
    landSize: '512 m²',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: true,
    description: 'Premium 4-bedroom family home in the prestigious Solaris Estate. Featuring a spacious double-storey design with high ceilings and premium upgrades throughout.',
    features: ['Double storey', '2.7m ceilings ground floor', 'Theatre room', 'Butler\'s pantry', 'Ducted zoned AC', 'Outdoor kitchen'],
    inclusions: ['Timber flooring to living areas', 'Porcelain tiles to wet areas', 'Plantation shutters', 'Integrated dishwasher', 'Stone benchtops throughout'],
  },
  {
    id: '6',
    title: 'TH 12 – Elara Townhomes',
    project: 'Elara Townhomes',
    location: 'Marsden Park, NSW',
    suburb: 'Marsden Park',
    state: 'NSW',
    type: 'Townhouse',
    price: 650000,
    priceLabel: '$650,000',
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: '180 m²',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: false,
    description: 'Modern 3-bedroom townhouse in the master-planned Elara community. Low maintenance living with quality finishes and a private courtyard.',
    features: ['Private courtyard', 'Single lock-up garage', 'Open plan living', 'Ensuite to master', 'Powder room ground floor'],
    inclusions: ['Carpet upstairs', 'Tiles downstairs', 'Blinds', 'Clothesline'],
  },
]

export const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $400k', min: 0, max: 400000 },
  { label: '$400k – $600k', min: 400000, max: 600000 },
  { label: '$600k – $800k', min: 600000, max: 800000 },
  { label: '$800k+', min: 800000, max: Infinity },
]

export const propertyTypes = ['All Types', 'House & Land', 'Apartment', 'Townhouse', 'Land']

export const locations = ['All Locations', 'VIC', 'NSW', 'QLD', 'WA']
