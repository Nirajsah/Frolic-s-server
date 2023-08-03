import type { Config } from 'drizzle-kit'

export default {
  driver: 'pg',
  schema: './src/config/schema/schema.ts',
  out: 'drizzle',
  dbCredentials: {
    connectionString: 'postgres://postgres:postgres@localhost:5432/shop',
  },
} satisfies Config
