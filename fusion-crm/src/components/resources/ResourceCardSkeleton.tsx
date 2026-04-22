export default function ResourceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-28 bg-gray-100" />
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-2">
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-3/5" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-3 w-12 bg-gray-100 rounded" />
          <div className="h-4 w-16 bg-gray-100 rounded" />
        </div>
        <div className="h-7 bg-gray-100 rounded-lg mt-0.5" />
      </div>
    </div>
  )
}
