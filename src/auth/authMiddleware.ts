import jwt, { Secret } from 'jsonwebtoken'
import createError from 'http-errors'

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return next(createError(401, 'Access token not provided.'))
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY as Secret)
    // req.user = user // Attach the user to the request object if needed
    next()
  } catch (error) {
    return next(createError({ status: 401, message: 'Authentication failed.' }))
  }
}
