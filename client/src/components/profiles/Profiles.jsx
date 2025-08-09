import React , {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'

import { getAllProfiles } from '../../features/profile/profileSlice'
import { Link } from 'react-router-dom'


const Profiles = () => {
  const { profiles, loading } = useSelector((state) => state.profile)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <div>
    <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {loading ? (
          <Spinner />
        ) : (
          profiles.map((profile) => (
            <div className="profile bg-light" key={profile._id}>
              <img
                className="round-img"
                src={profile.user.avatar}
                alt=""
              />
              <div>
                <h2>{profile.user.name}</h2>
                <p>{profile.status} at {profile.company}</p>
                <p>{profile.location}</p>
                <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
              </div>

              <ul>
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <li className="text-primary" key={index}>
                    <i className="fas fa-check"></i> {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default Profiles
