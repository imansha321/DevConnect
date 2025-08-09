// src/features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setTimedAlert } from '../alert/alertSlice';


// Initial state
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};


// Thunks

// Get current profile
export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/profile/me');
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

//get all profiles
export const getAllProfiles = createAsyncThunk(
  'profile/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/profile');
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

//get profile by user id
export const getProfileById = createAsyncThunk(
  'profile/getById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

//get github repos
export const getGithubRepos = createAsyncThunk(
  'profile/getGithubRepos',
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      console.log('Fetched GitHub repos:', res.data);
      return res.data;

    } catch (err) {
      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

// Create or update profile
export const createProfile = createAsyncThunk(
  'profile/createOrUpdate',
  async ({ formData, navigate, edit }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.post('/api/profile', formData, config);
      dispatch(setTimedAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) navigate('/dashboard');

      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      }

      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

// Clear profile (not async)
export const clearProfile = createAsyncThunk('profile/clear', async () => {
   console.log('Profile cleared!');
  return;
});


// Add experience
export const addExperience = createAsyncThunk(
  'profile/addExperience',
  async ({ formData, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.put('/api/profile/experience', formData, config);

      dispatch(setTimedAlert('Experience Added', 'success'));
      navigate('/dashboard');

      return res.data; // Updated profile from backend
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setTimedAlert(error.msg, 'danger'))
        );
      }
      return rejectWithValue({
        msg: err.response?.statusText || 'Server Error',
        status: err.response?.status || 500,
      });
    }
  }
);

//Add education
export const addEducation = createAsyncThunk(
  'profile/addEducation',
  async ({formData, navigate}, {dispatch, rejectWithValue}) => {
    try {
      const config ={
        headers: { 'Content-Type': 'application/json' },
      }
      const res = await axios.put('/api/profile/education',formData, config);
      dispatch(setTimedAlert('Education Added', 'success'));
      navigate('/dashboard');
      return res.data; // Updated profile from backend
    } catch (error) {
      const errors = error.response?.data?.errors;
      errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
)

export const deleteEducation = createAsyncThunk(
  'profile/deleteEducation',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch(setTimedAlert('Education Removed', 'success'));
      return res.data;
    } catch (error) {
      const errors = error.response?.data?.errors;
      errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
)

//Delete experience
export const deleteExperience = createAsyncThunk(
  'profile/deleteExperience',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch(setTimedAlert('Experience Removed', 'success'));
      return res.data; 
    } catch (error) {
      const errors = error.response?.data?.errors;
      errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
)

//delete account
export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount',
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete('/api/profile');
      dispatch(setTimedAlert('Account Deleted', 'success'));
      console.log(res.data);
      localStorage.removeItem('token');
      navigate('/');
      return res.data;
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      }
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);


// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Current Profile
      .addCase(getCurrentProfile.pending, (state) => {
        state.profile = null;
        state.loading = true;
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.profile = null;
        state.loading = false;
      })

      // Create / Update Profile
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.profile = null;
        state.loading = false;
      })

      // Clear profile
      .addCase(clearProfile.fulfilled, (state) => {
        state.profile = null;
        state.repos = [];
        state.loading = false;
      })
      .addCase(clearProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add experience 
      .addCase(addExperience.fulfilled, (state, action) => {
        state.profile = action.payload; // update with new data
        state.loading = false;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add education
      .addCase(addEducation.fulfilled, (state , action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //delete experience
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //delete education
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //delete account
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.profile = null;
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //get all profiles
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //get profile by user id
      .addCase(getProfileById.pending, (state) => {
        state.profile = null;
        state.loading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //get github repos
      .addCase(getGithubRepos.pending, (state) => {
        state.repos = [];
        state.loading = true;

      })
      .addCase(getGithubRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
        state.loading = false;
      })
      .addCase(getGithubRepos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

  },
});




export default profileSlice.reducer;
