import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as actions from '../../actions';
import Login from '../../pages/Account/Login';
import { AppState } from '../../reducers';
import { User } from '../../utils';
import { MyRoute } from './routes';

const RouteContainer = ({ title, Component, role }: MyRoute) => {
	const dispatch = useDispatch();
	const authUser = useSelector<AppState>((state) => state.authUser) as User;

	const changeTitle = (title: string) => dispatch(actions.changeTitle(title));

	useEffect(() => {
		(!role || authUser.username) && changeTitle(title);
	});

	// If route has ROLE
	if (role) {
		if (!authUser.username) return <Login />;
		if (!authUser.roles.includes(role)) return <Navigate to="/" />;
	}

	// Show component content's page as JSX
	return <Component />;
};

export default React.memo(RouteContainer);
