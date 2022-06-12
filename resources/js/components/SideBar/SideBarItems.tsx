import BarsOutlined from '@ant-design/icons/BarsOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import FundOutlined from '@ant-design/icons/FundOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import React, { lazy } from 'react';

const TrangChu = lazy(() => import('../../pages/VuViec'));

const VuViec = lazy(() => import('../../pages/VuViec'));

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
		key: 'SUB_VV',
		icon: <FundOutlined />,
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
				title: 'Công nợ chi tiết',
			},
			{
				key: 'BC_TONG_HOP_CONG_NO',
				href: '/tong-hop-cong-no',
				title: 'TH công nợ',
			},
			{
				key: 'BC_DOI_SOAT_TAI_KHOAN',
				href: '/doi-soat-tai-khoan',
				title: 'Đối soát tài khoản',
			},
			{
				key: 'BC_BAO_CAO_TONG_HOP',
				href: '/bao-cao-tong-hop',
				title: 'Báo cáo tổng hợp',
			},
		],
	},
	{
		key: 'SUB_TT',
		icon: <BarsOutlined />,
		title: 'Thông tin chung',
		role: 'chuc_nang',
		childs: [
			{
				key: 'TT_TAI_KHOAN',
				href: '/tai-khoan',
				title: 'Tài khoản',
				role: 'quan_ly',
			},
			{
				key: 'TT_NHA_CUNG_CAP',
				href: '/nha-cung-cap',
				title: 'Nhà cung cấp',
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
				key: 'QT_CAI_DAT',
				href: '/cai-dat',
				title: 'Cài đặt',
				role: 'admin',
			},
		],
	},
];

export default items;
