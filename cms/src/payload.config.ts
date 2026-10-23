import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Leads } from './collections/Leads'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cmsOrigins = (process.env.CMS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const databaseUri = process.env.DATABASE_URI || 'file:./qualcus.db'

const secret = process.env.PAYLOAD_SECRET
if (!secret) {
  throw new Error(
    'PAYLOAD_SECRET is missing. Copy cms/.env.example to cms/.env and set a long random value.',
  )
}

const isPostgres = databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://')

const db = isPostgres
  ? postgresAdapter({
      pool: { connectionString: databaseUri },
      prodMigrations: migrations,
    })
  : sqliteAdapter({ client: { url: databaseUri } })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Qualcus',
      description: 'Administration du site Qualcus — projets, médias et demandes de contact.',
      icons: [{ rel: 'icon', type: 'image/png', url: '/QUALCUS.png' }],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
      beforeLogin: ['/components/admin/LoginIntro'],
      beforeNav: ['/components/admin/NavBrand'],
    },
  },
  ...(cmsOrigins.length
    ? {
        cors: { origins: cmsOrigins, headers: ['Content-Type'] },
        csrf: cmsOrigins,
      }
    : {}),
  collections: [Users, Media, Projects, Leads],
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { fr, en },
  },
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
  plugins: [],
})
