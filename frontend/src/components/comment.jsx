import '../app.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App'

export default function Comment({comment, user}) {
    const { token, setRefresh } = useContext(UserContext)
    const handleDelete = async () => {
        try {
          const res = await axios.delete(`http://localhost:8000/api/comments/${comment.id}/delete`, 
            {  
                headers: { Authorization: `Bearer ${token}` }, 
                withCredentials: true});
          alert(res.data.message);
          setRefresh(prev => !prev)
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      };
    return (
        <div className='comment'>
            <div className="username-content">
                <p><strong>@{ comment.user.username }</strong></p>
                <p>{ comment.content }</p>
            </div>
            {
                user && user.id == comment.user.id && 
                <>
                    <div className="buttons">
                        <button onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button>
                            <Link className='link' to={`/comments/${comment.id}/edit`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                        </button>
                    </div>
                </>
            }
        </div>
    )
}