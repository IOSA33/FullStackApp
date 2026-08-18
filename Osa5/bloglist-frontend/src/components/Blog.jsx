import { useParams, useNavigate } from 'react-router-dom'
import Togglable from './Togglable'
import { jwtDecode } from 'jwt-decode'

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

  const remove_button = () => {
    if (user) {
      const decodedToken = jwtDecode(user?.token)
      if(blog.user?.id === decodedToken.id) {
        return {display: ''}
      } else {
        return {display: 'none'}
      }
    }
    return {display: 'none'}
  }

  return (
    <div className='blog'>
      
      <h1>{blog.title} by {blog.author}</h1>

      <div>
        {blog.url}
        <br></br>
        likes {blog.likes} <button style={remove_style} onClick={() => handleUpdatedLikes()}>like</button>
        <br></br>
        {blog.user?.name}
        <br></br>
        <button style={remove_button()} onClick={() => handleDeleteBlog()}>remove</button>
      </div>

    </div>
  )
}

export default Blog