import React from 'react'
import moment from 'moment';
import { useSelector , useDispatch } from 'react-redux';
import { deleteEducation } from '../../features/profile/profileSlice';

 
const Education = () => {

  const dispatch = useDispatch();
  const EMPTY_ARRAY = [];

  const education = useSelector(state => state.profile.profile?.education || EMPTY_ARRAY);

  const handleDelete = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <>

    <h2 className="my-2">Education Credentials</h2>
    {!education.length ? (
      <p>No education credentials found.</p>
    ) : (
      <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {education.map(edu => (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td className="hide-sm">
                  {moment(edu.from).format('MM/DD/YYYY')} - {edu.to ? moment(edu.to).format('MM/DD/YYYY') : 'Present'}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(edu._id)}>
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

export default Education
