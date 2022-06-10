import * as Types from '../constants/ActionTypes';
import { Action } from '../utils';

var initialState: SideBarProps = {
	collapsed: false,
	toggled: false,
};

const myReducer = (state = initialState, action: Action) => {
	if (action.type === Types.TOGGLE_COLLAPSE_SIDEBAR) {
		state.collapsed = action.payload;
	} else if (action.type === Types.TOGGLE_SIDEBAR) {
		state.toggled = action.payload;
	}
	return state;
};

export default myReducer;

export interface SideBarProps {
	collapsed: boolean;
	toggled: boolean;
}
