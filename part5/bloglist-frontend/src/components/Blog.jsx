import { useState } from "react"

const Blog = ({ blog }) => {
  const [showButton, setShowButton] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDescription = () => {
    return (
      <>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
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