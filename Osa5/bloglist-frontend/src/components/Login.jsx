import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const Login = ({user, errorMessage, showErrorMessage, setUser, setUsername, setPassword, setErrorMessage, username, password}) => {
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
 
    const loginForm = () => (
        <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>

        <div>
            <label>
            <label style={{display:'none'}}>username</label>
            <TextField
                variant="standard"
                label="username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </label>
        </div>
        <div>
            <label>
            <label style={{display:'none'}}>password</label>
            <TextField
                variant="standard"
                label="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </label>
        </div>
        <Button type="submit" variant='contained' style={{ marginTop: 10 }}>login</Button>
        </form>
    )

    return (
        <div>
            {!user && (
              <div>
                {errorMessage && showErrorMessage()}
                {loginForm()}
              </div>
            )}
        </div>
    )
}

export default Login