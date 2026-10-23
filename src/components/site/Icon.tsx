import type { CSSProperties } from 'react'
import { icons } from '@/lib/icons'

interface IconProps {
  name: string
  className?: string
  style?: CSSProperties
}

export default function Icon({ name, className = 'w-6 h-6', style }: IconProps) {
  const svg = icons[name] ?? icons.check
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
