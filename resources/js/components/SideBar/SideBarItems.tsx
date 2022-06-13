import BarsOutlined from '@ant-design/icons/BarsOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import FileProtectOutlined from '@ant-design/icons/FileProtectOutlined';
import React, { lazy } from 'react';

const TrangChu = lazy(() => import('../../pages/VuViec'));

const VuViec = lazy(() => import('../../pages/VuViec'));
const ToiDanh = lazy(() => import('../../pages/ThongTin/ToiDanh'));

const CanBo = lazy(() => import('../../pages/QuanTri/CanBo'));

export interface SideBarItem {
	key: string;
	title: string;
	Component?: any;
	href?: string;
	icon?: React.ReactNode;
	role?: string;
	childs?: SideBarItem[];
}

const items: SideBarItem[] = [
	{
		key: 'HOME',
		href: '/',
		icon: <DashboardOutlined />,
		title: 'Tổng quan',
		Component: TrangChu,
	},
	{
		key: 'CONG_VIEC_CUA_TOI',
		href: '/cong-viec-cua-toi',
		icon: <SolutionOutlined />,
		title: 'Công việc của tôi',
		Component: TrangChu,
	},
	{
		key: 'SUB_VV',
		icon: <ReadOutlined />,
		title: 'Vụ việc',
		role: 'chuc_nang',
		childs: [
			{
				key: 'VV_VU_VIEC',
				href: '/vu-viec',
				title: 'Thông tin vụ việc',
				Component: VuViec,
			},
			{
				key: 'BC_CONG_NO_CHI_TIET',
				href: '/cong-no-chi-tiet',
				title: 'Tài liệu',
			},
			{
				key: 'BC_TONG_HOP_CONG_NO',
				href: '/tong-hop-cong-no',
				title: 'Công văn',
			},
		],
	},
	{
		key: 'VAN_BAN_PHAP_LUAT',
		href: '/van-ban-phap-luat',
		icon: <FileProtectOutlined />,
		title: 'Văn bản pháp luật',
		Component: TrangChu,
	},
	{
		key: 'SUB_TT',
		icon: <BarsOutlined />,
		title: 'Thông tin chung',
		role: 'chuc_nang',
		childs: [
			{
				key: 'TT_TOI_DANH',
				href: '/toi-danh',
				title: 'Tội danh',
				Component: ToiDanh,
			},
			{
				key: 'TT_NHA_CUNG_CAP',
				href: '/nha-cung-cap',
				title: 'Đơn vị',
				role: 'quan_ly',
			},
			{
				key: 'TT_KHACH_HANG',
				href: '/khach-hang',
				title: 'Khách hàng',
			},
		],
	},
	{
		key: 'SUB_QT',
		icon: <ToolOutlined />,
		title: 'Quản trị',
		role: 'quan_tri',
		childs: [
			{
				key: 'QT_CAN_BO',
				href: '/can-bo',
				title: 'Tổ chức cán bộ',
				Component: CanBo,
			},
			{
				key: 'QT_NHOM_CONG_VIEC',
				href: '/nhom-cong-viec',
				title: 'Nhóm công việc',
			},
			{
				key: 'QT_CAI_DAT',
				href: '/cai-dat',
				title: 'Cài đặt',
				role: 'admin',
			},
		],
	},
];

export default items;
