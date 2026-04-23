interface PageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="w-full space-y-3">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3">
        {children}
      </div>
    </div>
  )
}
