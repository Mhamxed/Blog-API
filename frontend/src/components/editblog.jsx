import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from '../App'

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { token, setRefresh } = useContext(UserContext)

    // Fetch blog data
    useEffect(() => {
        axios.get(`http://localhost:8000/api/articles/${id}/`,
            {  headers: { Authorization: `Bearer ${token}` }}, 
            { withCredentials: true })
            .then((res) => {
                setBlog(res.data);
                setTitle(res.data.title); // ✅ Update state AFTER data is fetched
                setContent(res.data.content);
            })
            .catch(() => setBlog(null));
    }, [id, token]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const res = await axios.put(`http://localhost:8000/api/articles/${id}/edit`,
            { title, content }, 
            { headers: { Authorization: `Bearer ${token}` }, withCredentials: true } // Move `withCredentials` to this config object
            );
            setRefresh(prev => !prev)
            alert(res.data.message);
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {blog && (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Blog</h2>
                    <div className="input">
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <textarea
                            name="content"
                            id="blog-content"
                            cols={7}
                            rows={7}
                            placeholder="Hello, world!"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <p className="error"></p>
                    </div>
                    <button type="submit">Update</button>
                </form>
            )}
        </>
    );
}
