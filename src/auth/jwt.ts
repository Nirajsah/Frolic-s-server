import jwt, { Secret } from 'jsonwebtoken'

export const generateJWT = <T extends object>(
  user: T
): { accessToken: string; refreshToken: string } => {
  try {
    const accessTokenKey: Secret = process.env.ACCESS_TOKEN_KEY as Secret
    const refreshTokenKey: Secret = process.env.REFRESH_TOKEN_KEY as Secret
    const accessToken = jwt.sign(user, accessTokenKey, { expiresIn: '5m' })
    const refreshToken = jwt.sign(user, refreshTokenKey, {
      expiresIn: '15m',
    })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new Error(`Unable to provide accesstoken ${error}`)
  }
}

export const verifyRefreshToken = <T extends string>(refreshToken: T) => {
  const refreshTokenKey: Secret = process.env.REFRESH_TOKEN_KEY as Secret
  try {
    const user = jwt.verify(refreshToken, refreshTokenKey)
    console.log(user)
    // const token = generateJWT(user)
    // return token
  } catch (error) {
    throw error
  }
}
