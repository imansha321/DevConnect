import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById, getGithubRepos } from '../../features/profile/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const Profile = () => {
  const dispatch = useDispatch();
  const profileId = window.location.pathname.split('/')[2];

  const { profileById, loading, repos } = useSelector((state) => state.profile);

  // Fetch profile data
  useEffect(() => {
    if (profileId) {
      dispatch(getProfileById(profileId));
    }
  }, [dispatch, profileId]);

  // Fetch GitHub repos when profile is loaded
  useEffect(() => {
    if (profileById?.githubusername) {
      dispatch(getGithubRepos(profileById.githubusername));
    }
  }, [dispatch, profileById]);

  // Loading state
  if (loading || !profileById) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        {/* Top */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profileById?.user?.avatar}
            alt={profileById?.user?.name || 'User Avatar'}
          />

          <h1 className="large">{profileById?.user?.name}</h1>
          <p className="lead">
            {profileById?.status} {profileById?.company && `at ${profileById.company}`}
          </p>
          <p>{profileById?.user?.location}</p>
          <div className="icons my-1">
            {profileById.website && (
              <a href={profileById.website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileById.social?.twitter && (
              <a href={profileById.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {profileById.social?.facebook && (
              <a href={profileById.social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {profileById.social?.linkedin && (
              <a href={profileById.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {profileById.social?.youtube && (
              <a href={profileById.social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {profileById.social?.instagram && (
              <a href={profileById.social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>

        {/* About */}
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profileById?.user?.name}'s Bio</h2>
          <p>{profileById?.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profileById?.skills?.map((skill, index) => (
              <div className="p-1" key={index}>
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <div>
            {profileById?.experience?.map((exp, index) => (
              <div key={index}>
                <h3 className="text-dark">{exp.company}</h3>
                <p>
                  {moment(exp.from).format('MMM YYYY')} -{' '}
                  {exp.to ? moment(exp.to).format('MMM YYYY') : 'Current'}
                </p>
                <p>
                  <strong>Position: </strong>
                  {exp.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          <div>
            {profileById?.education?.map((edu, index) => (
              <div key={index}>
                <h3 className="text-dark">{edu.school}</h3>
                <p>
                  {moment(edu.from).format('MMM YYYY')} -{' '}
                  {edu.to ? moment(edu.to).format('MMM YYYY') : 'Current'}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description: </strong>
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repos */}
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>

          {profileById?.githubusername && repos?.length > 0 && (
            <table className="table bg-white my-1">
              <thead>
                <tr>
                  <th>Repository</th>
                  <th>Description</th>
                  <th>Stars</th>
                  <th>Watchers</th>
                  <th>Forks</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.id}>
                    <td>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </td>
                    <td>{repo.description}</td>
                    <td>{repo.stargazers_count}</td>
                    <td>{repo.watchers_count}</td>
                    <td>{repo.forks_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
