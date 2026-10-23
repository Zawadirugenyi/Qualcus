import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Placeholder — replaced automatically by `npm run db:migrate:create`.
 * Payload regenerates this file with the real migration list.
 */
export const migrations: {
  down: (args: MigrateDownArgs) => Promise<void>
  name: string
  up: (args: MigrateUpArgs) => Promise<void>
}[] = []
