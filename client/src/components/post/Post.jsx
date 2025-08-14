import React  , {useEffect , useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getPostById , addComment , deleteComment } from '../../features/post/postSlice'
import moment from 'moment'

const Post = () => {


  const { post, loading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const id = window.location.pathname.split('/')[2];

  const  [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getPostById( id ));
  }, [dispatch , id]);

  

  function handleCommentSubmit(e) {
    e.preventDefault();
    console.log("submit comment")
    dispatch(addComment({ postId: post._id, formData: { text: commentText } }));
    setCommentText('');
  }

  function handleDeleteComment(commentId) {
    dispatch(deleteComment({ postId: post._id, commentId }));
  }

  if (loading || !post || !post.comments)  {
    return <Spinner />;
  }
 
  return (
    <>
    <Link to="/all-posts" className="btn">Back To All Posts</Link>
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on {moment(post.createdAt).fromNow()}</p>
      </div>
    </div>

    <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={handleCommentSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit"  />
        </form>
    </div>

    <div className="post-comments">
      <h4>Comments</h4>

      {post.comments?.length === 0 && <p>No comments yet</p>}
      {post.comments?.map((comment) => (
        <div key={comment._id} className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${comment.user}`}>
              <img className="round-img" src={comment.avatar} alt="" />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{comment.text}</p>
            <p className="post-date">Posted on {moment(comment.createdAt).fromNow()}</p>
            {comment.user === user._id && (
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            )}
            
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Post
