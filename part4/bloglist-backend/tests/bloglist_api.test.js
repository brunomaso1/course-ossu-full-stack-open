const mongoose = require('mongoose')
const Blog = require('../models/blog')

const initialBloglists = require('./bloglist_api_test_data.json')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const bloglist of initialBloglists) {
    const blogObject = Blog(bloglist)
    await blogObject.save()
  }
})

describe('test: get all bloglist - /api/blogs', () => {
  test('return code 200 && Content-Type=aplication-json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are rturned', async () => {
    const { body: returnedBlogList } = await api.get('/api/blogs')

    return expect(returnedBlogList).toHaveLength(initialBloglists.length)
  })

  test('blogs returned contain a specific blog', async () => {
    const blogInInitalList = initialBloglists[0]
    const { body: returnedBlogList } = await api.get('/api/blogs')

    return expect(returnedBlogList).toContainEqual(expect.objectContaining(blogInInitalList))
  })

  test('blogs returned has an id property', async () => {
    const { body: returnedBlogList } = await api.get('/api/blogs')

    return expect(returnedBlogList[0].id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})