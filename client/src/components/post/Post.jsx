import React  , {useEffect} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getPostById } from '../../features/post/postSlice'


const Post = () => {


  const { post, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(getPostById( id ));
  }, [dispatch]);

  if (loading || !post) {
    return <Spinner />;
  }

  return (
    <>
    <Link to="/all-posts" className="btn">Back To All Posts</Link>
     
     

      
    </>
  )
}

export default Post
