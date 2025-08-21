import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    localId: null,
    email: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        localId: null,
        email: null,
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
