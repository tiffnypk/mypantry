import Link from 'next/link'

export default function HomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-60 mb-10"
      style={{ fontFamily: 'var(--font-mynerve), cursive', color: 'var(--warm-gray)' }}
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5H1M5 1L1 5L5 9" />
      </svg>
    </Link>
  )
}
