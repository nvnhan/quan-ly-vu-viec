import Layout from 'antd/lib/layout/layout';
import message from 'antd/lib/message/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { User } from '../utils';
import MyContent from './Includes/MyContent';
import MyHeader from './Includes/MyHeader';
import RouteLoader from './Includes/RouteLoader';

const MainContainer = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const setAuth = (auth: User) => dispatch(actions.setAuth(auth));
	const logout = () => dispatch(actions.logout());

	// Run once when first load website
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
								setTimeout(logout, 1000);
							}
							return Promise.reject(error);
						});
						setAuth(response.data.data); // Set authentication to Redux
					} else {
						localStorage.removeItem('token');
						message.warn(response.data.message);
					}
				})
				.catch((error) => {
					if (error.response.status === 401) {
						// Unauthorized
						message.warn('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại');
						setTimeout(logout, 1000);
					} else console.log(error);
				})
				.then(() => setIsLoading(false));
		} else setIsLoading(false); //	Authentication loaded => render content page
	}, []);

	if (isLoading) return <RouteLoader tip="Lấy thông tin người dùng" />;

	return (
		<Layout>
			<MyHeader />
			<MyContent />
		</Layout>
	);
};

export default MainContainer;
