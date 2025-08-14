import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/alert/alertSlice.js'; 
import authReducer from './features/auth/authSlice.js'; 
import profileReducer from './features/profile/profileSlice.js'; 
import postReducer from './features/post/postSlice.js';

const store = configureStore({

   reducer: {
    alert: alertReducer,
    post: postReducer,
    auth: authReducer,
    profile: profileReducer,
  },
  devTools: true // Optional, true by default
});

export default store;
