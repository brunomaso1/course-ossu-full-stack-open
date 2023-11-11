const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => response.json(await Blog.find({}).populate('user', { username: 1, name: 1 })))

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { userId } = request
  if (!userId) return response.status(401).json({ error: 'invalid token' })

  const blog = new Blog(request.body)
  const user = await User.findById(userId)
  blog.user = user.id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogId = request.params.id
  const { userId } = request
  if (!userId) return response.status(401).json({ error: 'invalid token' })

  const blog = await Blog.findById(blogId)

  if (!blog) return response.status(404).end()
  if (blog?.user.toString() === userId.toString()) {
    // Eliminate blog id from users blogs.
    const user = await User.findById(userId)
    const blogs = user.blogs.filter((blg) => {
      return blg.id !== blog.id
    })
    await User.findByIdAndUpdate(user.id, { blogs }, { new: true, runValidators: true, context: 'query' })

    await Blog.findByIdAndDelete(blogId)
    return response.status(204).end()
  } else {
    return response.status(400).json({ error: 'blog does not belog to user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { body } = request

  const result = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
  return result ? response.status(200).json(result) : response.status(404).end()
})

module.exports = blogsRouter