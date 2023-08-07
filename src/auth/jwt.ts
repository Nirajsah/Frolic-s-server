import jwt, { Secret } from 'jsonwebtoken'

export const generateJWT = <T extends object>(user: T): string => {
  const accessTokenKey: Secret = process.env.ACCESS_TOKEN_KEY as Secret
  const accessToken = jwt.sign(user, accessTokenKey)
  return accessToken
}
