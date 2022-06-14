import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import message from 'antd/lib/message/index';
import { getLogout } from '../utils/services';

const initialState: Model.User = {
	ten_dang_nhap: '',
	ho_ten: '',
	admin: false,
	chuc_vu: 0,
	ten_chuc_vu: 'Cán bộ',
};

const authUser = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state, _action: PayloadAction<void>) => {
			// Logout from server
			let token = localStorage.token;
			if (token !== undefined) {
				getLogout()
					.then((response) => {
						if (response.data.success) message.success(response.data.message);
					})
					.catch((error) => {
						if (error.response.status !== 401) console.log('Error Logout ', error);
					});
				// Remove token from localStorage
				localStorage.removeItem('token');
			}
			return initialState;
		},
		setAuth: (state, { payload }: PayloadAction<Model.User>) => payload,
	},
});

export const authUserReducer = authUser.reducer;
export const { logout, setAuth } = authUser.actions;
