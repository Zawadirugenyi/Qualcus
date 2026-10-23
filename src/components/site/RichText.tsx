import type { ReactNode } from 'react'
import { mediaUrl } from '@/lib/api'
import { getRoot, type LexNode } from '@/lib/richText'

const BOLD = 1
const ITALIC = 2
const STRIKE = 4
const UNDERLINE = 8
const CODE = 16

function renderText(node: LexNode, key: string): ReactNode {
  if (typeof node.text !== 'string' || node.text === '') return null
  const format = typeof node.format === 'number' ? node.format : 0
  let el: ReactNode = node.text
  if (format & CODE) el = <code>{el}</code>
  if (format & BOLD) el = <strong>{el}</strong>
  if (format & ITALIC) el = <em>{el}</em>
  if (format & UNDERLINE) el = <u>{el}</u>
  if (format & STRIKE) el = <s>{el}</s>
  return <span key={key}>{el}</span>
}

function renderChildren(nodes?: LexNode[]): ReactNode {
  if (!nodes?.length) return null
  return nodes.map((n, i) => renderNode(n, String(i)))
}

function renderNode(node: LexNode, key: string): ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'horizontalrule':
      return <hr key={key} />
    case 'link':
    case 'autolink': {
      const href = node.fields?.url || node.url
      const newTab = node.fields?.newTab ?? node.newTab
      return (
        <a key={key} href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
          {renderChildren(node.children)}
        </a>
      )
    }
    case 'upload': {
      const value = node.value as { url?: string; alt?: string } | undefined
      const src = mediaUrl(value?.url)
      if (!src) return null
      return <img key={key} src={src} alt={value?.alt || ''} loading="lazy" className="rounded-xl" />
    }
    default:
      return node.children ? <span key={key}>{renderChildren(node.children)}</span> : null
  }
}

export default function RichText({ data, className }: { data: unknown; className?: string }) {
  const root = getRoot(data)
  if (!root?.children?.length) return null
  return <div className={className ? `rich-text ${className}` : 'rich-text'}>{renderChildren(root.children)}</div>
}
