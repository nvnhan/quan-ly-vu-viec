export const ak: BieuMau.Item[] = [
	{
		path: 'DinhGiaTaiSan',
		name: 'Định giá tài sản',
		childs: [
			{ path: 'BBGiaoYeuCauDinhGia.docx', name: 'Biên bản giao yêu cầu định giá', lanh_dao: true },
			{ path: 'YeuCauDinhGia.docx', name: 'Yêu cầu định giá', lanh_dao: true },
		],
	},
	{
		path: 'GiaHanDieuTra',
		name: 'Gia hạn điều tra',
		childs: [
			{ path: 'GiaHanDieuTraLan1.docx', name: 'Đề nghị gia hạn điều tra lần 1', lanh_dao: true },
			{ path: 'GiaHanDieuTraLan2.docx', name: 'Đề nghị gia hạn điều tra lần 2', lanh_dao: true },
			{ path: 'GiaHanDieuTraLan3.docx', name: 'Đề nghị gia hạn điều tra lần 3', lanh_dao: true },
		],
	},
	{
		path: 'GiamDinhBoSung',
		name: 'Giám định bổ sung',
		childs: [
			{ path: 'QDTrungCauGiamDinhBoSung.docx', name: 'Quyết định trưng cầu giám định bổ sung', lanh_dao: true },
		],
	},
	{
		path: 'GiamDinhLai',
		name: 'Giám định lại',
		childs: [{ path: 'QDTrungCauGiamDinhLai.docx', name: 'QĐ trưng cầu giám định lại', lanh_dao: true }],
	},
	{
		path: 'KhoiToVuAn',
		name: 'Khởi tố vụ án',
		childs: [
			{ path: 'B10CNguonTin.docx', name: 'Thông báo kết quả xác minh', lanh_dao: true },
			{ path: 'BCDXPhanCongPTTDTV.docx', name: 'Đề xuất phân công', lanh_dao: true },
			{ path: 'KeHoachDieuTra.docx', name: 'Kế hoạch điều tra', lanh_dao: true },
			{ path: 'KetThucAD.docx', name: 'Kết thúc vụ việc', lanh_dao: true },
			{ path: 'LapAK.docx', name: 'Lập vụ án', lanh_dao: true },
			{ path: 'QDKhoiToVuAn.docx', name: 'Quyết định khởi tố vụ án', lanh_dao: true },
			{ path: 'QDPhanCongDTVDieuTraVuAn.docx', name: 'Quyết định phân công điều tra viên', lanh_dao: true },
			{ path: 'QDPhanCongPTTDieuTraVuAn.docx', name: 'Quyết định phân công phó thủ trưởng', lanh_dao: true },
			{ path: 'ThongBaoKTVA.docx', name: 'Thông báo khởi tố vụ án', lanh_dao: true },
		],
	},
	{
		path: 'TBKetLuanDinhGia',
		name: 'Thông báo kết luận định giá',
		childs: [
			{ path: 'BBNhanKLDG.docx', name: 'Biên bản nhận Kết luận định giá', lanh_dao: true },
			{ path: 'BCDXVeViecTBKLDG.docx', name: 'Đề xuất thông báo định giá', lanh_dao: true },
		],
	},
	{
		path: 'TBKetLuanGiamDinhAD',
		name: 'Thông báo kết luận giám định',
		childs: [
			{ path: 'BBNhanKetLuanGiamDinh.docx', name: 'Biên bản nhận Kết luận giám định', lanh_dao: true },
			{ path: 'BCDXVeViecTBKLGD.docx', name: 'Đề xuất thông báo kết luận giám định', lanh_dao: true },
		],
	},
	{
		path: 'TrungCauGiamDinh',
		name: 'Trưng cầu giám định',
		childs: [
			{
				path: 'BBDongGoiNiemPhongGiaoNhanDoiTuonGiamDinh.docx',
				name: 'Biên bản đóng gói niêm phong giao nhận đối tượng giám định',
				lanh_dao: true,
			},
			{
				path: 'BBGiaoQDTrungCauGiamDinh.docx',
				name: 'Biên bản giao quyết định Trưng cầu giám định',
				lanh_dao: true,
			},
			{
				path: 'BBMoNiemPhongGiaoNhanDoiTuongGiamDinh.docx',
				name: 'Biên bản mở niêm phong giao nhận đối tượng giám định',
				lanh_dao: true,
			},
			{ path: 'QDTrungCauGiamDinh.docx', name: 'Quyết định trưng cầu giám định', lanh_dao: true },
		],
	},
	{
		path: 'YeuCauCoQuanToChucCungCapTaiLieuChungCuDuLieuDienTu',
		name: 'Yêu cầu CQ/TC cung cấp tài liệu, chứng cứ dữ liệu điện tử',
		childs: [
			{
				path: 'YeuCauCoQuanToChucCungCapDinhDanh.docx',
				name: 'Yêu cầu cơ quan tổ chức cung cấp thông tin về số định danh',
				lanh_dao: true,
			},
			{
				path: 'YeuCauCoQuanToChucCungCapGuiNganHang.docx',
				name: 'Yêu cầu ngân hàng cung cấp thông tin về thông tin tài khoản',
				lanh_dao: true,
			},
			{
				path: 'YeuCauCoQuanToChucCungCapGuiNhaMang.docx',
				name: 'Yêu cầu nhà mạng cung cấp thông tin về số thuê bao',
				lanh_dao: true,
			},
			{
				path: 'YeuCauCoQuanToChucCungCapTaiLieuChungCuDuLieuDienTu.docx',
				name: 'Yêu cầu cơ quan tổ chức cung cấp tài liệu chứng cứ dữ liệu điện tử',
				lanh_dao: true,
			},
		],
	},
];
