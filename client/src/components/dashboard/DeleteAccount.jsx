import React from 'react'
import { useDispatch  , useSelector} from 'react-redux';
import { deleteAccount } from '../../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) {
      return;
    }
    dispatch(deleteAccount({navigate}));
  };

  return (

    <div className="my-2">
      <button className="btn btn-danger" onClick={handleDelete}>
        <i className="fas fa-user"></i>
            Delete My Account
      </button>
    </div>
  )
}

export default DeleteAccount

