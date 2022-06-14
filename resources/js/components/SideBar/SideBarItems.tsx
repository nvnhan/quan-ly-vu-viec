import BarsOutlined from '@ant-design/icons/BarsOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import FileProtectOutlined from '@ant-design/icons/FileProtectOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import React, { lazy } from 'react';

const TrangChu = lazy(() => import('../../pages/TrangChu'));

const VuViec = lazy(() => import('../../pages/VuViec/ThongTinVuViec'));
const ToiDanh = lazy(() => import('../../pages/ThongTin/ToiDanh'));

const CanBo = lazy(() => import('../../pages/QuanTri/CanBo'));
const NhomCongViec = lazy(() => import('../../pages/QuanTri/NhomCongViec'));
const CongViecKhoiTao = lazy(() => import('../../pages/QuanTri/CongViecKhoiTao'));
const CaiDat = lazy(() => import('../../pages/QuanTri/CaiDat'));

export interface SideBarItem {
	key: string;
	title: string;
	Component?: any;
	href?: string;
	icon?: React.ReactNode;
	suffix?: React.ReactNode;
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
		icon: <ReadOutlined />,
		title: 'Vụ việc hình sự',
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
				title: 'Kho tài liệu',
			},
			{
				key: 'CONG_VAN',
				href: '/cong-van',
				title: 'Công văn',
				Component: TrangChu,
			},
		],
	},
	{
		key: 'SUB_CV',
		title: 'Công việc',
		icon: <ScheduleOutlined />,
		suffix: <span className="badge">3</span>,
		childs: [
			{
				key: 'CV_TAT_CA',
				href: '/tat-ca-cong-viec',
				title: 'Tất cả công việc',
				Component: TrangChu,
			},
			{
				key: 'CV_CUA_TOI',
				href: '/cong-viec-cua-toi',
				title: 'Công việc của tôi',
				Component: TrangChu,
			},
			{
				key: 'CV_DA_TAO',
				href: '/cong-viec-da-tao',
				title: 'Công việc đã tạo',
				Component: TrangChu,
			},
			{
				key: 'CV_TONG_HOP',
				href: '/tong-hop-cong-viec',
				title: 'Tổng hợp theo cán bộ',
				Component: TrangChu,
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
				key: 'TT_NGUOI',
				href: '/nguoi-lien-quan',
				title: 'Người liên quan',
				Component: ToiDanh,
			},
			{
				key: 'TT_DON_VI',
				href: '/don-vi',
				title: 'Đơn vị',
				Component: ToiDanh,
			},
			{
				key: 'TT_TOI_DANH',
				href: '/toi-danh',
				title: 'Tội danh',
				Component: ToiDanh,
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
				Component: NhomCongViec,
			},
			{
				key: 'QT_CONG_VIEC_KHOI_TAO',
				href: '/cong-viec-khoi-tao',
				title: 'Công việc khởi tạo',
				Component: CongViecKhoiTao,
			},
			{
				key: 'QT_CAI_DAT',
				href: '/cai-dat',
				title: 'Cài đặt',
				role: 'admin',
				Component: CaiDat,
			},
		],
	},
];

export default items;
