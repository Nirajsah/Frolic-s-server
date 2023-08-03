import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pkg from 'pg'

const { Client } = pkg

const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/shop',
})

client.connect()
export const db: NodePgDatabase = drizzle(client)

export const MigrateDB = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' })
    console.log('Migrations completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error running migrations:', error)
  }
}
