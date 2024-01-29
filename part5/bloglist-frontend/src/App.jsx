import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogOut from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import ToggableButton from './components/ToggableButton'

import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [mustUpdateBlogs, setMustUpdateBlogs] = useState(false)

  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggableButtonRef = useRef()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('localStorageUser'))
    setUser(user)
    blogService.setToken(user?.token)
  }, [])

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getBlogs()
    setMustUpdateBlogs(false)
  }, [mustUpdateBlogs])

  if (!user) return (
    <div>
      <h1>log in to application</h1>
      <ErrorMessage message={errorMessage} />
      <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} setNotification={setNotification} />
      <p>{user.name} logged in <LogOut setUser={setUser} /></p>
      <ToggableButton title="create new blog" ref={toggableButtonRef}>
        <BlogForm setMustUpdateBlogs={setMustUpdateBlogs} setNotification={setNotification}
          toggableButtonRef={toggableButtonRef} />
      </ToggableButton>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App