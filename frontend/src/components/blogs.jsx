import '../app.css'
import BlogCard from './blogcard'

export default function Blogs({ blogs, user }) {
    return (
        <>
                { blogs && <div className="blogs">
                    { blogs.map(blog => {
                        return <BlogCard blog={blog} user={user} key={blog.id}/>
                    })}
                    </div> }
                { !blogs && <>
                    <h1 className='center comments'>No blogs have been found</h1>
                </> }
        </>
    )
}