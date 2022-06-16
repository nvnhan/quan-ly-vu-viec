import { lazy } from 'react';
import items, { SideBarItem } from '../SideBar/SideBarItems';

const VuViecChiTiet = lazy(() => import('../../pages/VuViec/VuViecChiTiet'));
const NguoiChiTiet = lazy(() => import('../../pages/ThongTin/Nguoi/NguoiChiTiet'));
const NotFound = lazy(() => import('../../pages/NotFound'));
const Profile = lazy(() => import('../../pages/Account/Profile'));
const Password = lazy(() => import('../../pages/Account/Password'));

export interface MyRoute {
	path: string;
	title: string;
	Component: any;
	menu?: string;
	role?: string;
}

const invisibleRoutes: MyRoute[] = [
	{
		path: '/nguoi-lien-quan/chi-tiet/*',
		title: 'Chi tiết người',
		Component: NguoiChiTiet,
	},
	{
		path: '/vu-viec/chi-tiet/*',
		title: 'Chi tiết vụ việc',
		Component: VuViecChiTiet,
	},
	{
		path: '/cai-dat-ca-nhan',
		title: 'Cài đặt cá nhân',
		Component: Profile,
	},
	{
		path: '/doi-mat-khau',
		title: 'Đổi mật khẩu',
		Component: Password,
	},
	{
		path: '/*',
		title: 'Lỗi 404!',
		Component: NotFound,
	},
];

const getAllRoutes = (): MyRoute[] => {
	let routes: MyRoute[] = [];
	items.map((item: SideBarItem) => {
		if (item.href && item.Component)
			routes.push({
				path: item.href,
				title: item.title,
				menu: item.key,
				Component: item.Component,
				role: item.role,
			});
		else if (item.childs && item.childs.length > 0) {
			item.childs.map((i: SideBarItem) => {
				if (i.href && i.Component)
					routes.push({
						path: i.href,
						title: i.title,
						menu: i.key,
						Component: i.Component,
						role: i.role,
					});
			});
		}
	});
	routes = routes.concat(invisibleRoutes);
	return routes;
};

export default getAllRoutes;
