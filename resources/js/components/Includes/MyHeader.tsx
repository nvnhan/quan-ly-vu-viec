import UserOutlined from '@ant-design/icons/UserOutlined';
import Button from 'antd/lib/button/index';
import Dropdown from 'antd/lib/dropdown/index';
import Menu from 'antd/lib/menu/index';
import PageHeader from 'antd/lib/page-header/index';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import { AppState } from '../../reducers';
import { User } from '../../utils';

const MyHeader = () => {
	const dispatch = useDispatch();
	const title = useSelector<AppState>((state) => state.pageTitle) as string;
	const authUser = useSelector<AppState>((state) => state.authUser) as User;

	const [isShrunk, setShrunk] = useState(false);

	useEffect(() => {
		const handler = () => {
			setShrunk((isShrunk) => {
				if (!isShrunk && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
					return true;
				}

				if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
					return false;
				}

				return isShrunk;
			});
		};
		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	}, []);

	const doLogOut = () => dispatch(actions.logout()) && setTimeout(() => window.location.reload(), 1000);

	const menu = () => (
		<Menu>
			<Menu.Item key="home">
				<Link to="/">Trang chủ</Link>
			</Menu.Item>
			<Menu.Divider />
			{authUser.admin && (
				<>
					<Menu.Item key="user">
						<Link to="/nguoi-dung">Danh sách người dùng</Link>
					</Menu.Item>
					<Menu.Divider />
				</>
			)}
			<Menu.Item key="profile">
				<Link to="/cai-dat-ca-nhan">Cài đặt cá nhân</Link>
			</Menu.Item>
			<Menu.Item key="password">
				<Link to="/doi-mat-khau">Đổi mật khẩu</Link>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="SignOut" className="color-danger" onClick={doLogOut}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);

	const DropdownMenu = () => (
		<Dropdown key="more" overlay={menu()}>
			<Button className="btn-user">
				<span className="user-text">
					Xin chào <strong>{authUser.ho_ten}</strong>
				</span>
				<UserOutlined className="user-logo" />
			</Button>
		</Dropdown>
	);

	const SigninMenu = [
		<Button className="btn-user" key={1}>
			<Link to="/cai-dat-ca-nhan">
				<span className="user-text">Cá nhân</span>
				<UserOutlined className="user-logo" />
			</Link>
		</Button>,
	];

	return (
		<PageHeader
			className={isShrunk ? 'my-header sticky-header' : 'my-header'}
			// onBack={() => window.history.back()}
			title={title}
			extra={authUser.username ? <DropdownMenu /> : SigninMenu}
		/>
	);
};

export default React.memo(MyHeader);
