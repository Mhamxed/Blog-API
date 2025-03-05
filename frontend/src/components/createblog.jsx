import '../app.css'
import { UserContext } from '../App'
import { useContext, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateBlog() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { token, setRefresh } = useContext(UserContext)
    const navigate = useNavigate()

    const handleCreateBlog = async (e) => {
        e.preventDefault(); // Fix casing
    
        try {
            const res = await Axios.post(
                "http://localhost:8000/api/articles/create",
                { title, content }, // Request body
                {
                    headers: { Authorization: `Bearer ${token}` }, // Headers
                    withCredentials: true, // Ensures cookies (if needed)
                }
            );
    
            if (res.data.message) {
                setRefresh(prev => !prev)
                alert(res.data.message);
                navigate("/"); // Redirect after success
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };
      

    return (
        <>
            <form onSubmit={handleCreateBlog}>
                <h2>Create blog</h2>
                <div className="input">
                    <input type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'/>
                </div>
                <div className="input">
                    <textarea 
                    onChange={(e) => setContent(e.target.value)}
                    id="blog-content" 
                    cols={7}
                    rows={7}
                    placeholder="Hello, world!">
                    </textarea>
                    <p className="error"></p>
                </div>
                <button type="submit">Post</button>
            </form>
        </>
    )
}