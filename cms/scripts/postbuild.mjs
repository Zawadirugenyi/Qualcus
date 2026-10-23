import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cmsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const standalone = path.join(cmsDir, '.next', 'standalone')

if (!existsSync(standalone)) {
  console.log('postbuild: no .next/standalone folder — nothing to copy.')
  process.exit(0)
}

const bundledEnv = path.join(standalone, '.env')
if (existsSync(bundledEnv)) {
  rmSync(bundledEnv)
  console.log('postbuild: removed .env from standalone (env vars must come from the server)')
}

mkdirSync(path.join(standalone, '.next'), { recursive: true })

for (const [from, to] of [
  [path.join(cmsDir, 'public'), path.join(standalone, 'public')],
  [path.join(cmsDir, '.next', 'static'), path.join(standalone, '.next', 'static')],
]) {
  if (!existsSync(from)) continue
  cpSync(from, to, { recursive: true })
  console.log(`postbuild: copied ${path.basename(from)} -> ${path.relative(cmsDir, to)}`)
}
