import { useSyncExternalStore } from 'react'

export type PageMeta = {
  title: string
  description: string
  ogImage?: string
  altFr?: string
  altEn?: string
}

let override: PageMeta | null = null
const subscribers = new Set<() => void>()

function emit() {
  for (const s of subscribers) s()
}

export function setPageMeta(meta: PageMeta | null) {
  override = meta
  emit()
}

export function usePageMeta(): PageMeta | null {
  return useSyncExternalStore(
    (cb) => {
      subscribers.add(cb)
      return () => subscribers.delete(cb)
    },
    () => override,
    () => null,
  )
}
