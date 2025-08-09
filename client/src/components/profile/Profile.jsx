import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../features/profile/profileSlice'
import { useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import { getGithubRepos } from '../../features/profile/profileSlice'

const Profile = () => {


  const dispatch = useDispatch();
  const profileId = window.location.pathname.split('/')[2];

 useEffect(() => {
    console.log('Fetching profile by ID:', profileId);  
   dispatch(getProfileById( profileId ));
 }, []);

 const { profile, loading , repos }  = useSelector((state) => state.profile);

 useEffect(() => {
    console.log(profile);
    if (profile.githubusername) {
      dispatch(getGithubRepos(profile.githubusername));
    }
 }, []);  

  return (
    <>
    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

    {loading ? <Spinner /> : ( 
      <div className="profile-grid my-1">
         
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt=""
          />

          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">{profile.status} at {profile.company}</p>
          <p>{profile.user.location}</p>
          <div className="icons my-1">
            {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
                </a>
            )}
            {profile.social?.twitter && (
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
                </a>
            )}
            {profile.social?.facebook && (
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
                </a>
            )}
            {profile.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
                </a>
            )}
            {profile.social?.youtube && (
                <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
                </a>
            )}
            {profile.social?.instagram && (
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
                </a>
            )}
           </div>


        </div>

        
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>
            {profile.bio}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {
                profile.skills.map((skill, index) => (
                    <div className="p-1" key={index}><i className="fa fa-check"></i> {skill}</div>
                ))
            }
          </div>
        </div>

        
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <div>
            {
                profile.experience.map((exp, index) => (
                    <div key={index}>
                        <h3 className="text-dark">{exp.company}</h3>
                        <p>{moment(exp.from).format('MMM YYYY')} - {exp.to ? moment(exp.to).format('MMM YYYY') : 'Current'}</p>
                        <p><strong>Position: </strong>{exp.title}</p>
                        <p>
                            <strong>Description: </strong>{exp.description}
                        </p>
                    </div>
                ))
            }

          </div>
            
        </div>

        
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          <div>
            {
                profile.education.map((edu, index) => (
                    <div key={index}>
                        <h3 className="text-dark">{edu.school}</h3>
                        <p>{moment(edu.from).format('MMM YYYY')} - {edu.to ? moment(edu.to).format('MMM YYYY') : 'Current'}</p>
                        <p><strong>Degree: </strong>{edu.degree}</p>
                        <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                        <p>
                            <strong>Description: </strong>{edu.description}
                        </p>
                    </div>
                ))
            }
          </div>
        </div>

        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            {   profile.githubusername && repos.length > 0 &&(
                repos.map(repo => (
                    <div key={repo.id}>
                        <h4><a href={repo.html_url} target="_blank"
                            rel="noopener noreferrer">{repo.name}</a></h4>
                        <p>
                            {repo.description}
                        </p>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                <li className="badge badge-light">Forks: {repo.forks_count}</li>
                            </ul>
                        </div>
                    </div>
                )))
            }

          </div>
        </div>
      </div>

    )}
    </>
  )
};



export default Profile
