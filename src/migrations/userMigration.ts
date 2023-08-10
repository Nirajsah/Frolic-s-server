import { AnyColumn, eq } from 'drizzle-orm'
import { db } from '../config/database.js'
import { users } from '../config/schema/schema.js'
import createError from 'http-errors'

const checkUserUniqueness = async <TEmail extends string | AnyColumn>(
  email: TEmail
): Promise<boolean> => {
  const user = await db
    .select()
    .from(users)
    .limit(1)
    .where(eq(users.email, email))
  if (user[0] === undefined) {
    return true
  }
  throw createError(409, {
    message: 'User already exists',
    errorCode: 1001,
  })
}
export const createUser = async <
  TUser extends {
    username: string
    email: string
    password: string
  }
>(
  user: TUser
): Promise<{ username: string | null; email: string | null }> => {
  const { username, email, password } = user
  if (!username)
    throw createError(400, { message: 'please provide with an username' })
  if (!email)
    throw createError(400, { message: 'please provide with an email' })
  if (!password)
    throw createError(400, { message: 'please provide with an password' })

  const _isUnique = await checkUserUniqueness(email)
  if (_isUnique) {
    try {
      // const hash_password = password;
      const [result] = await db.insert(users).values(user).returning({
        username: users.username,
        email: users.email,
      })
      return result
    } catch (error) {
      throw error
    }
  } else {
    throw createError({
      errorCode: 400,
      message: `${username} already exist`,
    })
  }
}

export const loginUser = async <
  TUser extends { email: string; password: string }
>(
  user: TUser
): Promise<{
  email: string | null
  username: string | null
}> => {
  const { email, password } = user
  if (!email) throw createError(400, { message: 'provide a valid email' })
  if (!password) throw createError(400, { message: 'provide a valid password' })

  try {
    const [User] = await db
      .select()
      .from(users)
      .limit(1)
      .where(eq(users.email, email))

    if (User.password === password) {
      console.log('user logged In')
      return { username: User.username, email: User.email }
    } else {
      throw createError({
        errorCode: 403,
        message: 'Unauthorized! Wrong Password',
      })
    }
  } catch (error) {
    throw error
  }
}
