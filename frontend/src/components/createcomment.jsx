import { useNavigate, useParams } from 'react-router-dom'
import '../app.css'
import Axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from '../App'
 
export default function NewComment() {
    const { id } = useParams()
    const [comment, setComment] = useState("")
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const handleCreateComment = async (e) => {
        e.preventDefault(); // Fix casing
    
        try {
            const res = await Axios.post(`http://localhost:8000/api/artciles/${id}/comments/create`,
                {comment }, // Request body
                {
                    headers: { Authorization: `Bearer ${token}` }, // Headers
                    withCredentials: true, // Ensures cookies (if needed)
                }
            );
    
            if (res.data.message) {
                alert(res.data.message);
                navigate("/"); // Redirect after success
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    }
    return (
        <>
            <form onSubmit={handleCreateComment}>
                <h2>New comment</h2>
                <div className="input">
                    <input type="text" 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder='comment'/>
                </div>
                <div className="input">
                    <p className="error"></p>
                </div>
                <button type="submit">Post</button>
            </form>
        </>
    )
}