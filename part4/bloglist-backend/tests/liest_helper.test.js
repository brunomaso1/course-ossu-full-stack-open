const listHelper = require('../utils/list_helper')

const blogsEmpty = []
const blogsUnique = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogsMany = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('test: dummy', () => {
  test('dummy returns one', () => {
    const blogs = blogsEmpty
    const expectedResult = 1

    const result = listHelper.dummy(blogs)
    expect(result).toBe(expectedResult)
  })
});

describe('test: totalLikes', () => {
  test('of empty list is zero', () => {
    const blogs = blogsEmpty
    const expectedResult = 0

    const result = listHelper.totalLikes(blogs)
    return expect(result).toBe(expectedResult)
  })

  test('when list has only one blog equals the like of that', () => {
    const blogs = blogsUnique
    const expectedResult = 5

    const result = listHelper.totalLikes(blogs)
    return expect(result).toBe(expectedResult)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = blogsMany
    const expectedResult = 36

    const result = listHelper.totalLikes(blogs)
    return expect(result).toBe(expectedResult)
  })
})

describe('test: favoriteBlog', () => {
  test('of empty list is null', () => {
    const blogs = blogsEmpty
    const expectedResult = null

    const result = listHelper.favoriteBlog(blogs)
    return expect(result).toEqual(expectedResult)
  })

  test('of one element is the element', () => {
    const blogs = blogsUnique
    const expectedResult = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    const result = listHelper.favoriteBlog(blogs)
    return expect(result).toEqual(expectedResult)
  })

  test('of many elements', () => {
    const blogs = blogsMany
    const expectedResult = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    const result = listHelper.favoriteBlog(blogs)
    return expect(result).toEqual(expectedResult)
  })

  test('two blogs with same likes, take the first one', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 7,
        __v: 0
      }
    ]
    const expectedResult = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }

    const result = listHelper.favoriteBlog(blogs)
    return expect(result).toEqual(expectedResult)
  })
})

describe('test: mostBlogs', () => {
  test('of empty list is null', () => {
    const blogs = blogsEmpty
    const expectedResult = null

    const result = listHelper.mostBlogs(blogs)
    return expect(result).toEqual(expectedResult)
  })

  test('of one element is the element', () => {
    const blogs = blogsUnique
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    const result = listHelper.mostBlogs(blogs)
    return expect(result).toEqual(expectedResult)
  })

  test('of many authors with many elements', () => {
    const blogs = blogsMany
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    return expect(result).toEqual(expectedResult)
  })
})