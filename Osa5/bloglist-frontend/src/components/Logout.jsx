import { useNavigate } from "react-router-dom"

const Logout = ({style, user, setUser}) => {
    const navigate = useNavigate()
    
    const logoutHandle = () => {
        window.localStorage.clear()
        setUser(null)
        navigate('/')
        return
    }

    return (
        <button style={style} onClick={logoutHandle}>logout</button>
    )
}

export default Logout