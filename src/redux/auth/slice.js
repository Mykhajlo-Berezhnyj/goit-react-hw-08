import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, refreshUser } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.isRefreshing = false;
};

const handleLogIn = (state, action) => {
  state.isLoading = false;
  state.error = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const handleLogOut = (state, action) => {
  state.isLoading = false;
  state.error = false;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const handleRefreshing = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleLogIn)
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleLogIn)
      .addCase(login.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, handleLogOut)
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        handlePending(state);
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, handleRefreshing)
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export default authSlice.reducer;
