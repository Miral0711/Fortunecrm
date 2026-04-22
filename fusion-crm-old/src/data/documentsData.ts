export type DocTag = 'Contract' | 'Brochure' | 'Floor Plan' | 'Legal' | 'Finance' | 'Marketing' | 'Report'
export type DocType = 'pdf' | 'image' | 'docx' | 'xlsx'

export interface DocFile {
  id: string
  name: string
  type: DocType
  size: string
  tag: DocTag
  folderId: string
  uploadedBy: string
  uploadedAt: string
  usageInfo: string
  inherited?: boolean
  thumbnailUrl?: string
  previewUrl?: string
}

export interface DocFolder {
  id: string
  label: string
  parentId?: string
  count: number
}

export const folders: DocFolder[] = [
  { id: 'all',        label: 'All Files',          count: 18 },
  { id: 'projects',   label: 'Projects',            count: 6  },
  { id: 'horizon',    label: 'Horizon Estate',      parentId: 'projects', count: 3 },
  { id: 'solaris',    label: 'Solaris Estate',      parentId: 'projects', count: 3 },
  { id: 'marketing',  label: 'Marketing',           count: 5  },
  { id: 'legal',      label: 'Legal & Contracts',   count: 4  },
  { id: 'finance',    label: 'Finance',             count: 3  },
]

export const documents: DocFile[] = [
  // Horizon Estate
  {
    id: 'd1', name: 'Horizon Estate – Brochure.pdf', type: 'pdf', size: '3.2 MB',
    tag: 'Brochure', folderId: 'horizon', uploadedBy: 'Admin', uploadedAt: '10 Apr 2026',
    usageInfo: 'Used in 4 listings', inherited: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  },
  {
    id: 'd2', name: 'Lot 42 – Floor Plan.pdf', type: 'pdf', size: '1.8 MB',
    tag: 'Floor Plan', folderId: 'horizon', uploadedBy: 'Sarah M.', uploadedAt: '8 Apr 2026',
    usageInfo: 'Used in 1 listing', inherited: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'd3', name: 'Horizon – Site Plan.pdf', type: 'pdf', size: '5.1 MB',
    tag: 'Floor Plan', folderId: 'horizon', uploadedBy: 'Admin', uploadedAt: '5 Apr 2026',
    usageInfo: 'Used in 3 listings', inherited: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  // Solaris Estate
  {
    id: 'd4', name: 'Solaris Estate – Brochure.pdf', type: 'pdf', size: '4.0 MB',
    tag: 'Brochure', folderId: 'solaris', uploadedBy: 'Admin', uploadedAt: '12 Apr 2026',
    usageInfo: 'Used in 2 listings', inherited: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    id: 'd5', name: 'Lot 23 – Floor Plan.pdf', type: 'pdf', size: '2.2 MB',
    tag: 'Floor Plan', folderId: 'solaris', uploadedBy: 'James T.', uploadedAt: '9 Apr 2026',
    usageInfo: 'Used in 1 listing', inherited: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 'd6', name: 'Solaris – Inclusions List.xlsx', type: 'xlsx', size: '0.4 MB',
    tag: 'Contract', folderId: 'solaris', uploadedBy: 'Admin', uploadedAt: '7 Apr 2026',
    usageInfo: 'Attached to 5 packages', inherited: false,
  },
  // Marketing
  {
    id: 'd7', name: 'Q2 Campaign Brief.pdf', type: 'pdf', size: '1.1 MB',
    tag: 'Marketing', folderId: 'marketing', uploadedBy: 'Admin', uploadedAt: '14 Apr 2026',
    usageInfo: 'Shared with 3 agents',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    id: 'd8', name: 'Brand Guidelines 2026.pdf', type: 'pdf', size: '8.3 MB',
    tag: 'Marketing', folderId: 'marketing', uploadedBy: 'Admin', uploadedAt: '1 Apr 2026',
    usageInfo: 'Company-wide document',
  },
  {
    id: 'd9', name: 'Social Media Kit.zip', type: 'image', size: '22 MB',
    tag: 'Marketing', folderId: 'marketing', uploadedBy: 'Admin', uploadedAt: '28 Mar 2026',
    usageInfo: 'Used by 8 agents',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60',
  },
  {
    id: 'd10', name: 'Email Template – Enquiry.docx', type: 'docx', size: '0.2 MB',
    tag: 'Marketing', folderId: 'marketing', uploadedBy: 'Sarah M.', uploadedAt: '20 Mar 2026',
    usageInfo: 'Used in mail campaigns',
  },
  {
    id: 'd11', name: 'Property Photography Guide.pdf', type: 'pdf', size: '3.7 MB',
    tag: 'Marketing', folderId: 'marketing', uploadedBy: 'Admin', uploadedAt: '15 Mar 2026',
    usageInfo: 'Shared with photographers',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=60',
  },
  // Legal
  {
    id: 'd12', name: 'Standard Purchase Contract.pdf', type: 'pdf', size: '0.9 MB',
    tag: 'Contract', folderId: 'legal', uploadedBy: 'Admin', uploadedAt: '2 Apr 2026',
    usageInfo: 'Used in 12 transactions',
  },
  {
    id: 'd13', name: 'Agency Agreement Template.docx', type: 'docx', size: '0.3 MB',
    tag: 'Legal', folderId: 'legal', uploadedBy: 'Admin', uploadedAt: '18 Mar 2026',
    usageInfo: 'Used with 6 agents',
  },
  {
    id: 'd14', name: 'Disclosure Statement.pdf', type: 'pdf', size: '0.6 MB',
    tag: 'Legal', folderId: 'legal', uploadedBy: 'Admin', uploadedAt: '10 Mar 2026',
    usageInfo: 'Mandatory for all sales',
  },
  {
    id: 'd15', name: 'Privacy Policy 2026.pdf', type: 'pdf', size: '0.4 MB',
    tag: 'Legal', folderId: 'legal', uploadedBy: 'Admin', uploadedAt: '1 Mar 2026',
    usageInfo: 'Company-wide document',
  },
  // Finance
  {
    id: 'd16', name: 'Finance Assessment Form.pdf', type: 'pdf', size: '0.5 MB',
    tag: 'Finance', folderId: 'finance', uploadedBy: 'Admin', uploadedAt: '5 Apr 2026',
    usageInfo: 'Submitted 34 times',
  },
  {
    id: 'd17', name: 'Stamp Duty Calculator.xlsx', type: 'xlsx', size: '0.2 MB',
    tag: 'Finance', folderId: 'finance', uploadedBy: 'Admin', uploadedAt: '22 Mar 2026',
    usageInfo: 'Used by 15 agents',
  },
  {
    id: 'd18', name: 'First Home Buyer Guide.pdf', type: 'pdf', size: '2.1 MB',
    tag: 'Finance', folderId: 'finance', uploadedBy: 'Admin', uploadedAt: '12 Mar 2026',
    usageInfo: 'Shared with 20 clients',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=60',
    previewUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
]

export const tagColors: Record<DocTag, string> = {
  'Contract':   'bg-orange-50 text-orange-600',
  'Brochure':   'bg-amber-50 text-amber-600',
  'Floor Plan': 'bg-blue-50 text-blue-600',
  'Legal':      'bg-purple-50 text-purple-600',
  'Finance':    'bg-green-50 text-green-600',
  'Marketing':  'bg-pink-50 text-pink-600',
  'Report':     'bg-gray-100 text-gray-600',
}
