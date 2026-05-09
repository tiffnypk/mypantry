export default function RecipeSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 animate-pulse"
      style={{ backgroundColor: 'var(--cream-card)', border: '1px solid var(--cream-border)' }}
    >
      <div className="h-6 rounded-full w-3/4 mb-3" style={{ backgroundColor: 'var(--cream-border)' }} />
      <div className="h-4 rounded-full w-full mb-1.5" style={{ backgroundColor: 'var(--cream-border)', opacity: 0.6 }} />
      <div className="h-4 rounded-full w-5/6 mb-5" style={{ backgroundColor: 'var(--cream-border)', opacity: 0.6 }} />
      <div className="flex gap-2 mb-5">
        <div className="h-6 rounded-full w-20" style={{ backgroundColor: 'var(--ink)', opacity: 0.15 }} />
        <div className="h-6 rounded-full w-16" style={{ backgroundColor: 'var(--ink)', opacity: 0.15 }} />
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded-full w-full" style={{ backgroundColor: 'var(--cream-border)', opacity: 0.5 }} />
        <div className="h-3 rounded-full w-5/6" style={{ backgroundColor: 'var(--cream-border)', opacity: 0.5 }} />
        <div className="h-3 rounded-full w-4/6" style={{ backgroundColor: 'var(--cream-border)', opacity: 0.5 }} />
      </div>
    </div>
  )
}
