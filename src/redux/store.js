import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './slices/playerSlice';
import { shazamApi } from './services/shazamApi';

export const store = configureStore({
	reducer: {
		[shazamApi.reducerPath]: shazamApi.reducer,
		player: playerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(shazamApi.middleware),
});
