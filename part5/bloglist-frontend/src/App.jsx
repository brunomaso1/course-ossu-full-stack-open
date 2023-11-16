import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogOut from './components/Logout'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [mustUpdateBlogs, setMustUpdateBlogs] = useState(false)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [mustUpdateBlogs])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('localStorageUser'))
    setUser(user)
    blogService.setToken(user?.token)
  }, [])

  if (!user) return <LoginForm setUser={setUser} />

  return (
    <div>
      <h1>blogs</h1>
      <p>{user.name} logged in <LogOut setUser={setUser} /></p>
      <h2>create new</h2>
      <BlogForm setMustUpdateBlogs={setMustUpdateBlogs} mustUpdateBlogs={mustUpdateBlogs} />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App