import Layout from 'antd/lib/layout/index';
import message from 'antd/lib/message/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../pages/Account/Login';
import { logout, setAuth } from '../reducers/authUser';
import { RootState } from '../store';
import { getUser } from '../utils/services';
import ButtonToogle from './Includes/ButtonToggle';
import MyContent from './Includes/MyContent';
import MyHeader from './Includes/MyHeader';
import Loader from './Includes/RouteLoader';
import SideBar from './SideBar';

const MainContainer = () => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const doLogout = () => dispatch(logout());

	const isAuthenticate = () => authUser.ten_dang_nhap !== '';

	useEffect(() => {
		// Check it in server
		getUser()
			.then((response) => {
				if (response.data.success) {
					dispatch(setAuth(response.data.data));
				} else {
					localStorage.removeItem('token');
					message.warn(response.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				doLogout();
			})
			.then(() => setIsLoading(false));
	}, []);

	if (isLoading) return <Loader tip="Lấy thông tin người dùng" />;

	if (isAuthenticate())
		return (
			<Layout className="has-sidebar">
				<SideBar />
				<Layout>
					<MyHeader />
					<MyContent />
					<ButtonToogle />
				</Layout>
			</Layout>
		);
	else return <Login />;
};

export default MainContainer;
