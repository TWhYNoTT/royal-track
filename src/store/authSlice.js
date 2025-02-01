import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userRole: localStorage.getItem('userRole') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.userRole = role;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
    },
    logout: (state) => {
      state.token = null;
      state.userRole = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;