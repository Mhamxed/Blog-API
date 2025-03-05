import { useState, useEffect, useContext } from 'react';
import '../app.css'
import Comments from './comments'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'

export default function Blog({user}) {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [comments, setComments] = useState([])
    const { token, refresh } = useContext(UserContext)

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/articles/${id}`, 
            {  headers: { Authorization: `Bearer ${token}` }}, 
            { withCredentials: true })
        .then((res) => setBlog(res.data))
        .catch(() => setBlog([]));
    }, [id, token])

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/artciles/${id}/comments/`, 
            {  headers: { Authorization: `Bearer ${token}` }}, 
            { withCredentials: true })
        .then((res) => setComments(res.data))
        .catch(() => setComments([]));
    }, [id, token, refresh])

    return (
        <>
            {blog && 
                <div className='blog'>
                    <h1>{ blog.title }</h1>
                    <p className='content'>{ blog.content }</p>
                    { comments.length > 0 && 
                    <>
                        <h2>Comments</h2>
                        <Comments comments={comments} user={user}/>
                    </> }
                    <button className='comment-button'>
                        <Link className='link' to={`/blogs/${id}/comments/new`}>Comment</Link>
                    </button>
                </div> 
            }
        </>
    )
}