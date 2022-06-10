import { combineReducers } from 'redux';
import { User } from '../utils';
import authUser from './authUser';
import pageTitle from './pageTitle';
import menuActive from './menuActive';
import sideBar, { SideBarProps } from './sideBar';

export interface AppState {
	menuActive: string;
	pageTitle: string;
	authUser: User;
	sideBar: SideBarProps;
}
export const myReducer = combineReducers<AppState>({
	menuActive,
	pageTitle,
	authUser,
	sideBar,
});
