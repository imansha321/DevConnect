import React from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExperience } from '../../features/profile/profileSlice';

const Experiences = () => {

  const dispatch = useDispatch();

  const EMPTY_ARRAY = [];
  const experiences = useSelector(state => state.profile.profile?.experience || EMPTY_ARRAY);

  const handleDelete = (id) => {
    dispatch(deleteExperience(id));
  };

  return (
    <>

      <h2 className="my-2">Experience Credentials</h2>
      {!experiences.length ? (
        <p>No experience credentials found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences.map(exp => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                {moment(exp.from).format('MM-DD-YYYY')} - {exp.to ? moment(exp.to).format('MM-DD-YYYY') : 'Now'}
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(exp._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </>
  )
}

export default Experiences
