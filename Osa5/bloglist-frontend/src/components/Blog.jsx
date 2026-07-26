import { useParams, useNavigate } from 'react-router-dom'
import Togglable from './Togglable'

const Blog = ({ user, blog, updateLikes, deleteBlog }) => {
  const id = useParams().id
  const navigate = useNavigate()

  if(!blog) {
    return null
  }

  const handleUpdatedLikes = () => {
    updateLikes(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    deleteBlog(blog.id)
    navigate('/')
  }

  const remove_style = {
    display: user ? '': 'none'
  }

  return (
    <div className='blog'>
      
      <h1>{blog.title} by {blog.author}</h1>

      <div>
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={() => handleUpdatedLikes()}>like</button>
        <br></br>
        {blog.user?.name}
        <br></br>
        <button style={remove_style} onClick={() => handleDeleteBlog()}>remove</button>
      </div>

    </div>
  )
}

export default Blog