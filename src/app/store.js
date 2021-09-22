import { configureStore } from '@reduxjs/toolkit';

import chatterReducer from '../features/chatter/chatterSlice';

export const store = configureStore({
  reducer: {
    chatter: chatterReducer,
  },
});
