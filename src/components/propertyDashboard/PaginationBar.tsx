import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationBarProps {
  page: number
  totalPages: number
  pages: Array<number | '...'>
  onPageChange: (page: number) => void
}

export default function PaginationBar({
  page,
  totalPages,
  pages,
  onPageChange,
}: PaginationBarProps) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-3 w-3" />
      </button>
      {pages.map((pageItem, index) =>
        pageItem === '...' ? (
          <span key={`ellipsis-${index}`} className="flex h-6 w-6 items-center justify-center text-[9px] text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={pageItem}
            type="button"
            onClick={() => onPageChange(pageItem)}
            className={`flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-medium transition-colors ${
              page === pageItem ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {pageItem}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  )
}
