import React, { Fragment , useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Alert from './features/alert/Alert.js';

import Dashboard from './components/dashboard/Dashboard.js';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile.js';
import EditProfile from './components/profile-forms/EditProfile.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Redux 
import { Provider } from 'react-redux';
import store  from './store.js';

import { loadUser } from './features/auth/authSlice';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />

        <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/register"
          element={
            <section className="container">
              <Alert />
              <Register />
            </section>
          }
        />
        <Route
          path="/login"
          element={
            <section className="container">
              <Alert />
              <Login />
            </section>
          }
        />
        <Route
          path="/dashboard"
          element={
            <section className="container">
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/create-profile"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <CreateProfile />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <EditProfile />
              </PrivateRoute>
            </section>
          }
        />
        </Routes>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;
