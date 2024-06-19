import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  display: true,
};
export const welcomeScreen = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    setWelcomeScreenDisplay(state, action) {
      state.display = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setWelcomeScreenDisplay} = welcomeScreen.actions;

export default welcomeScreen.reducer;
