import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { toggleSidebar } from '../../actions';
import { AppState } from '../../reducers';

const ButtonToogle = () => {
	const sideBarToggled = useSelector<AppState>((state) => state.sideBar.toggled) as boolean;
	const dispatch = useDispatch();

	const onClick = () => dispatch(toggleSidebar(!sideBarToggled));

	return (
		<div className="btn-toggle" onClick={onClick}>
			<MenuOutlined />
		</div>
	);
};

export default React.memo(ButtonToogle);
