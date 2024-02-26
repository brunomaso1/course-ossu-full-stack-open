import { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ({ setMustUpdateBlogs, setNotification, toggableButtonRef }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogsService.create(blog)
      setBlog({ title: '', author: '', url: '' })

      setMustUpdateBlogs(true)
      // Hide this component.
      toggableButtonRef.current.setShowToggableButton(true)

      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log('Could not create the blog', error)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate} >
        <label htmlFor='title'>Title:</label><input type="text" id='title' required value={blog.title} onChange={({ target }) => { setBlog({ ...blog, title: target.value }) }} /><br />
        <label htmlFor='author'>Author:</label><input type="text" id='author' required value={blog.author} onChange={({ target }) => { setBlog({ ...blog, author: target.value }) }} /><br />
        <label htmlFor='url'>URL:</label> <input type="text" id='url' required value={blog.url} onChange={({ target }) => { setBlog({ ...blog, url: target.value }) }} /><br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm