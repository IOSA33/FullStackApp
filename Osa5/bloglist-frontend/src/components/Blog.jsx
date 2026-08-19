import { useParams, useNavigate } from 'react-router-dom'
import Togglable from './Togglable'
import { jwtDecode } from 'jwt-decode'
import { Box, Button } from '@mui/material'

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
    <Box sx={{widows: 10, border:'1px solid', marginTop: 2 , p: 2}}>
      <div className='blog'>
        
        <h1>{blog.title}</h1>
          <h3>by {blog.author}</h3>
          <a href={blog.url}>{blog.url}</a>
          <br></br>
          <br></br>
          Added by {blog.user?.name}
          <br></br>
          <br></br>
          <b>{blog.likes} likes </b> 
          <Button variant="outlined" style={{...remove_style, marginLeft:10}} onClick={() => handleUpdatedLikes()}>like</Button>
          <Button variant="outlined" color="error" style={{...remove_button(), marginLeft:10}} onClick={() => handleDeleteBlog()}>remove</Button>
      </div>
    </Box>
  )
}

export default Blog