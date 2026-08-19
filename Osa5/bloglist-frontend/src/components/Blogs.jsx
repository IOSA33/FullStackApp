import { Link } from 'react-router-dom'

const Blogs = ({errorMessage, showErrorMessage, user, blogs, setErrorMessage, setBlogs}) => {
    return (
        <div>
            <h2>blogs</h2>

            {user && (
                <div>
                  {errorMessage && showErrorMessage()}
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