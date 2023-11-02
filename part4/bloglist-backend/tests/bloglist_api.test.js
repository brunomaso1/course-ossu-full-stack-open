const mongoose = require('mongoose')
const Blog = require('../models/blog')

const initialBloglists = require('./bloglist_api_test_data.json')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBloglists)
})

describe('test: GET /api/blogs', () => {
  test('return code 200 && Content-Type=aplication-json', async () => await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/))

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

describe('test: POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    return await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  })

  test('length of returned blogs is incressed by one', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').send(newBlog)
    const dbBloglist = await Blog.find({})

    return expect(dbBloglist).toHaveLength(initialBloglists.length + 1)
  })

  test('the blog is added to the DB', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').send(newBlog)
    const dbBloglist = await Blog.find({})

    return expect(dbBloglist).toContainEqual(expect.objectContaining(newBlog))
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

  test('property title missing', async () => {
    const newBlog = {
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    return await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('property url missing', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      likes: 10
    }

    return await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('test: DELETE /api/blogs/:id', () => {
  test('returned code 204 when the blog exists', async () => {
    const { id } = await Blog.findOne({})

    return await api.delete(`/api/blogs/${id}`).expect(204)
  })
  test('returned code 404 when the blog does not exists', async () => {
    const notOnBDId = '654404984f624faa1f100972'
    return await api.delete(`/api/blogs/${notOnBDId}`).expect(404)
  })
  test('the blog is not more in the database', async () => {
    const { id } = await Blog.findOne({})

    await api.delete(`/api/blogs/${id}`).expect(204)
    const dbBloglist = await Blog.find({})

    return expect(dbBloglist).not.toContainEqual(expect.objectContaining({ id }))
  })
  test('the id is bad formated, returns 400', async () => {
    const malFormedId = '654404984f624faa1f10097'
    return await api.delete(`/api/blogs/${malFormedId}`).expect(400)
  })
})

describe('test: PUT /api/blogs/:id', () => {
  test.todo('returned code 200 when the blog exists')
  test.todo('returned code 404 when the blog does not exists')
  test.todo('the content is updated in the database')
  test.todo('the id is bad formated')
})

afterAll(async () => {
  await mongoose.connection.close()
})