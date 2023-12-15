// store.js

import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
// import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    users: UserReducer,
    // Add other reducers if needed
  },
});

export default store;
