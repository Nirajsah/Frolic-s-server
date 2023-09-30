import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import userRouter from './routes/userRoutes.ts'
import postRouter from './routes/postRoutes.ts'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', postRouter)

// app.use((err: any, req: any, res: any, next: any) => {
//   // Handle the error here and send an appropriate response
//   res.status(err.status || 500).json({ message: err.message })
// })
//
app.listen(PORT, () => {
  console.log(`🚀Server running on http://localhost:${PORT}`)
})
