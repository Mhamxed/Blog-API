import { useState } from 'react'
import '../app.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fullnameErr, setFullnameErr] = useState("")
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post('http://localhost:8000/signup/', {fullname, username, password})
            const data = res.data
            data.fullnameErr ? setFullnameErr("*" + data.fullnameErr) : setFullnameErr("")
            data.usernameErr ? setUsernameErr("*" + data.usernameErr) : setUsernameErr("")
            data.passwordErr ? setPasswordErr("*" + data.passwordErr) : setPasswordErr("")
            if (data.message) {
                alert(data.message)
                return navigate("/login")
            }
        } catch(err) {
            console.error(err)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <div className="input">
                    <input type="text" 
                    name="fullname" 
                    placeholder="first & last name" 
                    onChange={(e) => setFullname(e.target.value)}/>
                    <p className="error">{fullnameErr}</p>
                </div>
                <div className="input">
                    <input type="text" 
                    name="username" 
                    placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <p className="error">{usernameErr}</p>
                </div>
                <div className="input">
                    <input type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                    <p className="error">{passwordErr}</p>
                </div>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}