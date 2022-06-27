<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Report;
use App\Models\CanBo;
use App\Models\QuanHuyen;
use App\Models\VuViec;
use App\Models\VuViecNguoi;

class BaoCaoController extends Controller
{
    public function index(Request $request)
    {
        if ($request->vu_viec && $request->type && $request->lanh_dao) {
            $vu_viec = VuViec::find($request->vu_viec);
            $nguoi_to_giac = VuViecNguoi::where('id_vu_viec', $request->vu_viec)->where('tu_cach_to_tung', 1)->first();
            $lanh_dao = CanBo::find($request->lanh_dao);
            $huyen = QuanHuyen::find(env('QUAN_HUYEN_SU_DUNG'));
            $data = [
                'Huyen' => $huyen->ten_huyen,
                'HUYEN' => mb_strtoupper($huyen->loai . ' ' . $huyen->ten_huyen),
                'MaCQDT' => $vu_viec->don_vi->loai_co_quan ?? '',
                'MaDoi' => $vu_viec->don_vi->ma_don_vi ?? '',
                'NgayCQDT' => date('d/m/Y', strtotime($vu_viec->ngay_cqdt)),
                'Tinh' => $huyen->ten_tinh,
                'TINH' => mb_strtoupper($huyen->tinh->loai . ' ' . $huyen->ten_tinh),
                'DonViSuDung' => $huyen->loai . ' ' . $huyen->ten_huyen_tinh,
                'NhanXung' => $nguoi_to_giac->nguoi->nhan_xung,
                'HoTen' => $nguoi_to_giac->nguoi->ho_ten ?? '',
                'NamSinh' => $nguoi_to_giac->nguoi->nam_sinh ?? '',
                'Hktt' => $nguoi_to_giac->nguoi->ten_thuong_tru ?? '',
                'NoiDungTomTat' => $vu_viec->noi_dung_tom_tat,
                'NoiXayRa' => $vu_viec->noi_xay_ra,
                'DPXayRa' => "địa bàn " . $vu_viec->khu_vuc_xay_ra,
                'NgayXayRa' => $vu_viec->thoi_diem_xay_ra,
                'CHUCDANHLANHDAO' => mb_strtoupper($lanh_dao->chuc_danh_lanh_dao),
                'CapBacLanhDao' => $lanh_dao->ten_cap_bac,
                'TenLanhDao' => $lanh_dao->ho_ten,
                'TENLANHDAO' => mb_strtoupper($lanh_dao->ho_ten),
                'DTVChinh' => $vu_viec->dtv_chinh->ho_ten ?? '',
                'CBChinh' => $vu_viec->can_bo_chinh->ho_ten ?? '',
            ];
            return Report::docx_report($request->type, $data);
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
    }
}
