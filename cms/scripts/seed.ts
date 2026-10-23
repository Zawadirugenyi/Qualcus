import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '../src/payload.config'

/* ------------------------------------------------------------------ */
/* Project content (FR + EN)                                           */
/* ------------------------------------------------------------------ */
type Cat = 'software' | 'iot' | 'security'

type SeedProject = {
  cat: Cat
  fr: { tag: string; title: string; excerpt: string; resultText: string }
  en: { tag: string; title: string; excerpt: string; resultText: string }
  result: string
  order: number
}

const projects: SeedProject[] = [
  {
    cat: 'software',
    order: 1,
    result: '-70%',
    fr: {
      tag: 'Logiciel',
      title: 'Gestion de stock & ventes',
      excerpt:
        "Plateforme de gestion complète pour un distributeur à Kinshasa : stock, factures, alertes et tableau de bord quotidien.",
      resultText: 'de temps passé sur les inventaires manuels',
    },
    en: {
      tag: 'Software',
      title: 'Inventory & sales management',
      excerpt:
        'A complete management platform for a Kinshasa distributor: stock, invoices, alerts and daily dashboard.',
      resultText: 'time spent on manual stock counts',
    },
  },
  {
    cat: 'security',
    order: 2,
    result: '24/7',
    fr: {
      tag: 'Sécurité',
      title: 'Système de surveillance 24 caméras',
      excerpt:
        "Installation complète de caméras IP avec vision nocturne et accès à distance depuis le smartphone pour un campus d'entreprise.",
      resultText: 'surveillance à distance depuis n’importe quel téléphone',
    },
    en: {
      tag: 'Security',
      title: '24-camera surveillance system',
      excerpt:
        'Full installation of IP cameras with night vision and remote smartphone access for a company campus.',
      resultText: 'remote monitoring from any phone',
    },
  },
  {
    cat: 'iot',
    order: 3,
    result: '100%',
    fr: {
      tag: 'IoT',
      title: "Jauge de cuve d'eau connectée",
      excerpt:
        'Un capteur qui envoie le niveau d’eau par SMS et application — plus jamais à sec.',
      resultText: 'de tranquillité, alertes en temps réel',
    },
    en: {
      tag: 'IoT',
      title: 'Connected water tank monitoring',
      excerpt:
        'A sensor that sends the water level to your phone by SMS and app — never run dry again.',
      resultText: 'peace of mind, real-time alerts',
    },
  },
  {
    cat: 'iot',
    order: 4,
    result: '1 app',
    fr: {
      tag: 'IoT',
      title: 'Maison intelligente pour une villa privée',
      excerpt:
        'Éclairage, portail, climatisation et alarmes pilotés depuis une seule application, avec solution de secours locale en cas de coupure.',
      resultText: 'pour piloter toute la maison',
    },
    en: {
      tag: 'IoT',
      title: 'Smart home for a private villa',
      excerpt:
        'Lighting, gate, AC and alarms controlled from one phone app, with local backup during power cuts.',
      resultText: 'to control the entire house',
    },
  },
  {
    cat: 'software',
    order: 5,
    result: '3x',
    fr: {
      tag: 'Logiciel',
      title: 'Plateforme de gestion scolaire',
      excerpt:
        'Inscriptions, notes, présences et communication avec les parents sur une seule plateforme web et mobile.',
      resultText: 'plus rapide en administration scolaire',
    },
    en: {
      tag: 'Software',
      title: 'School management platform',
      excerpt:
        'Enrolment, grades, attendance and parent communication in one web and mobile platform.',
      resultText: 'faster school administration',
    },
  },
  {
    cat: 'security',
    order: 6,
    result: '0',
    fr: {
      tag: 'Sécurité',
      title: "Contrôle d'accès de bureaux",
      excerpt:
        "Système de portes par badge et code avec journal complet des entrées et sorties pour les bureaux d'une entreprise.",
      resultText: "entrée non autorisée depuis l'installation",
    },
    en: {
      tag: 'Security',
      title: 'Office access control',
      excerpt:
        'Badge and code door system with a complete log of entries and exits for a company offices.',
      resultText: 'unauthorized entries since installation',
    },
  },
]

/* ------------------------------------------------------------------ */
/* Image generation                                                    */
/* ------------------------------------------------------------------ */
const grads: Record<Cat, [string, string, string]> = {
  software: ['#0ea5e9', '#4f46e5', '#0284c7'],
  security: ['#0891b2', '#6366f1', '#0ea5e9'],
  iot: ['#22d3ee', '#0ea5e9', '#6366f1'],
}

