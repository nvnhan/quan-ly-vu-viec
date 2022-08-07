<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Report;
use App\Models\CanBo;
use App\Models\DonVi;
use App\Models\Nguoi;
use App\Models\QuanHuyen;
use App\Models\VuViec;
use App\Models\VuViecNguoi;

class BaoCaoController extends Controller
{
    public function index(Request $request)
    {
        if ($request->vu_viec && $request->full_path) {
            $vu_viec = VuViec::find($request->vu_viec);

            if ($request->nguoi)
                $nguoi = Nguoi::find($request->nguoi);
            else $nguoi = new Nguoi();

            $vu_viec_nguoi = VuViecNguoi::where('id_vu_viec', $request->vu_viec)
                ->where('id_nguoi', $request->nguoi)->first();
            if (!$vu_viec_nguoi)
                $vu_viec_nguoi = new VuViecNguoi();

            if ($request->lanh_dao)
                $lanh_dao = CanBo::find($request->lanh_dao);
            else $lanh_dao = new CanBo();

            if ($request->lanh_dao_1)
                $lanh_dao_1 = CanBo::find($request->lanh_dao_1);
            else $lanh_dao_1 = new CanBo();

            $don_vi = $vu_viec->don_vi;
            if (!$don_vi)
                $don_vi = new DonVi();
            if ($don_vi->don_vi_cha)
                $don_vi = $don_vi->don_vi_cha;

            $huyen = QuanHuyen::find(env('QUAN_HUYEN_SU_DUNG'));

            $data = [
                'Huyen' => $huyen->ten_huyen,
                'HUYEN' => mb_strtoupper($huyen->ten_huyen),
                'Loai' => $huyen->loai,
                'LOAI' => mb_strtoupper($huyen->loai),
                'LOAICQDT' => (($don_vi->loai_co_quan ?? "") === 'ANĐT') ? "AN NINH ĐIỀU TRA" : 'CẢNH SÁT ĐIỀU TRA',
                'LoaiCQDT' => (($don_vi->loai_co_quan ?? "") === 'ANĐT') ? "An ninh điều tra" : 'Cảnh sát điều tra',
                'MaCQDT' => $don_vi->loai_co_quan ?? '',
                'MaDoi' => $don_vi->ma_don_vi ?? '',

                'NgayCQDT' => date('d/m/Y', strtotime($vu_viec->ngay_cqdt)),
                'Tinh' => $huyen->ten_tinh,
                'TINH' => mb_strtoupper($huyen->ten_tinh),
                'DonViSuDung' => $huyen->loai . ' ' . $huyen->ten_huyen_tinh,

                'SoPhanCong' => $vu_viec->so_phan_cong,
                'NgayPhanCong' => date('d/m/Y', strtotime($vu_viec->ngay_phan_cong)),
                'NgayKeoDai' => date('d/m/Y', strtotime($vu_viec->ngay_keo_dai)),
                'NgayKetThuc1' => date('d/m/Y', strtotime($vu_viec->ngay_ket_thuc_1)),
                'NgayGiaHanXacMinh' => date('d/m/Y', strtotime($vu_viec->ngay_gia_han_xac_minh)),
                'NgayKetThuc2' => date('d/m/Y', strtotime($vu_viec->ngay_ket_thuc_2)),

                'NhanXung' => $nguoi->nhan_xung ?? '',
                'HoTen' => $nguoi->ho_ten ?? '',
                'HOTEN' => mb_strtoupper($nguoi->ho_ten ?? ''),
                'TenKhac' => $nguoi->ten_khac ?? '',
                'GioiTinh' => $nguoi->gioi_tinh ?? '',

                'NoiSinh' => $nguoi->noi_sinh ?? '',
                'HKTT' => $nguoi->thuong_tru ?? '',
                'DPThuongTru' => $nguoi->dp_thuong_tru->ten_xa_phuong ?? '',
                'TamTru' => $nguoi->tam_tru,
                'DPTamTru' => $nguoi->dp_tam_tru->ten_xa_phuong ?? '',
                'NoiOHienNay' => $nguoi->noi_o_hien_nay,
                'DPNoiO' => $nguoi->dp_noi_o_hien_nay->ten_xa_phuong ?? '',

                'NgaySinh' => $nguoi->ngay_sinh ?? '...',
                'ThangSinh' => $nguoi->thang_sinh ?? '...',
                'NamSinh' => $nguoi->nam_sinh ?? '',
                'GiayDinhDanh' => !empty($nguoi->so_dinh_danh) ? "Số " . $nguoi->giay_dinh_danh : 'Số CCCD/CMND/Hộ chiếu',
                'SoDinhDanh' => $nguoi->so_dinh_danh ?? '....................',
                'NgayCap' => !empty($nguoi->so_dinh_danh) && !empty($nguoi->ngay_cap) ? date('d/m/Y', strtotime($nguoi->ngay_cap)) : '.../.../......',
                'NoiCap' => $nguoi->noi_cap ?? '....................',

                'QuocTich' => $nguoi->quoc_tich,
                'DanToc' => $nguoi->dan_toc,
                'TonGiao' => $nguoi->ton_giao,
                'NgheNghiep' => $nguoi->nghe_nghiep,
                'SDT' => $nguoi->sdt,
                'TATS' => $nguoi->tats,

                'HoTenBo' => $nguoi->ho_ten_bo,
                'HoTenMe' => $nguoi->ho_ten_me,
                'HoTenVoChong' => $nguoi->ho_ten_vo_chong,
                'NamSinhBo' => $nguoi->nam_sinh_bo,
                'NamSinhMe' => $nguoi->nam_sinh_me,
                'NamSinhVoChong' => $nguoi->nam_sinh_vo_chong,

                'HanhVi' => $vu_viec_nguoi->hanh_vi,
                'TuCachToTung' => $vu_viec_nguoi->ten_tu_cach_to_tung,
                'MaTuCachToTung' => $vu_viec_nguoi->tu_cach_to_tung === 7 ? '56' : '',
                'THBat' => $vu_viec_nguoi->truong_hop_bat,
                'NgayBat' => date('d/m/Y', strtotime($vu_viec_nguoi->ngay_bat)),

                'DonViChuyenTin' => $vu_viec->don_vi_chuyen_tin,
                'PhanLoaiTin' => $vu_viec->phan_loai_tin,
                'PHANLOAITIN' => mb_strtoupper($vu_viec->phan_loai_tin),
                'NoiDungTomTat' => $vu_viec->noi_dung_tom_tat,
                'NoiXayRa' => $vu_viec->noi_xay_ra,
                'DPXayRa' =>  $vu_viec->khu_vuc_xay_ra,
                'NgayXayRa' => mb_strtolower($vu_viec->thoi_diem_xay_ra),

                'PhuongThucPhamToi' => $vu_viec->phuong_thuc_pham_toi ?? "Chưa phân loại",
                'ToiDanh' => str_replace("Tội ", '', $vu_viec->toi_danh->toi_danh ?? ''),
                'MaToiDanh' => $vu_viec->ma_toi_danh,
                'NgayKTVA' => date('d/m/Y', strtotime($vu_viec->ngay_khoi_to)),

                'ChucDanhLanhDao' => $lanh_dao->chuc_danh_lanh_dao,
                'CHUCDANHLANHDAO' => mb_strtoupper($lanh_dao->chuc_danh_lanh_dao),
                'CapBacLanhDao' => $lanh_dao->ten_cap_bac,
                'ChucVuLanhDao' => $lanh_dao->ten_chuc_vu,
                'CHUCVULANHDAO' => mb_strtoupper($lanh_dao->ten_chuc_vu),
                'TenLanhDao' => $lanh_dao->ho_ten,
                'TENLANHDAO' => mb_strtoupper($lanh_dao->ho_ten),

                'ChucDanhLanhDao1' => $lanh_dao_1->chuc_danh_lanh_dao,
                'CHUCDANHLANHDAO1' => mb_strtoupper($lanh_dao_1->chuc_danh_lanh_dao),
                'CapBacLanhDao1' => $lanh_dao_1->ten_cap_bac,
                'TenLanhDao1' => $lanh_dao_1->ho_ten,
                'TENLANHDAO1' => mb_strtoupper($lanh_dao_1->ho_ten),

                'DTVChinh' => $vu_viec->dtv_chinh->ho_ten ?? '',
                'SdtDtv' => $vu_viec->dtv_chinh->sdt ?? '',
                'CBChinh' => $vu_viec->can_bo_chinh->ho_ten ?? '',
                'SdtCanBo' => $vu_viec->can_bo_chinh->sdt ?? '',
                // 'CanBoChinh' => $vu_viec->can_bo_chinh->ho_ten ?? '',
                'CapBacCanBo' => $vu_viec->can_bo_chinh->ten_cap_bac ?? '',
                'ChucVuCanBo' => $vu_viec->can_bo_chinh->ten_chuc_vu ?? '',

                'SoHoSo' => $vu_viec->so_ho_so,
                'TenDonVi' => $don_vi->ten_don_vi ?? '',
                'CoQuanHoSo' => "Phòng Hồ sơ - CA " . ($huyen->tinh->loai ?? '') . ' ' . $huyen->ten_tinh,
            ];
            return Report::docx_report($request->full_path, $data);
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
    }
}
