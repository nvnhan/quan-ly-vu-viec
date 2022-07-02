import { LOAI_TOI_PHAM } from '../utils/constant';

declare module Model {
	export interface User {
		readonly id: number;
		readonly ten_dang_nhap: string;
		ho_ten: string;
		admin: boolean;
		chuc_vu: number;
		ten_chuc_vu: string;
		id_cap_bac?: number;
		dieu_tra_vien?: boolean;
		id_don_vi?: number;
		sdt?: string;
		dia_chi?: string;
		quan_tri?: boolean;
		chi_huy?: bolean;
	}

	export interface SideBarProps {
		collapsed?: boolean;
		toggled?: boolean;
	}

	export interface DanhMuc {
		id: number | string;
		value: string;
	}

	export interface VuViec {
		created_at?: string;
		id: number;
		canh_bao?: string;
		id_can_bo_chinh?: number;
		id_don_vi?: number;
		id_dtv_chinh?: number;
		ket_qua_an?: string;
		ket_qua_giai_quyet?: string;
		khu_vuc_xay_ra?: string;
		loai_toi_pham?: LOAI_TOI_PHAM;
		loai_vu_viec: 'AĐ' | 'AK';
		ma_toi_danh?: string;
		ngay_ca_phuong?: string;
		ngay_cqdt?: string;
		ngay_dang_ky_ho_so?: string;
		ngay_gia_han: string;
		ngay_gia_han_xac_minh?: string;
		ngay_keo_dai?: string;
		ngay_ket_thuc_1?: string;
		ngay_ket_thuc_2?: string;
		ngay_ket_thuc_dieu_tra?: string;
		ngay_ket_thuc_phuc_hoi?: string;
		ngay_khoi_to?: string;
		ngay_lap_ho_so?: string;
		ngay_phan_cong?: string;
		ngay_phuc_hoi?: string;
		nguoi_tao: number;
		noi_dung_tom_tat?: string;
		noi_xay_ra?: string;
		phan_loai_tin?: string;
		sel_can_bo_chinh?: {
			value: number;
			label: string;
		};
		sel_dp_xay_ra?: {
			value: number;
			label: string;
		}[];
		sel_dtv_chinh?: {
			value: number;
			label: string;
		};
		so_ho_so?: string;
		so_phan_cong?: string;
		ten_nguoi_tao?: string;
		ten_vu_viec?: string;
		thoi_diem_xay_ra?: string;
		thoi_gian_gia_han?: string | number;
		thoi_han_dieu_tra?: string | number;
		updated_at?: string;
	}
}
