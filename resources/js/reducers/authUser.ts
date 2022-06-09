import * as types from '../constants/ActionTypes';
import { Action, User } from '../utils';
import axios from 'axios';
import message from 'antd/lib/message/index';

const initialState: User = {
	username: '',
	ho_ten: '',
	admin: false,
	them_moi: false,
	them_file: false,
	roles: [],
	so_ket_qua: 20,
};

const myReducer = (state = initialState, action: Action): User => {
	if (action.type === types.LOGOUT) {
		// Logout from server
		let token = localStorage.token;
		if (token !== undefined) {
			axios
				.get(`/api/logout`)
				.then((response) => {
					if (response.data.success) message.success(response.data.message);
				})
				.catch((error) => {
					if (error.response.status !== 401) console.log('Error Logout ', error);
				});
			// Remove token from localStorage
			localStorage.removeItem('token');
			state = initialState;
		}
	} else if (action.type === types.SET_AUTH) state = action.payload;

	return state;
};

export default myReducer;
