export const ad: BieuMau.Item[] = [
	{
		path: 'ChuyenNguonTin',
		name: 'Chuyển nguồn tin',
		childs: [
			{ path: 'BBThongBaoChuyenNguonTin.doc', name: 'Biên bản thông báo chuyển nguồn tin', lanh_dao: true },
			{ path: 'TBaoChuyenNguonTin.doc', name: 'Thông báo về việc chuyển nguồn tin', lanh_dao: true },
		],
	},
	{
		path: 'DeNghiGiaHanXacMinhNguonTinTP',
		name: 'Đề nghị gia hạn xác minh nguồn tin tội phạm',
		childs: [
			{ path: 'BBThongBaoGiaHanXacMinh.doc', name: 'Biên bản thông báo gia hạn xác minh', lanh_dao: true },
			{ path: 'TBVeViecGiaHanXacMinhNguonTinTP.doc', name: 'Thông báo về việc gia hạn xác minh nguồn tin', lanh_dao: true },
		],
	},
	{
		path: 'KeoDaiThoiHanXacMinhDen2Thang',
		name: 'Kéo dài thời gian xác minh đến 2 tháng',
		childs: [
			{ path: 'BBThongBaoKeoDaiXacMinhDen2Thang.doc', name: 'Biên bản thông báo kéo dài xác minh đến 2 tháng', lanh_dao: true },
			{ path: 'TbVeViecKeoDaiThoiHanXacMinhDen2Thang.doc', name: 'Thông báo về việc kéo dài thời hạn xác minh đến 2 tháng', lanh_dao: true },
		],
	},
	{
		path: 'KhongKhoiToNguonTin',
		name: 'Không khởi tố nguồn tin',
		childs: [
			{ path: 'BBThongBaoKhongKhoiTo.doc', name: 'Biên bản thông báo không khởi tố', lanh_dao: true },
			{ path: 'TBKhongKhoiTo.doc', name: 'Thông báo không khởi tố', lanh_dao: true },
			{ path: 'ThongbaoKetQuaKhongKhoiTo.doc', name: 'Thông báo kết quả giải quyết nguồn tin', lanh_dao: true },
		],
	},
	{
		path: 'LoiKhaiTuKhai',
		name: 'Lời khai, tự khai, tường trình',
		childs: [
			{ path: 'BanTuKhai.doc', name: 'Bản tự khai', lanh_dao: true },
			{ path: 'BanTuongTrinh.doc', name: 'Bản tường trình', lanh_dao: true },
			{ path: 'BBGhiLoiKhai.doc', name: 'Biên bản ghi lời khai', lanh_dao: true },
		],
	},
	{
		path: 'PhanCongNguonTinToiPham',
		name: 'Phân công nguồn tin tội phạm',
		childs: [
			{ path: 'BBThongBaoTiepNhan.doc', name: 'Biên bản thông báo tiếp nhận', lanh_dao: true },
			{ path: 'TBTiepNhanNguonTin.doc', name: 'Thông báo tiếp nhận', lanh_dao: true },
		],
	},
	{
		path: 'PhucHoiNguonTin',
		name: 'Phục hồi nguồn tin',
		childs: [
			{ path: 'BBThongBaoVeViecPhucHoi.doc', name: 'Biên bản thông báo về việc phục hồi', lanh_dao: true },
			{ path: 'ThongbaoVeViecPhucHoi.doc', name: 'Thông báo về việc phục hồi', lanh_dao: true },
		],
	},
	{
		path: 'TamDinhChiAD',
		name: 'Tạm đình chỉ AĐ',
		childs: [
			{ path: 'BBThongBaoTamDinhChi.doc', name: 'Biên bản thông báo về việc tạm đình chỉ', lanh_dao: true },
			{ path: 'TBaoTamDinhChi.doc', name: 'Thông báo tạm đình chỉ', lanh_dao: true },
		],
	},
	{
		path: 'TamGiuDoVat',
		name: 'Tạm giữ đồ vật',
		childs: [
			{ path: 'BBMoNiemPhong.doc', name: 'Biên bản mở niêm phong', lanh_dao: true },
			{ path: 'BBNiemPhong.doc', name: 'Biên bản niêm phong', lanh_dao: true },
			{ path: 'BBTamGiuDoVat.doc', name: 'Biên bản tạm giữ đồ vật', lanh_dao: true },
			{ path: 'QDTamGiuDoVatTaiSan.doc', name: 'Quyết định tạm giữ đồ vật', lanh_dao: true },
		],
	},
	{
		path: 'TBKetLuanDinhGia',
		name: 'Thông báo kết luận định giá',
		childs: [
			{ path: 'BBTBaoKLDG.doc', name: 'Biên bản thông báo Kết luận định giá', lanh_dao: true },
			{ path: 'TBVeKLDG.doc', name: 'Thông báo về Kết luận định giá', lanh_dao: true },
		],
	},
	{
		path: 'TBKetLuanGiamDinhAD',
		name: 'Thông báo kết luận giám định',
		childs: [
			{ path: 'BBTBaoKLGD.doc', name: 'Biên bản thông báo Kết luận giám định', lanh_dao: true },
			{ path: 'TBaoKetLuanGiamDinh.doc', name: 'Thông báo kết luận giám định', lanh_dao: true },
		],
	},
	{
		path: 'TraDoVatTaiLieu',
		name: 'Trả đồ vật tài liệu',
		childs: [
			{ path: 'BBTraLaiDoVatTaiLieu.doc', name: 'Biên bản Trả lại đồ vật tài liệu', lanh_dao: true },
			{ path: 'QDXuLyTaiSanDoVatTaiLieu.doc', name: 'Quyết định xử lý tài sản đồ vật, tài liệu', lanh_dao: true },
		],
	},
];
