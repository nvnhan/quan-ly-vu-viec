import { createSlice, PayloadAction } from '@reduxjs/toolkit';

var initialState = '';

const menuActive = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		changeMenu: (state, { payload }: PayloadAction<string>) => payload,
	},
});

export const menuActiveReducer = menuActive.reducer;
export const { changeMenu } = menuActive.actions;
