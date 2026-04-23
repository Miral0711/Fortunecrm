interface SplitLayoutProps {
  listHeader: React.ReactNode
  listContent: React.ReactNode
  listFooter?: React.ReactNode
  mapContent: React.ReactNode
}

export default function SplitLayout({
  listHeader,
  listContent,
  listFooter,
  mapContent,
}: SplitLayoutProps) {
  return (
    <section className="min-h-0">
      <div className="grid min-h-0 grid-cols-1 gap-3 xl:h-[calc(100vh-245px)] xl:grid-cols-10">
        <div className="xl:col-span-6 flex min-h-0 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {listHeader}
          <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50/70 p-3">{listContent}</div>
          {listFooter && <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-2.5">{listFooter}</div>}
        </div>

        <div className="min-h-[420px] xl:col-span-4 xl:min-h-0">
          <div className="h-full w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {mapContent}
          </div>
        </div>
      </div>
    </section>
  )
}
