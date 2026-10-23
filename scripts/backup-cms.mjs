#!/usr/bin/env node
/**
 * Backup / restore the CMS data (SQLite database + uploaded media).
 *
 *   node scripts/backup-cms.mjs                       -> backups/qualcus-cms-<timestamp>.tar.gz
 *   node scripts/backup-cms.mjs restore <file.tar.gz>
 *
 * A restore replaces the database file, so the CMS must be stopped first —
 * otherwise the running process keeps the old file open and every write fails
 * with "attempt to write a readonly database".
 */
import { execFileSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync } from 'node:fs'
import { createConnection } from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cmsDir = path.join(root, 'cms')
const backupDir = path.join(root, 'backups')
const CMS_PORT = 3001

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const tarball = path.join(backupDir, `qualcus-cms-${stamp}.tar.gz`)

function cmsIsRunning() {
  return new Promise((resolve) => {
    const socket = createConnection({ host: '127.0.0.1', port: CMS_PORT })
    socket.setTimeout(700)
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => resolve(false))
  })
}

if (process.argv[2] === 'restore') {
  const file = process.argv[3]
  if (!file || !existsSync(file)) {
    console.error('Usage: node scripts/backup-cms.mjs restore <file.tar.gz>')
    process.exit(1)
  }

  if (await cmsIsRunning()) {
    console.error(
      `The CMS is still running on port ${CMS_PORT}.\n` +
        'Stop it first (Ctrl+C in the dev terminal, or `lsof -ti:3001 | xargs kill`),\n' +
        'then run the restore again.',
    )
    process.exit(1)
  }

  console.log(`Restoring ${file} into ${cmsDir} …`)
  execFileSync('tar', ['-xzf', path.resolve(file), '-C', cmsDir], { stdio: 'inherit' })

  const db = path.join(cmsDir, 'qualcus.db')
  if (existsSync(db)) chmodSync(db, 0o644)

  console.log('Done. Start the CMS again to pick up the restored data.')
  process.exit(0)
}

const items = ['qualcus.db', 'media'].filter((item) => existsSync(path.join(cmsDir, item)))
if (items.length === 0) {
  console.error('Nothing to back up: cms/qualcus.db and cms/media are missing.')
  process.exit(1)
}

mkdirSync(backupDir, { recursive: true })
execFileSync('tar', ['-czf', tarball, ...items], { cwd: cmsDir, stdio: 'inherit' })

console.log(`✓ Backup written: ${path.relative(root, tarball)}`)
console.log(`  Contains: ${items.join(', ')}`)
