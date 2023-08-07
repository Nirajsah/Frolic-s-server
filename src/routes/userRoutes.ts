// import logic from controllers
import express, { Request, Response } from 'express'
import { authMiddleware } from 'src/auth/authMiddleware'
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
  try {
    const data = await handleRegister(username, email, password)
    res.send(data)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const data = await handleLogin(email, password)
    const token = generateJWT(data)
    res.cookie('Bearer', token, {
      httpOnly: true,
      secure: true, // This ensures the cookie is only sent over HTTPS
      sameSite: 'strict', // This prevents cross-site request forgery (CSRF) attacks
    })
    res.json({ accessToken: token })
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

export default router
