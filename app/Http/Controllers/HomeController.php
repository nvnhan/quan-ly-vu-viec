<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use App\Models\CongVan;
use App\Models\CongViec;
use App\Models\DonVi;
use App\Models\TaiLieu;
use App\Models\VuViec;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class HomeController extends BaseController
{
    //
    public function index(Request $request)
    {
        $vu_viec = VuViec::query();
        $cong_viec = CongViec::query();
        $cong_van = CongVan::query();
        $tai_lieu = TaiLieu::query();
        $can_bo = CanBo::where('chuc_vu', '<=', 4); // Tu giup viec tro xuong

        if ($request->bat_dau && $request->ket_thuc) {
            $vu_viec->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
            $cong_viec->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
            $cong_van->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
            $tai_lieu->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
        }

        // Chọn Đội
        if ($request->id_don_vi) {
            $vu_viec->where('id_don_vi', $request->id_don_vi);
            $all_vu_viec = VuViec::where('id_don_vi', $request->id_don_vi)->pluck('id');

            $cong_viec->whereIn('id_vu_viec', $all_vu_viec);
            $cong_van->whereIn('id_vu_viec', $all_vu_viec);
            $tai_lieu->whereIn('id_vu_viec', $all_vu_viec);

            $dvs = DonVi::where('id_don_vi_cha', $request->id_don_vi)->pluck('id');
            $dvs[] = $request->id_don_vi;
            $can_bo->whereIn('id_don_vi', $dvs);
        }

        $data = [
            'vu_viec' => $vu_viec->count(),
            'can_bo' => $can_bo->count(),
            'cong_viec' => $cong_viec->count(),
            'cong_van' => $cong_van->count(),
            'tai_lieu' => $tai_lieu->count(),
        ];

        $cong_viec_chi_tiet = [];
        $cv = clone $cong_viec;
        $cong_viec_chi_tiet['hoan_thanh_dung_han'] = $cv->where('trang_thai', 8)->where('ngay_ket_thuc', '<=', 'ngay_het_han')->count();
        $cv = clone $cong_viec;
        $cong_viec_chi_tiet['hoan_thanh_qua_han'] = $cv->where('trang_thai', 8)
            ->where('ngay_ket_thuc', '>', 'ngay_het_han')
            ->count();
        $cv = clone $cong_viec;
        $cong_viec_chi_tiet['cho_danh_gia'] = $cv->whereIn('trang_thai', [4, 5])
            ->count();
        $cv = clone $cong_viec;
        $cong_viec_chi_tiet['huy'] = $cv->where('trang_thai', 6)
            ->count();
        $cv = clone $cong_viec;
        $cong_viec_chi_tiet['thuc_hien'] = $cv->whereNotIn('trang_thai', [4, 5, 6, 8])
            ->count();
        $data['cong_viec_chi_tiet'] = $cong_viec_chi_tiet;

        // Can Bo xuat sac
        $can_bos = $can_bo->with('cong_viec_nhans')->get();
        $can_bo_xuat_sac = [];
        foreach ($can_bos as $key => $cb) {
            $tong_cong_viec = $cb->cong_viec_nhans()
                ->where('trang_thai', '!=', 6)
                ->whereBetween('ngay_giao', [$request->bat_dau, $request->ket_thuc])->count();
            $cong_viec_hoan_thanh = $cb->cong_viec_nhans()
                ->where('trang_thai', 8)
                ->whereBetween('ngay_giao', [$request->bat_dau, $request->ket_thuc])->count();
            $can_bo_xuat_sac[] = (object)[
                'id' => $cb->id,
                'ho_ten' => $cb->ho_ten,
                'tong_cong_viec' => $tong_cong_viec,
                'cong_viec_hoan_thanh' => $cong_viec_hoan_thanh,
            ];
        }
        $data['can_bo_xuat_sac'] = $can_bo_xuat_sac;

        return $this->sendResponse($data, 'Home retrieved successfully');
    }

    public function so_lieu_cong_viec(Request $request)
    {
        Artisan::call('migrate');

        $moi_giao = CongViec::where('id_can_bo', $request->user()->id)->whereIn('trang_thai', [1, 2, 3, 7])->count();
        $data = [
            'moi_giao' => $moi_giao
        ];

        return $this->sendResponse($data, 'SoLieuCongViec retrieved successfully');
    }
}
