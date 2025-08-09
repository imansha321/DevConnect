import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../features/profile/profileSlice';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';


const Dashboard = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profile);
  
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  if (loading && profile === null) {
    return <Spinner/>;
  }

  return (
    <div>
      <h1 className='large text-primary'>Dashboard</h1>
      {profile ? (
        <div>
          <h2>Welcome {user && user.name}</h2>
          <p>{profile.bio || 'No bio yet'}</p>
          <DashboardAction />
        </div>
      ) : (
        <div>
          <h2>Welcome {user && user.name}</h2>
          <p>You have not yet set up a profile, please add some info.</p>
          <Link to='/create-profile' className='btn btn-primary'>Create Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
