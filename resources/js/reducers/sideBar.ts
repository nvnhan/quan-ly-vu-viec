import { createSlice, PayloadAction } from '@reduxjs/toolkit';

var initialState: Model.SideBarProps = {
	collapsed: false,
	toggled: false,
};

const sideBar = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toogleSideBar: (state, { payload }: PayloadAction<Model.SideBarProps>) => {
			state.toggled = payload.toggled;
			return state;
		},
		collapseSideBar: (state, { payload }: PayloadAction<Model.SideBarProps>) => {
			state.collapsed = payload.collapsed;
			return state;
		},
	},
});

export const sideBarReducer = sideBar.reducer;
export const { toogleSideBar, collapseSideBar } = sideBar.actions;
