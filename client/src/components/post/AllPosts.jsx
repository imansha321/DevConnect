import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import Spinner from '../layout/Spinner'
import { fetchPosts , likePost , unlikePost } from '../../features/post/postSlice'



const AllPosts = () => {
  const { posts, loading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchPosts()));
  }, [dispatch ]);

  function handleLike(post) {
    console.log('likes:', post.likes);
    console.log('User ID:', user._id);
    if (post.likes.some(like => like.user === user._id)) {
      console.log('User already liked the post');
      dispatch(unlikePost(post._id));
    } else {
      dispatch(likePost(post._id));
    }
  }

  if (loading || !posts) {
    return <Spinner />
  }

  return (
    <div>
      { [...posts] 
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((post) => (
        <div key={post._id} className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img className="round-img" src={post.avatar} alt="" />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
            <p className="post-date">Posted on {moment(post.createdAt).fromNow()}</p>
            <button type="button" className="btn btn-light" onClick={() => handleLike(post)}>
              <i className="fas fa-thumbs-up" style={{ color: post.likes.some(like => like.user === user._id) ? 'blue' : 'black' }}></i>
              <span>{post.likes.length}</span>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{post.comments.length}</span>
            </Link>
          </div>
          

        </div>
      ))}
    </div>
  )
}

export default AllPosts
