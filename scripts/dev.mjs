import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const processes = [
  { name: 'web', color: '\x1b[36m', args: ['run', 'dev'], cwd: root },
  { name: 'cms', color: '\x1b[35m', args: ['run', 'dev'], cwd: path.join(root, 'cms') },
]

const children = []
let shuttingDown = false

function prefix(name, color, chunk) {
  const lines = chunk.toString().split('\n')
  for (const line of lines) {
    if (line.trim() !== '') process.stdout.write(`${color}[${name}]\x1b[0m ${line}\n`)
  }
}

function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  process.exit(code)
}

for (const proc of processes) {
  const child = spawn(npm, proc.args, {
    cwd: proc.cwd,
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe'],
  })
  children.push(child)
  child.stdout.on('data', (chunk) => prefix(proc.name, proc.color, chunk))
  child.stderr.on('data', (chunk) => prefix(proc.name, proc.color, chunk))
  child.on('exit', (code) => {
    prefix(proc.name, proc.color, `exited with code ${code ?? 0}\n`)
    shutdown(code ?? 0)
  })
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
