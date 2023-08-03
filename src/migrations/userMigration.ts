import { gt } from 'drizzle-orm'
import { db } from '../config/database.js'
import { users } from '../config/schema/schema.js'

async function getAllUsers() {
  await db.delete(users).where(gt(users.id, 5))
  const data = await db.select().from(users)
  console.log(data)
  process.exit(0)
}
getAllUsers()
