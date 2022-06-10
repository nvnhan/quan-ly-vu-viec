import * as Types from '../constants/ActionTypes';
import { Action, User } from '../utils';
import * as menus from '../constants/SideMenu';

export const changeMenu = (menu = menus.HOME) => {
	return {
		type: Types.CHANGE_MENU_ACTIVE,
		menu,
	};
};

export const changeTitle = (title: String): Action => {
	return {
		type: Types.CHANGE_PAGE_TITLE,
		payload: title,
	};
};

export const logout = (): Action => {
	return { type: Types.LOGOUT };
};

export const setAuth = (auth: User): Action => {
	return { type: Types.SET_AUTH, payload: auth };
};

export const toggleSidebar = (toggled: boolean) => {
	return { type: Types.TOGGLE_SIDEBAR, payload: toggled };
};
