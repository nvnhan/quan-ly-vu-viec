import BarsOutlined from '@ant-design/icons/BarsOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import FileProtectOutlined from '@ant-design/icons/FileProtectOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import React, { lazy } from 'react';

const TrangChu = lazy(() => import('../../pages/TrangChu'));

const VuViec = lazy(() => import('../../pages/VuViec/ThongTinVuViec'));
const TaiLieu = lazy(() => import('../../pages/VuViec/TaiLieu'));
const CongVan = lazy(() => import('../../pages/VuViec/CongVan'));

const TatCaCongViec = lazy(() => import('../../pages/CongViec/TatCa'));
const CongViecCuaToi = lazy(() => import('../../pages/CongViec/CuaToi'));
const CongViecDaTao = lazy(() => import('../../pages/CongViec/DaTao'));
const CongViecBaoCao = lazy(() => import('../../pages/CongViec/BaoCao'));

const VanBanPhapLuat = lazy(() => import('../../pages/VanBanPhapLuat'));

const ToiDanh = lazy(() => import('../../pages/ThongTin/ToiDanh'));
const Nguoi = lazy(() => import('../../pages/ThongTin/Nguoi'));
const DonVi = lazy(() => import('../../pages/ThongTin/DonVi'));

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
	role?: 'admin' | 'quan_tri' | 'chi_huy';
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
		childs: [
			{
				key: 'VV_VU_VIEC',
				href: '/vu-viec',
				title: 'Thông tin vụ việc',
				Component: VuViec,
			},
			{
				key: 'VV_TAI_LIEU',
				href: '/kho-tai-lieu',
				title: 'Kho tài liệu',
				Component: TaiLieu,
			},
			{
				key: 'VV_CONG_VAN',
				href: '/cong-van',
				title: 'Công văn',
				Component: CongVan,
			},
		],
	},
	{
		key: 'SUB_CV',
		title: 'Công việc',
		icon: <ScheduleOutlined />,
		childs: [
			{
				key: 'CV_TAT_CA',
				href: '/tat-ca-cong-viec',
				title: 'Tất cả công việc',
				Component: TatCaCongViec,
				role: 'chi_huy',
			},
			{
				key: 'CV_CUA_TOI',
				href: '/cong-viec-cua-toi',
				title: 'Công việc của tôi',
				Component: CongViecCuaToi,
			},
			{
				key: 'CV_DA_TAO',
				href: '/cong-viec-da-tao',
				title: 'Công việc đã tạo',
				Component: CongViecDaTao,
			},
			{
				key: 'CV_TONG_HOP',
				href: '/tong-hop-cong-viec',
				title: 'Tổng hợp theo cán bộ',
				Component: CongViecBaoCao,
				role: 'chi_huy',
			},
		],
	},
	{
		key: 'VAN_BAN_PHAP_LUAT',
		href: '/van-ban-phap-luat',
		icon: <FileProtectOutlined />,
		title: 'Văn bản pháp luật',
		Component: VanBanPhapLuat,
	},
	{
		key: 'SUB_TT',
		icon: <BarsOutlined />,
		title: 'Thông tin chung',
		childs: [
			{
				key: 'TT_NGUOI',
				href: '/nguoi-lien-quan',
				title: 'Người liên quan',
				Component: Nguoi,
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
				key: 'TT_DON_VI',
				href: '/don-vi',
				title: 'Đơn vị',
				Component: DonVi,
				role: 'quan_tri',
			},
			{
				key: 'QT_CAN_BO',
				href: '/can-bo',
				title: 'Tổ chức cán bộ',
				Component: CanBo,
				role: 'quan_tri',
			},
			{
				key: 'QT_NHOM_CONG_VIEC',
				href: '/nhom-cong-viec',
				title: 'Nhóm công việc',
				Component: NhomCongViec,
				role: 'quan_tri',
			},
			{
				key: 'QT_CONG_VIEC_KHOI_TAO',
				href: '/cong-viec-khoi-tao',
				title: 'Công việc khởi tạo',
				Component: CongViecKhoiTao,
				role: 'quan_tri',
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
