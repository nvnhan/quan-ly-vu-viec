import { lazy } from 'react';

const TrangChu = lazy(() => import('../../pages/TrangChu/DinhDanh'));
const ThemFile = lazy(() => import('../../pages/TrangChu/ThemFile'));
const NotFound = lazy(() => import('../../pages/NotFound'));

const Profile = lazy(() => import('../../pages/Account/Profile'));
const Password = lazy(() => import('../../pages/Account/Password'));
const NguoiDung = lazy(() => import('../../pages/QuanTri/NguoiDung'));

export interface MyRoute {
	path: string;
	title: string;
	Component: any;
	role?: string;
}

const routes: MyRoute[] = [
	{
		path: '/',
		title: 'Trang chủ',
		Component: TrangChu,
	},
	{
		path: '/them-file',
		title: 'Thêm từ Excel',
		Component: ThemFile,
	},
	{
		path: '/nguoi-dung',
		title: 'Danh sách người dùng',
		Component: NguoiDung,
		role: 'admin',
	},
	{
		path: '/cai-dat-ca-nhan',
		title: 'Cài đặt cá nhân',
		role: 'user',
		Component: Profile,
	},
	{
		path: '/doi-mat-khau',
		title: 'Đổi mật khẩu',
		Component: Password,
		role: 'user',
	},
	{
		path: '/*',
		title: 'Lỗi 404!',
		Component: NotFound,
	},
];

export default routes;
