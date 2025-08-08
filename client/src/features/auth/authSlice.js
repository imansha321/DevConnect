import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { setTimedAlert } from '../alert/alertSlice'; 

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// Async Thunks

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/auth');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        '/api/users',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach(error => dispatch(setTimedAlert(error.msg, 'danger')));
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      console.log(email, password);
      const res = await axios.post(
        '/api/auth',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      console.log(errors.map(error => error.msg));
      if (errors) {
        errors.forEach(error => dispatch(setTimedAlert(error.msg, 'danger', 3000)));
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return;
});

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, state => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, state => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, state => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
