import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import Spinner from '../layout/Spinner'
import { fetchPosts } from '../../features/post/postSlice'


const AllPosts = () => {
  const { posts, loading } = useSelector((state) => state.post)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchPosts()));
  }, [dispatch]);


  if (loading || !posts) {
    return <Spinner />
  }

  return (
    <div>
      { [...posts] 
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((post) => (
        <div key={post._id} className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img className="round-img" src={post.user.avatar} alt="" />
              <h4>{post.user.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
            <p className="post-date">Posted on {moment(post.updatedAt).fromNow()}</p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>{post.likes.length}</span>
            </button>
            <Link to={`/post/${post._id}`} class="btn btn-primary">
              Discussion <span class='comment-count'>{post.comments.length}</span>
            </Link>
          </div>
          

        </div>
      ))}



      <div class="posts">
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
             <p class="post-date">
                Posted on 04/16/2019
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" class="btn btn-primary">
              Discussion <span class='comment-count'>2</span>
            </a>
            <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
          </div>
        </div>

        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p class="post-date">
                Posted on 04/16/2019
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" class="btn btn-primary">
              Discussion <span class='comment-count'>3</span>
            </a>
            <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPosts
