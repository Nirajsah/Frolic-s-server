import express, { Request, Response } from 'express'
import { addPost, getPost } from 'src/migrations/postMigration'

const router = express.Router()

router.get('/posts', async (_: Request, res: Response) => {
  try {
    const data = await getPost()
    res.json(data)
  } catch (error) {
    res.send(error)
  }
})

router.post('/addpost', async (req: Request, res: Response) => {
  const { userId, message, imageUrl } = req.body
  console.log(userId, message, imageUrl)
  const post = {
    userId,
    message,
  }
  try {
    const result = await addPost(post)
    res.json(result)
  } catch (error) {}
})

export default router
