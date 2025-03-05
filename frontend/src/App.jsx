import './app.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar'
import Blogs from './components/blogs'
import CreateBlog from './components/createblog'
import NewComment from './components/createcomment'
import NotFound from './components/404'
import Login from './components/login'
import Signup from './components/sigup'
import Axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import Blog from './components/blog'
import EditBlog from './components/editblog'
import EditComment from './components/editcomment'

export const UserContext = createContext(undefined);

function App() {
  const [refresh, setRefresh] = useState(true)
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    // Load user from localStorage on initial render
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:8000/api/posts", 
      {  headers: { Authorization: `Bearer ${token}` }}, 
      { withCredentials: true })
    .then((res) => setBlogs(res.data))
    .catch(() => setBlogs([]));
  }, [token, refresh])
  
  return (
    <>
      <UserContext.Provider value={{user, setUser, token, refresh, setToken, setRefresh}}>
        <Router>
          <div className='container'>
            <NavBar user={user}/>
            <Routes>
              <Route path="/" element={<Blogs blogs={ blogs } user={user}/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/articles/create" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<Blog user={user}/>} />
              <Route path="/blogs/:id/comments/new" element={ <NewComment /> } />
              <Route path="/blogs/:id/edit" element={ <EditBlog />} />
              <Route path="/comments/:id/edit" element={ <EditComment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
