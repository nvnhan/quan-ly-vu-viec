import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../../pages/Account/Login';
import { changeMenu } from '../../reducers/menuActive';
import { changeTitle } from '../../reducers/pageTitle';
import { RootState } from '../../store';
import { MyRoute } from './routes';

const RouteContainer = ({ title, Component, role, menu }: MyRoute) => {
	const dispatch = useDispatch();
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	useEffect(() => {
		dispatch(changeMenu(menu ?? ''));
		dispatch(changeTitle(title ?? ''));
	});

	// If route has ROLE
	if (role) {
		if (!authUser.ten_dang_nhap) return <Login />;
		if (!authUser[role]) return <Navigate to="/" />;
	}

	// Show component content's page as JSX
	return <Component />;
};

export default React.memo(RouteContainer);
