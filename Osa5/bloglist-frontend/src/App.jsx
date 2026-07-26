import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Logout from './components/Logout'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showErrorMessage = () => {
    return (
      <div>
        <b>
          {errorMessage}
        </b>
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const showWhenLoggedout = {display: user ? 'none': ''}
  const showWhenLoggedin = {display: user ? '': 'none'}

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} style={showWhenLoggedout} to='login'>login</Link>
        <Logout style={showWhenLoggedin} user={user} setUser={setUser}/>
      </div>

      <Routes>
        <Route path="/login" element={
          <Login user={user} errorMessage={errorMessage} showErrorMessage={showErrorMessage} setUser={setUser} setUsername={setUsername} setPassword={setPassword} setErrorMessage={setErrorMessage} username={username} password={password}/>
        }/>
        <Route path="/" element={
          <Blogs errorMessage={errorMessage} showErrorMessage={showErrorMessage} user={user} blogs={blogs} setErrorMessage={setErrorMessage} setBlogs={setBlogs}/>
        }/>
          
      </Routes>
    </Router>
  )
}

export default App