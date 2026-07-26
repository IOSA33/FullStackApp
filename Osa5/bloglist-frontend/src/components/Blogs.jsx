import { useRef } from 'react'

import Togglable from "./Togglable"
import CreateForm from "./CreateForm"
import Blog from "./Blog"
import blogService from '../services/blogs'

const Blogs = ({errorMessage, showErrorMessage, user, blogs, setErrorMessage, setBlogs}) => {

    const blogFormRef = useRef()

    const handleUpdateBlog = async (id, updatedBlogObject) => {
        try {
            const response = await blogService.update(id, updatedBlogObject)
            setBlogs(blogs.map(b => b.id === id ? response : b))
        } catch {
            setErrorMessage('Missed some inputs')
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
        }
    }

    const handleDeleteBlog = async (id) => {
        try {
            await blogService.deleteBlog(id)
            setBlogs(blogs.filter(b => b.id !== id))
        } catch {
            setErrorMessage('Missed some inputs')
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
        }
    }

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

            {
                [...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} updateLikes={handleUpdateBlog} deleteBlog={handleDeleteBlog}/>
                )
            }
        </div>
    )
}

export default Blogs