import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

interface Props {
  title: string
  subtitle?: string
}

export default function GenericPage({ title, subtitle }: Props) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <EmptyState
          title="Coming soon"
          description={`The ${title} module is under construction.`}
        />
      </div>
    </div>
  )
}
