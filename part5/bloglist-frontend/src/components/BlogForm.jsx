import { useState } from "react"
import blogsService from "../services/blogs"

const BlogForm = ({ setMustUpdateBlogs, mustUpdateBlogs }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogsService.create(blog)
      setBlog({ title: '', author: '', url: '' })

      setMustUpdateBlogs(!mustUpdateBlogs)
    } catch (error) {
      console.log("Could not create the blog", error);
    }
  }

  return (
    <form onSubmit={handleCreate} >
      <div>title: <input type="text" required value={blog.title} onChange={({ target }) => { setBlog({ ...blog, title: target.value }) }} /></div>
      <div>author: <input type="text" required value={blog.author} onChange={({ target }) => { setBlog({ ...blog, author: target.value }) }} /></div>
      <div>url: <input type="text" required value={blog.url} onChange={({ target }) => { setBlog({ ...blog, url: target.value }) }} /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm