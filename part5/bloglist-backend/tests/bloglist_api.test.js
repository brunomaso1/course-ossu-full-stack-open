// Already done!
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const { blogs: initialBloglists, users: initialUsers } = require('./bloglist_api_test_data.json')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

async function insertUserBlogRelations() {
  const user1 = await User.findOne({ username: 'test' })
  const blog1 = await Blog.findOne({ title: 'Title1' })
  user1.blogs = user1.blogs.concat(blog1.id)
  blog1.user = user1.id
  user1.save()
  blog1.save()

  const user2 = await User.findOne({ username: 'test1' })
  const blog2 = await Blog.findOne({ title: 'Title2' })
  user2.blogs = user2.blogs.concat(blog2.id)
  blog2.user = user2.id
  user2.save()
  blog2.save()
}

async function getTokenUserTest() {
  const user = await User.findOne({ username: 'test' })
  return jwt.sign({ username: 'test', id: user.id }, process.env.SECRET)
}

beforeEach(async () => {
  // Clean up database.
  await User.deleteMany({})
  await Blog.deleteMany({})

  // Insert data.
  await User.insertMany(initialUsers)
  await Blog.insertMany(initialBloglists)

  await insertUserBlogRelations()
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

  test('blog has user assigned', async () => {
    const blog = await Blog.findOne({ title: 'Title1' })

    const { body: returnedBlogList } = await api.get('/api/blogs')

    const blogFilterd = returnedBlogList.filter((blg) => blg.title === blog.title)[0]

    return expect(blogFilterd.user.username).toBe('test')
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

    return await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await getTokenUserTest()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('length of returned blogs is incressed by one', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${await getTokenUserTest()}`).send(newBlog)
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

    await api.post('/api/blogs').set('Authorization', `Bearer ${await getTokenUserTest()}`).send(newBlog)
    const dbBloglist = await Blog.find({})

    return expect(dbBloglist).toContainEqual(expect.objectContaining(newBlog))
  })

  test('verifies that likes property defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'urlTest'
    }

    const { body: blogResult } = await api.post('/api/blogs').set('Authorization', `Bearer ${await getTokenUserTest()}`).send(newBlog)
    return expect(blogResult.likes).toBeDefined() && expect(blogResult.likes).toBe(0)
  })

  test('property title missing', async () => {
    const newBlog = {
      author: 'AuthorTest',
      url: 'urlTest',
      likes: 10
    }

    return await api.post('/api/blogs').set('Authorization', `Bearer ${await getTokenUserTest()}`).send(newBlog).expect(400)
  })

  test('property url missing', async () => {
    const newBlog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      likes: 10
    }

    return await api.post('/api/blogs').set('Authorization', `Bearer ${await getTokenUserTest()}`).send(newBlog).expect(400)
  })
})

describe('test: DELETE /api/blogs/:id', () => {
  describe('try delete with user loged in', () => {
    test('returned code 204 when the blog exists', async () => {
      const { id } = await Blog.findOne({ title: 'Title1' })

      return await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${await getTokenUserTest()}`).expect(204)
    })

    test('returned code 404 when the blog does not exists', async () => {
      const notOnBDId = '654404984f624faa1f100972'
      return await api.delete(`/api/blogs/${notOnBDId}`).set('Authorization', `Bearer ${await getTokenUserTest()}`).expect(404)
    })

    test('the blog is not more in the database', async () => {
      const { id } = await Blog.findOne({ title: 'Title1' })

      await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${await getTokenUserTest()}`).expect(204)
      const dbBloglist = await Blog.find({})

      return expect(dbBloglist).not.toContainEqual(expect.objectContaining({ id }))
    })

    test('the id is bad formated, returns 400', async () => {
      const malFormedId = '654404984f624faa1f10097'
      return await api.delete(`/api/blogs/${malFormedId}`).set('Authorization', `Bearer ${await getTokenUserTest()}`).expect(400)
    })

    test('blog does not belog to user', async () => {
      const { id } = await Blog.findOne({ title: 'Title2' })

      const { body } = await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${await getTokenUserTest()}`).expect(400)
      return expect(body.error).toBeDefined()
    })
  })

  describe('try delete with invalid user', () => {
    test('user not logued in', async () => {
      const { id } = await Blog.findOne({ title: 'Title1' })

      return await api.delete(`/api/blogs/${id}`).expect(401)
    })
  })

})

