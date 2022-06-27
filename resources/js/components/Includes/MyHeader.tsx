import UserOutlined from '@ant-design/icons/UserOutlined';
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import Button from 'antd/lib/button/index';
import Dropdown from 'antd/lib/dropdown/index';
import Menu from 'antd/lib/menu/index';
import PageHeader from 'antd/lib/page-header/index';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { logout } from '../../reducers/authUser';
import { collapseSideBar } from '../../reducers/sideBar';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const MyHeader = () => {
	const dispatch = useDispatch();
	const title = useSelector((state: RootState) => state.pageTitleReducer);
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const sideBarCollapsed = useSelector((state: RootState) => state.sideBarReducer.collapsed);

	// const [isShrunk, setShrunk] = useState(false);

	useEffect(() => {
		// const handler = () => {
		// 	setShrunk((isShrunk) => {
		// 		if (!isShrunk && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
		// 			return true;
		// 		}
		// 		if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
		// 			return false;
		// 		}
		// 		return isShrunk;
		// 	});
		// };
		// window.addEventListener('scroll', handler);
		// return () => window.removeEventListener('scroll', handler);
	}, []);

	const onBack = () => dispatch(collapseSideBar({ collapsed: !sideBarCollapsed }));

	let items: ItemType[] = [
		{
			label: <Link to="/">Trang chủ</Link>,
			key: 'home',
		},
	];

	if (authUser.quan_tri)
		items = items.concat([
			{
				type: 'divider',
			},
			{
				type: 'group',
				label: 'Quản trị',
				children: [
					{
						label: <Link to="/can-bo">Tổ chức cán bộ</Link>,
						key: 'user',
					},
					{
						label: <Link to="/don-vi">Danh sách đơn vị</Link>,
						key: 'team',
					},
				],
			},
		]);

	items = items.concat([
		{
			type: 'divider',
		},
		{
			type: 'group',
			label: 'Cá nhân',
			children: [
				{
					label: <Link to="/cai-dat-ca-nhan">Cài đặt cá nhân</Link>,
					key: 'profile',
				},
				{
					label: <Link to="/doi-mat-khau">Đổi mật khẩu</Link>,
					key: 'password',
				},
				{
					label: 'Đăng xuất',
					onClick: () => dispatch(logout()),
					key: 'logout',
					danger: true,
				},
			],
		},
	]);

	const DropdownMenu = () => (
		<Dropdown key="more" overlay={<Menu items={items} />} arrow>
			<Button className="btn-user">
				<span className="user-text">
					Xin chào <strong>{authUser.ho_ten}</strong>
				</span>
				<UserOutlined className="user-logo" />
			</Button>
		</Dropdown>
	);

	return (
		<PageHeader
			className={'my-header'}
			onBack={onBack}
			backIcon={sideBarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			title={title}
			extra={<DropdownMenu />}
		/>
	);
};

export default React.memo(MyHeader);
