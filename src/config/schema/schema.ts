import { sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  index,
  serial,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core'

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

export const posts = pgTable('posts', {
  postId: serial('post_id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  message: text('message'),
  imageUrl: text('image_url'),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
})
