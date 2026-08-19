import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

const Logout = ({style, user, setUser}) => {
    const navigate = useNavigate()
    
    const logoutHandle = () => {
        window.localStorage.clear()
        setUser(null)
        navigate('/')
        return
    }

    return (
        <Button color="inherit" style={style} onClick={logoutHandle}>LOGOUT</Button>
    )
}

export default Logout