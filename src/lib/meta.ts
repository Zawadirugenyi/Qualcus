import type { Lang } from './ui'
import { ui } from './ui'
import { ROUTES } from './site'

export type Page = 'home' | 'services' | 'projects' | 'technologies' | 'about' | 'faq' | 'contact'

const titles: Record<Lang, Record<Page, string>> = {
  fr: {
    home: ui.fr.meta.home.title,
    services: 'Services — Logiciels, IoT & sécurité | Qualcus',
    projects: 'Réalisations — Nos projets livrés | Qualcus',
    technologies: 'Technologies — Nos outils & pile technique | Qualcus',
    about: 'À propos — Qui sommes-nous | Qualcus',
    faq: 'FAQ — Questions fréquentes | Qualcus',
    contact: 'Contact — Demander un devis gratuit | Qualcus',
  },
  en: {
    home: ui.en.meta.home.title,
    services: 'Services — Software, IoT & security | Qualcus',
    projects: 'Projects — Our delivered work | Qualcus',
    technologies: 'Technologies — Our tools & stack | Qualcus',
    about: 'About — Who we are | Qualcus',
    faq: 'FAQ — Frequently asked questions | Qualcus',
    contact: 'Contact — Get a free quote | Qualcus',
  },
}

const descriptions: Record<Lang, Record<Page, string>> = {
  fr: {
    home: ui.fr.meta.home.desc,
    services:
      'Développement logiciel sur mesure, objets connectés (IoT) et dispositifs de sécurité au Congo. Devis gratuit, garantie 12 mois, assistance locale.',
    projects:
      'Découvrez les projets réalisés par Qualcus : logiciels de gestion, objets connectés et systèmes de sécurité pour entreprises et institutions du Congo.',
    technologies:
      'React, Node.js, Flutter, ESP32, caméras IP et cloud : les technologies fiables choisies par Qualcus selon votre budget et votre connectivité.',
    about:
      "Qualcus est une entreprise technologique basée au Congo (Kinshasa, Bunia, Goma) : développeurs, ingénieurs IoT et experts en sécurité qui vous accompagnent de l'idée à la production.",
    faq:
      'Coût, délais, garantie et fonctionnement pendant les coupures : les réponses aux questions fréquentes sur les services de Qualcus.',
    contact:
      'Parlez de votre projet à Qualcus : réponse sous 24 h, devis gratuit et sans engagement. Kinshasa, Bunia et Goma.',
  },
  en: {
    home: ui.en.meta.home.desc,
    services:
      'Custom software development, connected devices (IoT) and security systems in the Congo. Free quote, 12-month warranty, local support.',
    projects:
      'Discover the projects delivered by Qualcus: management software, connected devices and security systems for businesses and institutions in the Congo.',
    technologies:
      'React, Node.js, Flutter, ESP32, IP cameras and cloud: the reliable technologies Qualcus picks for your budget and connectivity.',
    about:
      'Qualcus is a technology company based in the Congo (Kinshasa, Bunia, Goma): developers, IoT engineers and security experts supporting you from idea to production.',
    faq:
      'Cost, timelines, warranty and how our systems run during power cuts: answers to the frequent questions about Qualcus services.',
    contact:
      'Talk to Qualcus about your project: reply within 24 h, free and no-obligation quote. Kinshasa, Bunia and Goma.',
  },
}

export function pageTitle(lang: Lang, page: Page): string {
  return titles[lang][page]
}

export function pageDescription(lang: Lang, page: Page): string {
  return descriptions[lang][page]
}

export function pagePath(lang: Lang, page: Page): string {
  return ROUTES[page][lang]
}

const allPages: Page[] = ['home', 'services', 'projects', 'technologies', 'about', 'faq', 'contact']

export function pageFromPath(pathname: string): Page {
  const norm = pathname.replace(/\/$/, '') || '/'
  for (const lang of ['fr', 'en'] as Lang[]) {
    for (const page of allPages) {
      const p = pagePath(lang, page).replace(/\/$/, '') || '/'
      if (p === norm) return page
    }
  }
  if (norm.startsWith('/realisations/') || norm.startsWith('/en/projects/')) return 'projects'
  return 'home'
}

