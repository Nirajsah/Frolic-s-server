import { log } from 'console'
import { eq, gt } from 'drizzle-orm'
import { db } from 'src/config/database'
import { posts, users } from 'src/config/schema/schema'

type Post = {
  id: number
  userId: number
  message: string
  imageUrl: string | undefined
  likes: number | undefined
  createdAt?: Date
  updatedAt?: Date
}
const Post = {
  postId: 2,
  userId: 2,
  message: 'adding a post',
  imageUrl: '',
  likes: 0,
}
export const addPost = async <
  TPost extends {
    userId: number
    message: string
    imageUrl?: string | null | undefined
    likes?: number | null | undefined
  }
>(
  post: TPost
) => {
  try {
    log('starting...')
    const result = await db.insert(posts).values(post).returning()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

export const getPost = async () => {
  try {
    const result = await db
      .select({
        users: { userId: users.id, username: users.username },
        posts,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
    // console.log(result)
    return result.reverse()
  } catch (error) {
    console.log(error)
    return error
  }
}

// await db.delete(posts).where(gt(posts.postId, 2))
