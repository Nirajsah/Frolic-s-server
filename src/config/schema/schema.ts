import { pgTable, integer, serial, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name'),
  image: text('image'),
  price: integer('price'),
  categoryId: text('category_id'),
})

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  productId: text('product_id').references(() => products.id),
  quantity: integer('quantity').default(1),
})
