import * as types from '../constants/ActionTypes';
import { Action } from '../utils';

var initialState = '';

const myReducer = (state = initialState, action: Action) => {
	if (action.type === types.CHANGE_MENU_ACTIVE) {
		state = action.payload;
	}
	return state;
};

export default myReducer;
