import { useContext, useEffect, useState } from 'react'
import '../app.css'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../App'

export default function NewComment() {
    const [comment, setComment] = useState("")
    const { id } = useParams()
    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/comments/${id}/`, 
            { 
                headers: { Authorization: `Bearer ${token}` },  
                withCredentials: true })
            .then((res) => {
                setComment(res.data.content);
            })
            .catch(() => setComment(null));
    }, [id, token]);

    const handleEdit = async (e) => {
        e.preventDefault(); // Prevent form refresh
        try {
            const res = await Axios.put(`http://localhost:8000/api/comments/${id}/edit`, 
                { content: comment },
                { 
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true})
            alert(res.data.message)
            navigate("/")
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <>
            <form onSubmit={handleEdit}>
                <h2>New comment</h2>
                <div className="input">
                    <input type="text" 
                    name='comment' 
                    placeholder='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="input">
                    <p className="error"></p>
                </div>
                <button type="submit">Update</button>
            </form>
        </>
    )
}