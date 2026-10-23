import { useEffect, useState } from 'react'
import type { Lang } from './ui'
import type { ProjectItem } from '@/components/site/ProjectsSection'

const API_BASE = import.meta.env.VITE_API_URL || ''

export function mediaUrl(url: string | null | undefined): string | null {
  if (typeof url !== 'string' || url.length === 0) return null
  return url.startsWith('http') ? url : `${API_BASE}${url}`
}

function imageUrl(image: unknown): string | null {
  if (image && typeof image === 'object' && 'url' in image) {
    return mediaUrl((image as { url?: string | null }).url)
  }
  return null
}

type RawProject = {
  id: number | string
  title: string
  slug?: string
  category: 'software' | 'iot' | 'security'
  tag?: string
  excerpt: string
  result?: string
  resultText?: string
  content?: unknown
  image?: unknown
}

type ProjectDetail = ProjectItem & { content?: unknown }

function mapProject(d: RawProject): ProjectDetail {
  return {
    id: String(d.id),
    slug: d.slug || String(d.id),
    cat: d.category,
    tag: d.tag,
    title: d.title,
    text: d.excerpt,
    result: d.result,
    resultText: d.resultText,
    image: imageUrl(d.image),
    content: d.content,
  }
}

async function fetchProjects(lang: Lang, limit = 50): Promise<ProjectItem[]> {
  const params = new URLSearchParams({
    locale: lang,
    depth: '1',
    sort: 'order',
    limit: String(limit),
    'where[title][exists]': 'true',
  })
  const res = await fetch(`${API_BASE}/api/projects?${params.toString()}`)
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`)
  const data = (await res.json()) as { docs: RawProject[] }
  return data.docs.map(mapProject)
}

async function fetchProject(lang: Lang, slug: string): Promise<ProjectDetail | null> {
  const params = new URLSearchParams({
    locale: lang,
    depth: '1',
    limit: '1',
    'where[slug][equals]': slug,
  })
  const res = await fetch(`${API_BASE}/api/projects?${params.toString()}`)
  if (!res.ok) throw new Error(`Failed to load project (${res.status})`)
  const data = (await res.json()) as { docs: RawProject[] }
  const doc = data.docs?.[0]
  return doc ? mapProject(doc) : null
}

export function useProjects(lang: Lang, limit = 50): { items: ProjectItem[]; loading: boolean } {
  const key = `${lang}:${limit}`
  const [state, setState] = useState<{ key: string; items: ProjectItem[] }>({ key: '', items: [] })

  useEffect(() => {
    let alive = true
    fetchProjects(lang, limit)
      .then((data) => {
        if (alive) setState({ key, items: data })
      })
      .catch(() => {
        if (alive) setState({ key, items: [] })
      })
    return () => {
      alive = false
    }
  }, [key, lang, limit])

  return { items: state.items, loading: state.key !== key }
}

export function useProject(
  lang: Lang,
  slug: string | undefined,
): { project: ProjectDetail | null; loading: boolean } {
  const key = `${lang}:${slug ?? ''}`
  const [state, setState] = useState<{ key: string; project: ProjectDetail | null }>({
    key: '',
    project: null,
  })

  useEffect(() => {
    if (!slug) return
    let alive = true
    fetchProject(lang, slug)
      .then((data) => {
        if (alive) setState({ key, project: data })
      })
      .catch(() => {
        if (alive) setState({ key, project: null })
      })
    return () => {
      alive = false
    }
  }, [key, lang, slug])

  if (!slug) return { project: null, loading: false }
  return { project: state.project, loading: state.key !== key }
}

type LeadInput = {
  email: string
  name?: string
  phone?: string
  service?: string
  message?: string
  source: 'contact' | 'newsletter'
  locale: Lang
  botField?: string
}

export async function submitLead(input: LeadInput): Promise<void> {
  const res = await fetch(`${API_BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}
