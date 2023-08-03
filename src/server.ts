// required imports
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  res.json({ msg: 'Hello from express' })
})

app.listen(PORT, () => {
  console.log(`🚀Server running on http://localhost:${PORT}`)
})
