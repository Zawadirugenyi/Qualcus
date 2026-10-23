type LexNode = {
  type?: string
  tag?: string
  format?: number | string
  text?: string
  url?: string
  newTab?: boolean
  listType?: string
  value?: unknown
  fields?: { url?: string; alt?: string; newTab?: boolean }
  children?: LexNode[]
  [key: string]: unknown
}

export type { LexNode }

export function getRoot(data: unknown): LexNode | undefined {
  return (data as { root?: { children?: LexNode[] } } | undefined)?.root
}

export function hasContent(data: unknown): boolean {
  const root = getRoot(data)
  return Boolean(root?.children?.length)
}
