import React , { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addEducation } from '../../features/profile/profileSlice';

const AddEducation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData , setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const {school , degree , fieldofstudy , from , to , current , description} = formData;

  function updateDatabase(e) {
    e.preventDefault();
    dispatch(addEducation({ formData, navigate }));
  }

  function updateFormData(e) {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  }

  return (
    <>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={updateDatabase}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={updateFormData}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={updateFormData}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={(e) => setFormData({ ...formData, fieldofstudy: e.target.value })} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={updateFormData} required />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" checked={current} onChange={updateFormData} /> Current School or Bootcamp
          </p>
        </div>
        {!current && (
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={updateFormData} />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={updateFormData}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      
    </>
  )
}

export default AddEducation
