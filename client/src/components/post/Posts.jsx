import React , {useState , useEffect}from 'react'
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { createPost , getPostsByUserId} from '../../features/post/postSlice';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import { deletePost } from '../../features/post/postSlice';


const Posts = () => {

   const [postText, setPostText] = useState('');

   const dispatch = useDispatch();

   const { postsByUserId, loading} = useSelector((state) => state.post);
   const userId = useSelector((state) => state.auth.user._id);

   function makePost(e) {
    e.preventDefault();
    if (postText.trim() === '') {
      return;
    }

    // Dispatch the createPost action with the post data
    dispatch(createPost({ formData: { text: postText } }))
    .then(() => {
      dispatch(getPostsByUserId(userId));
    });
    // Clear the input field
    setPostText('');
  }
  useEffect(() => {
    dispatch(getPostsByUserId(userId));
  }, [dispatch]);

  function handleDelete(postId){
    dispatch(deletePost(postId))
    .then(() => {
      dispatch(getPostsByUserId(userId));
    });
  }


  if (loading || !postsByUserId) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={makePost}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {[...postsByUserId]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((post) => (
          <div className="post bg-white p-1 my-1" key={post._id}>
            <div>
              <Link to={`/profile/${post.user._id}`}>
                <img
                  className="round-img"
                  src={post.user.avatar}
                  alt=""
                />
                <h4>{post.user.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on {moment(post.updatedAt).fromNow()}
              </p>
              <button type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>
                <span>{post.likes.length}</span>
              </button>
              <button type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-primary">
                Discussion{" "}
                <span className="comment-count">{post.comments.length}</span>
              </Link>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(post._id)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
      ))}

      </div>
    
    </>
  )
}

export default Posts
