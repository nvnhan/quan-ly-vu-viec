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
}
