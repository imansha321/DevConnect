import React, { Fragment , useEffect} from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './features/alert/Alert';

import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Experiences from './components/dashboard/Experiences';
import Education from './components/dashboard/Education';
import DeleteAccount from './components/dashboard/DeleteAccount';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Posts from './components/post/Posts';
import AllPosts from './components/post/AllPosts';
import Post from './components/post/Post';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Redux 
import { Provider } from 'react-redux';
import store  from './store';

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
                <Alert/>
                <Experiences />
                <Education />
                <DeleteAccount />
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
        <Route
          path="/add-experience"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <AddExperience />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/add-education"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <AddEducation />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/profiles"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <Profiles />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <Profile />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/posts"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <Posts />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/all-posts"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <AllPosts />
              </PrivateRoute>
            </section>
          }
        />
        <Route
          path="/post/:id"
          element={
            <section className="container">
              <PrivateRoute>
                <Alert />
                <Post />
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
