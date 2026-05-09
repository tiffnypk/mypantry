interface Props {
  icon: string
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
        style={{ backgroundColor: 'var(--cream-border)' }}
      >
        {icon}
      </div>
      <h3
        className="text-2xl mb-2"
        style={{ fontFamily: 'var(--font-mynerve), cursive', color: 'var(--charcoal)', fontWeight: 700 }}
      >
        {title}
      </h3>
      <p className="text-sm max-w-xs mb-8 leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
        {description}
      </p>
      {action}
    </div>
  )
}
