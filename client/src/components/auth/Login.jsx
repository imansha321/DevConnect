import React , { useState  } from 'react'
import { Link , Navigate} from 'react-router-dom'

import { login } from '../../features/auth/authSlice';

import { useSelector, useDispatch } from 'react-redux';

import { getCurrentProfile } from '../../features/profile/profileSlice';


const Login = () => {

  const dispatch = useDispatch();

  const {isAuthenticated } = useSelector(state => state.auth);


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>{ console.log(e.target.value); setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(email, password);
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
    dispatch(getCurrentProfile());
    window.location.reload();
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email} onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}

export default Login
