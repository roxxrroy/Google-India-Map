import { configureStore } from '@reduxjs/toolkit';
import apiSlice, { dataReducer } from './api/slices/diseaseSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		datas: dataReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
	devTools: true,
});

export default store;
