import { useState } from "react"
import blogsService from "../services/blogs"

const Blog = ({ blog, setMustUpdateBlogs }) => {
  const [showButton, setShowButton] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = async (event) => {
    event.preventDefault()
    try {
      blog.likes++
      await blogsService.updateLikes(blog)

      setLikes(blog.likes)
    } catch (error) {
      console.log("Could not update blog", error);
    }
  }

  const blogDescription = () => {
    return (
      <>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={handleLikeButton}>like</button></p>
        <p>{blog.user.name}</p>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => { showButton === 'view' ? setShowButton('hide') : setShowButton('view') }}>{showButton}</button>
      {showButton === 'hide' && blogDescription()}
    </div>
  )
}

export default Blog