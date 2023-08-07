// import logic from migrations
import { createUser, loginUser } from 'src/migrations/userMigration'
export const handleRegister = async <TUser extends string>(
  username: TUser,
  email: TUser,
  password: TUser
): Promise<{
  username: string | null
  email: string | null
}> => {
  const newUser = {
    username,
    email,
    password,
  }
  try {
    const result = await createUser(newUser)
    return result
  } catch (error) {
    return error
  }
}

export const handleLogin = async <TUser extends string>(
  email: TUser,
  password: TUser
): Promise<{ email: string | null; username: string | null }> => {
  const user = {
    email,
    password,
  }
  try {
    const data = await loginUser(user)
    return data
  } catch (error) {
    throw error
  }
}
