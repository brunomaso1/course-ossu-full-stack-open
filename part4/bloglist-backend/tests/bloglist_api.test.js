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

describe('test: get /api/blogs', () => {
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

describe('test: post /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  })

  test('length of returned blogs is incresed by one', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').send(newBlog)
    const { body: returnedBlogList } = await api.get('/api/blogs')

    return expect(returnedBlogList).toHaveLength(initialBloglists.length + 1)
  })

  test('the blog is added to the DB', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').send(newBlog)
    const { body: returnedBlogList } = await api.get('/api/blogs')

    return expect(returnedBlogList).toContainEqual(expect.objectContaining(newBlog))
  })

  test('verifies that likes property defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest'
    }

    const { body: blogResult } = await api.post('/api/blogs').send(newBlog)
    return expect(blogResult.likes).toBeDefined() && expect(blogResult.likes).toBe(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})