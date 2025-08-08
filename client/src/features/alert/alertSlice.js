import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (msg, alertType, timeout = 3000) => {
        const id = uuidv4();
        return { payload: { msg, alertType, id, timeout } };
      },
    },
    removeAlert: (state, action) => {
      return state.filter(alert => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const setTimedAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const action = setAlert(msg, alertType, timeout);
  dispatch(action);

  setTimeout(() => {
    dispatch(removeAlert(action.payload.id));
  }, timeout);
};

export default alertSlice.reducer;
