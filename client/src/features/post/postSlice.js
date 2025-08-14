import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { setTimedAlert } from '../alert/alertSlice';
import axios from 'axios';


const initialState = {
  posts: [],
  postsByUserId: [],
  post: null,
  loading: false,
  error: null,

};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/post");
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json' ,
        },
      };
      const response = await axios.post("/api/post", formData, config);
      dispatch(setTimedAlert('Post Created', 'success'));
      return response.data;
    } catch (error) {
      const errors = error.response?.data?.errors;
      errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/post/${id}`);
      dispatch(setTimedAlert('Post Deleted', 'success'));
      return response.data;
    } catch (error) {
      const errors = error.response?.data?.errors;
      errors.forEach((error) => dispatch(setTimedAlert(error.msg, 'danger')));
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/post/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);

export const getPostsByUserId = createAsyncThunk(
  "post/getPostByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/post/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.statusText || 'Server Error',
        status: error.response?.status || 500,
      });
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.postsByUserId = action.payload;
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
