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
            $vu_viec->whereBetween('ngay_cqdt', [$request->bat_dau, $request->ket_thuc]);
            $cong_viec->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
            $cong_van->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
            $tai_lieu->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);
        }

        $id_don_vi = -1;
        if ($request->user()->quan_tri)
            if ($request->id_don_vi)
                $id_don_vi = $request->id_don_vi;
            else $id_don_vi = 0;
        else if ($request->user()->chi_huy)
            $id_don_vi = $request->user()->id_don_vi;
        // Chọn Đội
        if ($id_don_vi > 0) {
            $vu_viec->where('id_don_vi', $id_don_vi);

            $dvs = DonVi::where('id_don_vi_cha', $id_don_vi)->pluck('id');
            $dvs[] = $id_don_vi;
            $can_bo->whereIn('id_don_vi', $dvs);

            $all_can_bo = (clone $can_bo)->pluck('id');
            $all_vu_viec = VuViec::where('id_don_vi', $id_don_vi)->pluck('id');
            $cong_viec->whereIn('id_vu_viec', $all_vu_viec)->where(fn ($q) =>  $q
                ->whereIn('nguoi_tao', $all_can_bo)
                ->orWhereIn('id_can_bo', $all_can_bo));
            $cong_van->whereIn('id_vu_viec', $all_vu_viec);
            $tai_lieu->whereIn('id_vu_viec', $all_vu_viec);
        } else if ($id_don_vi === -1) {        // Cán bộ
            $vv = CongViec::where('id_can_bo', $request->user()->id)->pluck('id_vu_viec');
            $vu_viec->where(fn ($q) =>  $q
                ->where('id_dtv_chinh', $request->user()->id)
                ->orWhere('id_can_bo_chinh', $request->user()->id)
                ->orWhere('nguoi_tao', $request->user()->id)
                ->orWhereIn('id', $vv));

            $all_vu_viec = (clone $vu_viec)->pluck('id');
            $cong_viec->where('id_can_bo', $request->user()->id);
            $cong_van->whereIn('id_vu_viec', $all_vu_viec);
            $tai_lieu->whereIn('id_vu_viec', $all_vu_viec);

            $dvs = DonVi::where('id_don_vi_cha', $request->user()->id_don_vi)->pluck('id');
            $dvs[] = $request->user()->id_don_vi;
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
        // Artisan::call('migrate');

        $moi_giao = CongViec::where('id_can_bo', $request->user()->id)->whereIn('trang_thai', [1, 2, 3, 7])->count();
        $data = [
            'moi_giao' => $moi_giao
        ];

        return $this->sendResponse($data, 'SoLieuCongViec retrieved successfully');
    }
}
