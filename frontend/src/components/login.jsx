import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../app.css'
import { UserContext } from '../App'
import Axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const { setUser, setToken } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post('http://localhost:8000/login/', {username, password}, { withCredentials: true })
            const data = res.data
            data.usernameErr ? setUsernameErr("*" + data.usernameErr) : setUsernameErr("")
            data.passwordErr ? setPasswordErr("*" + data.passwordErr) : setPasswordErr("")
            if (data.message) {
                setUser(data.user)
                setToken(data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', JSON.stringify(data.token))
                alert(data.message)
                return navigate("/articles/create")
            } 
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Welcome back</h2>
                <div className="input">
                    <input 
                    type="text" 
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}/>
                    <p className="error">{usernameErr}</p>
                </div>
                <div className="input">
                    <input 
                    type="password" 
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                    <p className="error">{passwordErr}</p>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}