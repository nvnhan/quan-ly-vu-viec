import { createSlice, PayloadAction } from '@reduxjs/toolkit';

var initialState = 'Trang chủ';

const pageTitle = createSlice({
	name: 'title',
	initialState,
	reducers: {
		changeTitle: (state, { payload }: PayloadAction<string>) => {
			document.title = payload + ' | QLVV';
			return payload;
		},
	},
});

export const pageTitleReducer = pageTitle.reducer;
export const { changeTitle } = pageTitle.actions;
