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
  return;
});

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Current Profile
      .addCase(getCurrentProfile.pending, (state) => {
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
      });
  },
});

export default profileSlice.reducer;
