import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { RootState } from '../../store';
import { toogleSideBar } from '../../reducers/sideBar';

const ButtonToogle = () => {
	const sideBarToggled = useSelector((state: RootState) => state.sideBarReducer.toggled);
	const dispatch = useDispatch();

	const onClick = () => dispatch(toogleSideBar({ toggled: !sideBarToggled }));

	return (
		<div className="btn-toggle" onClick={onClick}>
			<MenuOutlined />
		</div>
	);
};

export default React.memo(ButtonToogle);
