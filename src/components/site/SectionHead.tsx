export default function SectionHead({
  eyebrow,
  title,
  lead,
  className = 'text-center mx-auto max-w-2xl',
  delay,
}: {
  eyebrow?: string
  title: string
  lead?: string
  className?: string
  delay?: number
}) {
  return (
    <div className={className} data-animate style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] mt-3" dangerouslySetInnerHTML={{ __html: title }} />
      {lead && <p className="text-muted mt-4 text-[1.02rem]">{lead}</p>}
    </div>
  )
}
