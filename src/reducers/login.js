import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
};
export const LoginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setToken} = LoginReducer.actions;

export default LoginReducer.reducer;
