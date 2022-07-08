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
	{ id: 1, label: 'Người bị tố giác' },
	{ id: 2, label: 'Người bị kiến nghị khởi tố' },
	{ id: 3, label: 'Người bị giữ trong trường hợp khẩn cấp' },
	{ id: 4, label: 'Người bị bắt' },
	{ id: 5, label: 'Người bị tạm giữ' },
	{ id: 6, label: 'Bị can' },
	{ id: 7, label: 'Người tố giác, báo tin về tội phạm, kiến nghị khởi tố' },
	{ id: 8, label: 'Bị hại' },
	{ id: 9, label: 'Người có quyền lợi, nghĩa vụ liên quan đến vụ án' },
	{ id: 10, label: 'Người làm chứng' },
	{ id: 11, label: 'Người chứng kiến' },
	{ id: 12, label: 'Người liên quan khác' },
];

// export const TU_CACH_TO_TUNG_KHOI_TO = [
// 	{ id: 1, label: 'Người bị hại' },
// 	{ id: 2, label: 'Bị can' },
// 	{ id: 3, label: 'Người làm chứng' },
// 	{ id: 4, label: 'Người liên quan khác' },
// ];

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

export const PHUONG_THUC_PHAM_TOI = [
	'Trộm quả tang',
	'Trộm đột nhập',
	'Trộm cơ hội',
	'Trộm chung cư',
	'Trộm mới',
	'Trộm truyền thống',
	'Lừa đảo truyền thống',
	'Lừa đảo qua công nghệ cao',
	'Lừa đảo qua mạng xã hội Facebook',
	'Lừa đảo qua mạng xã hội Zalo',
	'Lừa đảo qua mạng xã hội Viber',
	'Lừa đảo qua mạng xã hội Telegram',
	'Lừa đảo qua mạng xã hội khác',
	'Lừa đảo giả danh người thân',
	'Lừa đảo bằng giả danh cán bộ tư pháp',
	'Lừa đảo mới',
	'Chiếm đoạt tài sản (Điều 290) dưới hình thức nhận làm cộng tác viên sàn thương mại điện tử',
	'Chiếm đoạt tài sản (Điều 290) bằng gửi liên kết lạ (Link)',
	'Chiếm đoạt tài sản (Điều 290) mới',
	'Cướp giật tài sản bằng phương tiện giao thông',
	'Cướp giật tài sản chạy bộ',
	'Cướp giật tài sản phương thức mới',
	'Cướp tài sản do đòi nợ',
	'Cướp tài sản truyền thống',
	'Cướp tài sản mới',
	'Giết người dùng vũ khí nóng',
	'Giết người dùng vũ khí thô sơ',
	'Giết người bằng tay không',
	'Giết người bằng đầu độc',
	'Giết người bằng hình thức mới',
	'Cố ý gây thương tích bằng vũ khí nóng',
	'Cố ý gây thương tích bằng vũ khí thô sơ',
	'Cố ý gây thương tích bằng hung khí',
	'Cố ý gây thương tích bằng tay không',
	'Cố ý gây thương tích bằng phương tiện giao thông',
	'Cố ý gây thương tích bằng hình thức mới',
	'Đánh bạc bằng trang Web',
	'Đánh bạc bằng ứng dụng',
	'Đánh bạc truyền thống',
	'Đánh bạc dạng cá độ',
	'Đánh bạc dạng sát phạt',
	'Đánh bạc hình thức mới',
	'Tổ chức đánh bạc bằng trang Web',
	'Tổ chức đánh bạc bằng ứng dụng',
	'Tổ chức đánh bạc truyền thống',
	'Tổ chức Đánh bạc dạng cá độ',
	'Tổ chức Đánh bạc dạng sát phạt',
	'Tổ chức Đánh bạc hình thức mới',
	'Phạm tội có sử dụng vũ khí nóng',
	'Phạm tội có sử dụng vũ khí thô sơ',
	'Phạm tội có sử dụng hung khí',
	'Phạm tội bằng hình thức truyền thống',
	'Phạm tội bằng hình thức phi truyền thống',
];

export const NOI_THUC_HIEN_PHAM_TOI = [
	'Nhà riêng',
	'Chung cư',
	'Công cộng',
	'Không gian mạng',
	'Cơ sở vàng bạc',
	'Ngân hàng',
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
	{ id: 5, label: 'Chưa đạt', color: 'red' },
	{ id: 6, label: 'Xác nhận', color: 'cyan' },
	{ id: 7, label: 'Hoàn thành', color: 'green' },
	{ id: 8, label: 'Hủy', color: 'default' },
];

export enum MA_TRANG_THAI_CONG_VIEC {
	MOI_TAO,
	MOI_GIAO,
	DA_TIEP_NHAN,
	DANG_THUC_HIEN,
	DA_THUC_HIEN,
	CHUA_DAT,
	XAC_NHAN,
	HOAN_THANH,
	HUY,
}
