import React , {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom';
import { addExperience } from '../../features/profile/profileSlice';
import { useDispatch } from 'react-redux';
const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '', 
    from: '',
    to: '',
    current: false,
    description: ''
  });

  function updateFormData(e) {
    const { name, value, checked, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  }


  async function updateDatabase(e) {
    e.preventDefault();
    dispatch(addExperience({ formData, navigate }));
  }

  const { title, company, location, from, to, current, description } = formData;

  return (
    <>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form"  onSubmit={updateDatabase}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={updateFormData} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={updateFormData} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={updateFormData} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={updateFormData} required/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current}  onChange={updateFormData} /> Current Job</p>
        </div>
        { !current && (
          <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={updateFormData} />
        </div>) }
        
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={updateFormData}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1"  />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </>
  )
}

export default AddExperience
