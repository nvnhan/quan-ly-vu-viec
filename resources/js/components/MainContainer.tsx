import Layout from 'antd/lib/layout/index';
import message from 'antd/lib/message/index';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import Login from '../pages/Account/Login';
import ButtonToogle from './Includes/ButtonToggle';
import Content from './Includes/MyContent';
import Loader from './Includes/RouteLoader';
import MyHeader from './Includes/MyHeader';
import SideBar from './SideBar';
import { AppState } from '../reducers';
import { User } from '../utils';
import axios from 'axios';

const MainContainer = () => {
	const authUser = useSelector<AppState>((state) => state.authUser) as User;
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const setAuth = (auth: User) => dispatch(actions.setAuth(auth));
	const logout = () => dispatch(actions.logout());

	const isAuthenticate = () => authUser.username !== '';

	useEffect(() => {
		// Get token from localStorage
		let token = localStorage.token;
		if (token !== undefined) {
			// Setup default config for axios
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			// Check it in server
			axios
				.get(`/api/get-user`)
				.then((response) => {
					if (response.data.success) {
						// Add a response interceptor
						axios.interceptors.response.use(undefined, (error) => {
							if (error.response.status === 401) {
								// Unauthorized
								message.warn('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại');
								setTimeout(logout, 2000);
							}
							return Promise.reject(error);
						});
						setAuth(response.data.data);
					} else {
						localStorage.removeItem('token');
						message.warn(response.data.message);
					}
				})
				.catch((error) => {
					if (error.response.status === 401) {
						// Unauthorized
						message.warn('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại');
						setTimeout(logout, 2000);
					} else console.log(error);
				})
				.then(() => setIsLoading(false));
		} else setIsLoading(false); // Chuyển tới Login page
	}, []);

	if (isLoading) return <Loader tip="Lấy thông tin người dùng" />;

	if (isAuthenticate())
		return (
			<Layout className="has-sidebar">
				<SideBar />
				<Layout>
					<MyHeader />
					<Content />
					<ButtonToogle />
				</Layout>
			</Layout>
		);
	else return <Login />;
};

export default MainContainer;
