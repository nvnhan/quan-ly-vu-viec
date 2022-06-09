import * as types from '../constants/ActionTypes';
import { Action } from '../utils';

var initialState = 'Trang chủ';

const myReducer = (state = initialState, action: Action) => {
	if (action.type === types.CHANGE_PAGE_TITLE) {
		state = action.payload;
		document.title = action.payload + ' | VÉ ĐỊNH DANH';
	}
	return state;
};

export default myReducer;
