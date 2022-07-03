<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Report;
use App\Models\CanBo;
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

            if ($request->lanh_dao)
                $lanh_dao = CanBo::find($request->lanh_dao);
            else $lanh_dao = new CanBo();

            if ($request->lanh_dao_1)
                $lanh_dao_1 = CanBo::find($request->lanh_dao_1);
            else $lanh_dao_1 = new CanBo();

            $huyen = QuanHuyen::find(env('QUAN_HUYEN_SU_DUNG'));

            $data = [
                'Huyen' => $huyen->ten_huyen,
                'HUYEN' => mb_strtoupper($huyen->ten_huyen),
                'Loai' => $huyen->loai,
                'LOAI' => mb_strtoupper($huyen->loai),
                'LOAICQDT' => (($vu_viec->don_vi->loai_co_quan ?? "") === 'ANĐT') ? "AN NINH ĐIỀU TRA" : 'CẢNH SÁT ĐIỀU TRA',
                'LoaiCQDT' => (($vu_viec->don_vi->loai_co_quan ?? "") === 'ANĐT') ? "An ninh điều tra" : 'Cảnh sát điều tra',
                'MaCQDT' => $vu_viec->don_vi->loai_co_quan ?? '',
                'MaDoi' => $vu_viec->don_vi->ma_don_vi ?? '',

                'NgayCQDT' => date('d/m/Y', strtotime($vu_viec->ngay_cqdt)),
                'Tinh' => $huyen->ten_tinh,
                'TINH' => mb_strtoupper($huyen->ten_tinh),
                'DonViSuDung' => $huyen->loai . ' ' . $huyen->ten_huyen_tinh,

                'NhanXung' => $nguoi->nhan_xung ?? '',
                'HoTen' => $nguoi->ho_ten ?? '',
                'NamSinh' => $nguoi->nam_sinh ?? '',
                'HKTT' => $nguoi->ten_thuong_tru ?? '',
                'DPThuongTru' =>  '',

                'DonViChuyenTin' => $vu_viec->don_vi_chuyen_tin,
                'PhanLoaiTin' => $vu_viec->phan_loai_tin,
                'PHANLOAITIN' => mb_strtoupper($vu_viec->phan_loai_tin),
                'NoiDungTomTat' => $vu_viec->noi_dung_tom_tat,
                'NoiXayRa' => $vu_viec->noi_xay_ra,
                'DPXayRa' =>  $vu_viec->khu_vuc_xay_ra,
                'NgayXayRa' => $vu_viec->thoi_diem_xay_ra,

                'PhuongThucPhamToi' => $vu_viec->phuong_thuc_pham_toi,
                'ToiDanh' => substr($vu_viec->toi_danh->toi_danh ?? '', 4),
                'MaToiDanh' => $vu_viec->ma_toi_danh,
                'NgayKTVA' => date('d/m/Y', strtotime($vu_viec->ngay_khoi_to)),

                'SoHoSo' => $vu_viec->so_ho_so,

                'ChucDanhLanhDao' => $lanh_dao->chuc_danh_lanh_dao,
                'CHUCDANHLANHDAO' => mb_strtoupper($lanh_dao->chuc_danh_lanh_dao),
                'CapBacLanhDao' => $lanh_dao->ten_cap_bac,
                'TenLanhDao' => $lanh_dao->ho_ten,
                'TENLANHDAO' => mb_strtoupper($lanh_dao->ho_ten),

                'ChucDanhLanhDao1' => $lanh_dao_1->chuc_danh_lanh_dao,
                'CHUCDANHLANHDAO1' => mb_strtoupper($lanh_dao_1->chuc_danh_lanh_dao),
                'CapBacLanhDao1' => $lanh_dao_1->ten_cap_bac,
                'TenLanhDao1' => $lanh_dao_1->ho_ten,
                'TENLANHDAO1' => mb_strtoupper($lanh_dao_1->ho_ten),

                'DTVChinh' => $vu_viec->dtv_chinh->ho_ten ?? '',
                'CBChinh' => $vu_viec->can_bo_chinh->ho_ten ?? '',
                'TenDonVi' => $vu_viec->don_vi->ten_don_vi_day_du ?? '',
                'CoQuanHoSo' => "Phòng Hồ sơ - CA " . ($huyen->tinh->loai ?? '') . ' ' . $huyen->ten_tinh,
            ];
            return Report::docx_report($request->full_path, $data);
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
    }
}
