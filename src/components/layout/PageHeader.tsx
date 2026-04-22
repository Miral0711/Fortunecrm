

interface Breadcrumb {
  label: string
  path?: string
}

interface Props {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
}

export default function PageHeader({ actions }: Props) {
  if (!actions) return null

  return (
    <div className="flex items-start justify-end mb-4">
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  )
}
