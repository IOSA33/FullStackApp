import { useRef } from 'react'
import { Link } from 'react-router-dom'

import Togglable from "./Togglable"
import CreateForm from "./CreateForm"
import blogService from '../services/blogs'

const Blogs = ({errorMessage, showErrorMessage, user, blogs, setErrorMessage, setBlogs}) => {

    const blogFormRef = useRef()

    const handleSubmitBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            console.log(response)
            setBlogs(blogs.concat(response))
            setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
        } catch {
            setErrorMessage('Missed some inputs')
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>blogs</h1>

            {user && (
                <div>
                {errorMessage && showErrorMessage()}

                <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
                    <CreateForm createBlog={handleSubmitBlog} />
                </Togglable>

 
                </div>
            )}

            <ul>
            { [...blogs].sort((a,b) => b.likes - a.likes).map(blog => (
                <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </li>
                ))
            }
            </ul>
            
        </div>
    )
}

export default Blogs