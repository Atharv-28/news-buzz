import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';


// Configuring news state to be able to use it
export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
