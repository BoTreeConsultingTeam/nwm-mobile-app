import { createSlice } from '@reduxjs/toolkit';
import { saveToken } from '../utility/methods/localStorage';

const initialState = {
  token: '',
  user: {},
};
export const LoginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken(state, action) {
      const data = action.payload;
      const token = `Bearer ${data.token}`;
      const userData = {
        role: data?.role?.name,
        id: data?.userId,
        username: data?.name,
      };
      saveToken(token);
      state.token = token;
      state.user = userData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = LoginReducer.actions;

export default LoginReducer.reducer;