function emblem(cat: Cat): string {
  const s = 'stroke="#ffffff" stroke-opacity="0.92" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"'
  if (cat === 'software') {
    return `
      <g ${s} transform="translate(800 440)">
        <path d="M-170 40 L0 -60 L170 40" />
        <path d="M-170 -50 L0 -150 L170 -50" />
        <path d="M-170 130 L0 30 L170 130" opacity="0.7" />
      </g>`
  }
  if (cat === 'security') {
    return `
      <g ${s} transform="translate(800 430)">
        <path d="M0 -170 L150 -110 V30 C150 120 0 175 0 175 C0 175 -150 120 -150 30 V-110 Z" />
        <path d="M-58 10 L-16 55 L66 -42" />
      </g>`
  }
  return `
    <g ${s} transform="translate(800 440)">
      <rect x="-110" y="-110" width="220" height="220" rx="28" />
      <rect x="-45" y="-45" width="90" height="90" rx="14" />
      <path d="M-55 -150 V-110 M0 -150 V-110 M55 -150 V-110 M-55 110 V150 M0 110 V150 M55 110 V150 M-150 -55 H-110 M-150 0 H-110 M-150 55 H-110 M110 -55 H150 M110 0 H150 M110 55 H150" />
      <path d="M170 -70 C230 -30 230 30 170 70" opacity="0.75" />
      <path d="M-170 -70 C-230 -30 -230 30 -170 70" opacity="0.75" />
    </g>`
}

async function makeImage(cat: Cat, title: string): Promise<Buffer> {
  const [c1, c2, c3] = grads[cat]
  const esc = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="0.55" stop-color="${c2}"/>
        <stop offset="1" stop-color="${c3}"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.72" cy="0.22" r="0.65">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.34"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="2.5" fill="#ffffff" fill-opacity="0.22"/>
      </pattern>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
    <rect width="1600" height="900" fill="url(#dots)"/>
    <rect width="1600" height="900" fill="url(#glow)"/>
    <circle cx="1420" cy="760" r="260" fill="#ffffff" fill-opacity="0.08"/>
    ${emblem(cat)}
    <text x="90" y="800" font-family="Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff" fill-opacity="0.95">${esc}</text>
    <text x="90" y="846" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#ffffff" fill-opacity="0.7">QUALCUS</text>
  </svg>`

  return sharp(Buffer.from(svg)).png().toBuffer()
}

/* ------------------------------------------------------------------ */
/* Main (top-level await so `payload run` does not exit early)         */
/* ------------------------------------------------------------------ */
const payload = await getPayload({ config })

// 1. Admin user
const adminEmail = process.env.ADMIN_EMAIL || 'admin@qualcus.com'
const adminPassword = process.env.ADMIN_PASSWORD
if (!adminPassword) {
  console.error('ADMIN_PASSWORD is required to create the admin user (set it in cms/.env).')
  process.exit(1)
}

const existing = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1 })
if (existing.docs.length === 0) {
  await payload.create({ collection: 'users', data: { email: adminEmail, password: adminPassword } })
  console.error(`✓ Admin user created: ${adminEmail}`)
} else {
  console.error(`• Admin user already exists: ${adminEmail}`)
}

// 2. Skip if projects already seeded
const current = await payload.find({ collection: 'projects', limit: 1 })
if (current.totalDocs > 0) {
  console.error(`• Projects already present (${current.totalDocs}) — skipping seed.`)
} else {
  // 3. Create images + projects
  for (const p of projects) {
    const buf = await makeImage(p.cat, p.fr.title)
    const media = await payload.create({
      collection: 'media',
      data: { alt: p.fr.title },
      file: { data: buf, name: `${p.order}-${p.cat}.png`, mimetype: 'image/png', size: buf.length },
    })

    const doc = await payload.create({
      collection: 'projects',
      locale: 'fr',
      data: {
        title: p.fr.title,
        category: p.cat,
        tag: p.fr.tag,
        excerpt: p.fr.excerpt,
        result: p.result,
        resultText: p.fr.resultText,
        image: media.id,
        order: p.order,
        featured: p.order === 1,
      },
    })

    await payload.update({
      id: doc.id,
      collection: 'projects',
      locale: 'en',
      data: {
        title: p.en.title,
        tag: p.en.tag,
        excerpt: p.en.excerpt,
        resultText: p.en.resultText,
      },
    })

    console.error(`✓ ${p.fr.title}`)
  }
  console.error('\nSeed complete.')
}

process.exit(0)
