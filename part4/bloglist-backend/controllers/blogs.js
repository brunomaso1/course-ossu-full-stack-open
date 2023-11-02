const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => response.json(await Blog.find({})))

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findByIdAndDelete(id)
  return result ? response.status(204).end() : response.status(404).end()
  // One liner implementation:
  // return await Blog.findByIdAndDelete(request.params.id) ? response.status(204).end() : response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { body } = request

  const result = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
  return result ? response.status(200).json(result) : response.status(404).end()
})

module.exports = blogsRouter