describe('test: PUT /api/blogs/:id', () => {
  test('returned code 200 when the blog exists', async () => {
    const blogToUpdate = {
      title: 'UpdatedTitle',
      author: 'UpdatedAuthor',
      url: 'UpdatedURL',
      likes: 0
    }
    const { id } = await Blog.findOne({})

    return await api.put(`/api/blogs/${id}`).send(blogToUpdate).expect(200).expect('Content-Type', /application\/json/)
  })

  test('returned code 404 when the blog does not exists', async () => {
    const blogToUpdate = {
      title: 'UpdatedTitle',
      author: 'UpdatedAuthor',
      url: 'UpdatedURL',
      likes: 0
    }
    const notOnBDId = '654404984f624faa1f100972'
    return await api.put(`/api/blogs/${notOnBDId}`).send(blogToUpdate).expect(404)
  })

  test('the content is updated in the database', async () => {
    const blogToUpdate = {
      title: 'UpdatedTitle',
      author: 'UpdatedAuthor',
      url: 'UpdatedURL',
      likes: 0
    }
    const { id } = await Blog.findOne({})

    await api.put(`/api/blogs/${id}`).send(blogToUpdate)
    const dbBlog = await Blog.findById(id)
    return expect(dbBlog).toEqual(expect.objectContaining(blogToUpdate))
  })

  test('the id is bad formated', async () => {
    const malFormedId = '654404984f624faa1f10097'
    return await api.put(`/api/blogs/${malFormedId}`).expect(400)
  })
})

describe('test: GET /api/users/', () => {
  test('return code 200 && Content-Type=aplication-json', async () => await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/))

  test('all users are returned', async () => {
    const { body: returnedUsers } = await api.get('/api/users')

    return expect(returnedUsers).toHaveLength(initialUsers.length)
  })

  test('a specific user is returned', async () => {
    const { body: returnedUsers } = await api.get('/api/users')
    const user = initialUsers[0]

    return expect(returnedUsers).toContainEqual(expect.objectContaining({ name: user.name }))
  })
})

describe('test: POST /api/users', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'test2',
      name: 'test2',
      password: 'test2'
    }

    return await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
  })

  test('length of returned users is incressed by one', async () => {
    const newUser = {
      username: 'test2',
      name: 'test2',
      password: 'test2'
    }

    await api.post('/api/users').send(newUser)
    const dbUsers = await User.find({})

    return expect(dbUsers).toHaveLength(initialUsers.length + 1)
  })

  test('the user is added to the DB', async () => {
    const newUser = {
      username: 'test2',
      name: 'test2',
      password: 'test2'
    }

    await api.post('/api/users').send(newUser)
    const dbUsers = await User.find({})

    return expect(dbUsers).toContainEqual(expect.objectContaining({ username: newUser.username, name: newUser.name }))
  })

  test('Username check', async () => {
    const newUser = {
      name: 'test2',
      password: 'test2'
    }

    let { body } = await api.post('/api/users').send(newUser).expect(400)
    expect(body.error).toBeDefined()

    newUser.username = 't'
    body = await api.post('/api/users').send(newUser).expect(400)

    return expect(body.error).toBeDefined()
  })

  test('Password check', async () => {
    const newUser = {
      username: 'test2',
      name: 'test2',
    }

    let { body } = await api.post('/api/users').send(newUser).expect(400)
    expect(body.error).toBeDefined()

    newUser.password = 't'
    body = await api.post('/api/users').send(newUser).expect(400)

    return expect(body.error).toBeDefined()
  })

  test('user uniqueness', async () => {
    const newUser1 = {
      username: 'test2',
      name: 'test2',
      password: 'test2'
    }

    const newUser2 = {
      username: 'test2',
      name: 'othername',
      password: 'otherpassword'
    }

    await api.post('/api/users').send(newUser1)
    let { body } = await api.post('/api/users').send(newUser2).expect(400)

    return expect(body.error).toBeDefined()
  })
})

describe('test: POST /api/login', () => {
  test('login correct', async () => {
    const user = {
      username: 'test',
      password: 'test'
    }

    const { body } = await api.post('/api/login').send(user).expect(200)

    return expect(body.token).toBeDefined()
  })

  test('login incorrect', async () => {
    const user = {
      username: 'test',
      password: 'wrrongPassword'
    }

    const { body } = await api.post('/api/login').send(user).expect(401)

    return expect(body.error).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})