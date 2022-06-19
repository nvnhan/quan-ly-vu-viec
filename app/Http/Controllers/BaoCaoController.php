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
                'HUYEN' => mb_strtoupper($huyen->ten_huyen),
                'MaCQDT' => str_contains($lanh_dao->chuc_danh_lanh_dao, 'CSĐT') ? 'CSĐT' : 'ANĐT',
                'NgayCQDT' => date('d/m/Y', strtotime($vu_viec->ngay_cqdt)),
                'Tinh' => $huyen->ten_tinh,
                'NhanXung' => $nguoi_to_giac->nguoi->gioi_tinh == 'Nam' ? 'Anh' : 'Chị',
                'HoTen' => $nguoi_to_giac->nguoi->ho_ten ?? '',
                'NamSinh' => $nguoi_to_giac->nguoi->nam_sinh ?? '',
                'Hktt' => $nguoi_to_giac->nguoi->ten_thuong_tru ?? '',
                'NoiDungTomTat' => $vu_viec->noi_dung_tom_tat,
                'NoiXayRa' => $vu_viec->noi_xay_ra,
                'DPXayRa' => $vu_viec->ten_dp_xay_ra,
                'NgayXayRa' => $vu_viec->thoi_diem_xay_ra,
                'CHUCDANHLANHDAO' => mb_strtoupper($lanh_dao->chuc_danh_lanh_dao),
                'CapBacLanhDao' => $lanh_dao->ten_cap_bac,
                'TenLanhDao' => $lanh_dao->ho_ten
            ];
            return Report::docx_report($request->type, $data);
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
    }
}
