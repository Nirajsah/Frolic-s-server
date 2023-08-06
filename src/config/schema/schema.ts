import { relations } from 'drizzle-orm'
import { pgTable, text, index, serial } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username'),
    email: text('email').unique(),
    password: text('password'),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.email),
    }
  }
)
