export default function CalendarHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center justify-between  gap-4 ">
      {children}
    </div>
  )
}
