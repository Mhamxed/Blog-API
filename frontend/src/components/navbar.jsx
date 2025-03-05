import '../app.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import { useContext } from 'react';


export default function NavBar({ user }) {
    const navigate = useNavigate();
    const { setUser, setToken, token } = useContext(UserContext)
    const handleLogout = async () => {
        try {
            const res = await axios.post("http://localhost:8000/logout", 
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true 
                }
            );
            setUser(undefined)
            setToken(undefined)
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            alert(res.data.message)
            navigate("/login"); // Redirect user to login page
        } catch (err) {
            console.error("Logout failed", err);
        }
    };
    
    return(
        <div className='navbar'>
            { !user && <>
                    <div className="logo">
                        <Link to={"/"} className='link logo'>
                            <FontAwesomeIcon icon={faBlog} />
                            <p><strong>Blog</strong></p>
                        </Link>
                    </div>
                    <div className='buttons'>
                        <button><Link to={"/login"} className='link'>Login</Link></button>
                        <button><Link to={"/signup"} className='link'>Signup</Link></button>
                    </div>
                </>  }
            { user && <>
                    <div className="logo">
                        <Link to={"/"} className='link logo'>
                            <FontAwesomeIcon icon={faBlog} />
                            <p><strong>Blog</strong></p>
                        </Link>
                    </div>
                    <div className='buttons'>
                        <button><Link to="/Articles/create" className='link'>Create blog</Link></button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </> }
        </div>
    )
}   