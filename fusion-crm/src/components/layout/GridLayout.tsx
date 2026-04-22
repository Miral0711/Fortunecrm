import clsx from 'clsx'

type ColCount = 1 | 2 | 3 | 4 | 5 | 6

interface ColConfig {
  sm?: ColCount
  md?: ColCount
  lg?: ColCount
  xl?: ColCount
}

interface Props {
  columns?: ColConfig | ColCount
  gap?: '2' | '3' | '4' | '5' | '6' | '8'
  children: React.ReactNode
  className?: string
}

const colMap: Record<ColCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
}

const smColMap: Record<ColCount, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
}

const mdColMap: Record<ColCount, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

const lgColMap: Record<ColCount, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

const xlColMap: Record<ColCount, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
}

const gapMap: Record<string, string> = {
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
}

export default function GridLayout({ columns = 1, gap = '4', children, className }: Props) {
  let classes = 'grid'

  if (typeof columns === 'number') {
    classes = clsx(classes, colMap[columns])
  } else {
    if (columns.sm) classes = clsx(classes, smColMap[columns.sm])
    if (columns.md) classes = clsx(classes, mdColMap[columns.md])
    if (columns.lg) classes = clsx(classes, lgColMap[columns.lg])
    if (columns.xl) classes = clsx(classes, xlColMap[columns.xl])
    // default to 1 col
    if (!columns.sm && !columns.md) classes = clsx(classes, 'grid-cols-1')
  }

  return (
    <div className={clsx(classes, gapMap[gap], className)}>
      {children}
    </div>
  )
}
