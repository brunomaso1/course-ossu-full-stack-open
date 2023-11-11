const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => response.json(await Blog.find({}).populate('user', { username: 1, name: 1 })))

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) return response.status(401).json({ error: 'invalid token' })

  const blog = new Blog(request.body)
  const user = await User.findById(decodedToken.id)
  blog.user = user.id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => await Blog.findByIdAndDelete(request.params.id) ? response.status(204).end() : response.status(404).end())

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { body } = request

  const result = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
  return result ? response.status(200).json(result) : response.status(404).end()
})

module.exports = blogsRouter