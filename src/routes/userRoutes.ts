// import logic from controllers
import express, { Request, Response } from 'express'
import { authMiddleware, refreshTokenMiddleware } from 'src/auth/authMiddleware'
import { generateJWT } from 'src/auth/jwt'
import {
  handleLogin,
  handleRegister,
} from 'src/controllers/userController/user'

const router = express.Router()

declare module 'express-serve-static-core' {
  interface Request extends Express.Request {
    user?: object // Replace 'User' with the actual type of your user object
  }
}

router.get('/me', authMiddleware, (req: Request, res: Response) => {
  res.json({ data: req.user })
})

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  console.log(username, email, password)
  try {
    const data = await handleRegister(username, email, password) // creates a new user and returns a user object with (username, email )
    res.send(data)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.get('/accesstoken', refreshTokenMiddleware, async (req, res) => {
  const data = { user: req.user }
  try {
    const { accessToken } = generateJWT(data)
    res.json({
      data,
      accessToken: accessToken,
    })
  } catch (error) {
    res.send(error)
  }
})
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const data = await handleLogin(email, password)
    const { accessToken, refreshToken } = generateJWT(data) // Takes a user and generates a token
    // Takes a user and generates a token
    res.cookie('Bearer', accessToken, {
      httpOnly: true,
      secure: true, // This ensures the cookie is only sent over HTTPS
      sameSite: 'strict', // This prevents cross-site request forgery (CSRF) attacks
      domain: 'localhost',
    })

    res.json({
      data,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }) // we send user, accesstoken, refreshtoken to the client
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

export default router
