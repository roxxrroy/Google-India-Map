import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { apiBaseUrl } from '../../util/envConfig';

const apiBaseUrl = 'http://localhost:3031/';
const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: apiBaseUrl,
	}),
	endpoints: () => ({}),
});

export default apiSlice;

export const dataApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllData: builder.query({
			query: (queryParams) => {
				console.log('queryParams===', queryParams);
				return `data?${queryParams}`;
			},
		}),
	}),
});

export const { useGetAllDataQuery } = dataApiSlice;

const dataSlice = createSlice({
	name: 'disease',
	initialState: {
		allData: [],
	},
	//reducer: {}, // This should be 'reducers' instead of 'reducer'
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.getAllData.matchFulfilled,
			(state, action) => {
				state.allData = action.payload || [];
			}
		);
	},
});

export const {} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;

export const getAllData = (state) => state.disease?.allData || [];
