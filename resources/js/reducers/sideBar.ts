import { createSlice, PayloadAction } from '@reduxjs/toolkit';

var initialState: SideBarProps = {
	collapsed: false,
	toggled: false,
};

const sideBar = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toogleSideBar: (state, { payload }: PayloadAction<SideBarProps>) => {
			state.toggled = payload.toggled;
			return state;
		},
		collapseSideBar: (state, { payload }: PayloadAction<SideBarProps>) => {
			state.collapsed = payload.collapsed;
			return state;
		},
	},
});

export const sideBarReducer = sideBar.reducer;
export const { toogleSideBar, collapseSideBar } = sideBar.actions;

export interface SideBarProps {
	collapsed?: boolean;
	toggled?: boolean;
}
