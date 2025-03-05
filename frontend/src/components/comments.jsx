import '../app.css'
import Comment from './comment'

export default function Comments({comments, user}) {
    return (
        <div className='comments'>
            {comments && <>
                { comments.map(comment => {
                    return <Comment comment={comment} user={user} key={comment.id}/>
                })}
            </>  }
        </div>
    )
}