import { Clock } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

interface Props {
  title: string
  subtitle?: string
}

export default function ComingSoonPage({ title, subtitle }: Props) {
  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ label: 'Accounts' }, { label: title }]}
      />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
          <Clock className="w-7 h-7 text-orange-400" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">Coming Soon</h3>
        <p className="text-xs text-gray-400 mt-1.5 max-w-xs">
          The <span className="font-medium text-gray-600">{title}</span> module is currently under development and will be available shortly.
        </p>
      </div>
    </div>
  )
}
