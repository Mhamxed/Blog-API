import '../app.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App'

export default function BlogCard({ blog, user }) {
    const { token, setRefresh } = useContext(UserContext)

    const handleDelete = async () => {
        try {
          const res = await axios.delete(`http://localhost:8000/api/articles/${blog.id}/delete`, 
            {  
                headers: { Authorization: `Bearer ${token}` }, 
                withCredentials: true});
            setRefresh(prev => !prev)
            alert(res.data.message);
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      };

    return (
        <>
            <div className="blog-card">
                <div className='space'>
                    <h2>{ blog.title }</h2>
                    <p>{ blog.content.length < 50 ? blog.content : blog.content.slice(0, 50) + "..."  }</p>
                </div>
                <div className="buttons">
                    <button><Link className='link' to={`/blogs/${blog.id}`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Link></button> 
                    {
                        user && user.id == blog.user.id && 
                        <>  
                            <button onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button>
                                <Link className='link' to={`/blogs/${blog.id}/edit`}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Link>
                            </button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}