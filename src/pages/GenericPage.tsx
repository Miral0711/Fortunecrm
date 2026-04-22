import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import PageWrapper from '../components/layout/PageWrapper'

interface Props {
  title: string
  subtitle?: string
}

export default function GenericPage({ title, subtitle }: Props) {
  return (
    <PageWrapper>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <EmptyState
          title="Coming soon"
          description={`The ${title} module is under construction.`}
        />
      </div>
    </PageWrapper>
  )
}
