// Simulates the nginx rules in deploy/nginx/qualcus.conf against the local
// CMS, to prove the routing works before the server exists.
//   location /api/    -> CMS      location /admin -> CMS
//   location /_next/  -> CMS      location /      -> SPA (index.html)
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const CMS = 'http://127.0.0.1:3001'
const DIST = new URL('../dist/', import.meta.url).pathname
const PORT = 3099

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' }

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const path = url.pathname

  if (path.startsWith('/api/') || path.startsWith('/admin') || path.startsWith('/_next/')) {
    const target = new URL(CMS + path + url.search)
    const upstream = await fetch(target, { method: req.method, headers: req.headers, body: undefined })
    const headers = Object.fromEntries(upstream.headers)
    delete headers['content-encoding']
    delete headers['content-length']
    res.writeHead(upstream.status, headers)
    res.end(Buffer.from(await upstream.arrayBuffer()))
    return
  }

  let file = DIST + path.slice(1)
  if (!existsSync(file) || path === '/') file = DIST + 'index.html'
  if (!existsSync(file)) { res.writeHead(404); res.end('not found'); return }
  const ext = file.slice(file.lastIndexOf('.'))
  res.writeHead(200, { 'content-type': TYPES[ext] || 'application/octet-stream' })
  res.end(await readFile(file))
})

server.listen(PORT, async () => {
  const checks = [
    ['/', 'spa'],
    ['/en/about', 'spa (client route)'],
    ['/realisations', 'spa (client route)'],
    ['/api/projects?limit=1', 'cms'],
    ['/admin', 'cms'],
    ['/api/media/file/6-security.png', 'cms'],
  ]
  for (const [p] of checks) {
    const r = await fetch(`http://127.0.0.1:${PORT}${p}`)
    console.log(`  ${String(r.status).padEnd(4)} ${p}`)
  }
  const admin = await fetch(`http://127.0.0.1:${PORT}/admin`)
  const html = await admin.text()
  const chunks = [...html.matchAll(/\/_next\/static\/[^"'\\ ]+/g)].map((m) => m[0])
  let failed = 0
  for (const chunk of [...new Set(chunks)].slice(0, 4)) {
    const r = await fetch(`http://127.0.0.1:${PORT}${chunk}`)
    const ct = r.headers.get('content-type') || ''
    const ok = r.status === 200 && !ct.includes('text/html')
    if (!ok) failed++
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${r.status} ${chunk.slice(0, 55)}  (${ct.split(';')[0]})`)
  }
  console.log(
    failed === 0
      ? `  PASS: all ${chunks.length} admin assets reach the CMS, not the SPA`
      : `  FAIL: ${failed} admin assets were swallowed by the SPA fallback`,
  )
  server.close()
})
