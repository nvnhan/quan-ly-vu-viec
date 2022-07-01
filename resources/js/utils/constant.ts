export const CHUC_VU = [
	{ id: 0, label: 'Cán bộ' },
	{ id: 1, label: 'Đội phó' },
	{ id: 2, label: 'Tổng hợp đội' },
	{ id: 3, label: 'Đội trưởng' },
	{ id: 4, label: 'Giúp việc PTT' },
	{ id: 5, label: 'Phó trưởng Công an Quận' },
	{ id: 6, label: 'Trưởng Công an Quận' },
	{ id: 9, label: 'Quản trị viên' },
];

export const TEN_CHUC_DANH = [
	'Cán bộ',
	'Cán bộ điều tra',
	'Điều tra viên',
	'Phó Thủ trưởng Cơ quan điều tra',
	'Thủ trưởng Cơ quan điều tra',
];

export enum MA_CHUC_VU {
	CAN_BO,
	DOI_PHO,
	TONG_HOP_DOI,
	DOI_TRUONG,
	GIUP_VIEC_PTT,
	LANH_DAO,
	QUAN_TRI_VIEN = 9,
}

export const TU_CACH_TO_TUNG = [
	{ id: 1, label: 'Người tố giác / Bị hại' },
	{ id: 2, label: 'Người bị tố giác' },
	{ id: 3, label: 'Người làm chứng' },
	{ id: 4, label: 'Người liên quan khác' },
];

export const TU_CACH_TO_TUNG_KHOI_TO = [
	{ id: 1, label: 'Người bị hại' },
	{ id: 2, label: 'Bị can' },
	{ id: 3, label: 'Người làm chứng' },
	{ id: 4, label: 'Người liên quan khác' },
];

export const TRUONG_HOP_BAT = [
	'Đầu thú',
	'Tự thú',
	'Bắt người phạm tội quả tang',
	'Bắt người đang bị truy nã',
	'Bắt bị can, bị cáo để tạm giam',
	'Bắt người bị giữ trong trường hợp khẩn cấp',
];

export enum PHAN_LOAI_TIN {
	TO_GIAC_TOI_PHAM = 'Tố giác về tội phạm',
	TIN_BAO_TOI_PHAM = 'Tin báo về tội phạm',
	KIEN_NGHI_KHOI_TO = 'Kiến nghị khởi tố',
	CQDT_PHAT_HIEN = 'CQĐT trực tiếp phát hiện',
}

export enum LOAI_TOI_PHAM {
	IT_NGHIEM_TRONG = 'Ít nghiêm trọng',
	NGHIEM_TRONG = 'Nghiêm trọng',
	RAT_NGHIEM_TRONG = 'Rất nghiêm trọng',
	DAC_BIET_NGHIEM_TRONG = 'Đặc biệt nghiêm trọng',
}

export const KET_QUA_DON = ['Tạm đình chỉ', 'Không khởi tố', 'Khởi tố'];

export const KET_QUA_AN = [
	'Tạm đình chỉ',
	'Gia hạn',
	'Kết luận điều tra',
	'Kết luận điều tra (Bổ sung)',
	'Kết luận điều tra (Lại)',
	'Kết luận điều tra (Đình chỉ)',
];

export const TEN_MUC_DO_UU_TIEN = [
	{ id: 0, label: 'Thấp', color: '#87d068' },
	{ id: 1, label: 'Thường', color: '#108ee9' },
	{ id: 2, label: 'Cao', color: '#fb3' },
	{ id: 3, label: 'Khẩn', color: '#f50' },
];

export const TEN_TRANG_THAI_CONG_VIEC = [
	{ id: 0, label: 'Mới tạo', color: 'gold' },
	{ id: 1, label: 'Mới giao', color: 'magenta' },
	{ id: 2, label: 'Đã tiếp nhận', color: 'purple' },
	{ id: 3, label: 'Đang thực hiện', color: 'geekblue' },
	{ id: 4, label: 'Đã thực hiện', color: 'blue' },
	{ id: 5, label: 'Xác nhận', color: 'cyan' },
	{ id: 6, label: 'Hủy', color: 'default' },
	{ id: 7, label: 'Chưa đạt', color: 'red' },
	{ id: 8, label: 'Hoàn thành', color: 'green' },
];

export enum MA_TRANG_THAI_CONG_VIEC {
	MOI_TAO,
	MOI_GIAO,
	DA_TIEP_NHAN,
	DANG_THUC_HIEN,
	DA_THUC_HIEN,
	XAC_NHAN,
	HUY,
	CHUA_DAT,
	HOAN_THANH,
}
