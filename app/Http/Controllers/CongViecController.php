<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use App\Models\CongViec;
use App\Models\CongViecKhoiTao;
use App\Models\DonVi;
use App\Models\VuViec;
use Illuminate\Http\Request;
use phpseclib3\Crypt\RC2;

class CongViecController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = CongViec::query();
        // Cong viec cua toi
        if ($request->id_can_bo) {
            $query = $query->where('id_can_bo', $request->id_can_bo);

            // Trong khoang thoi gian hoaac vu viec can chu y
            if ($request->bat_dau && $request->ket_thuc)
                $query = $query->where(fn ($q) =>  $q
                    ->whereBetween('ngay_giao', [$request->bat_dau, $request->ket_thuc])
                    ->orWhereIn('trang_thai', [1, 2, 3, 5]));
        } else {
            if ($request->bat_dau && $request->ket_thuc)
                $query = $query->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);

            if ($request->nguoi_tao)
                $query = $query->where('nguoi_tao', $request->nguoi_tao);
            // Mac dinh: show tat ca cong viec
            else {
                if ($request->user()->chuc_vu === 0)        // Neu la can bo
                    $query = $query->where(fn ($q) =>  $q
                        ->where('nguoi_tao', $request->user()->id)
                        ->orWhere('id_can_bo', $request->user()->id));
                else if ($request->user()->chuc_vu <= 3) {      // Chi huy
                    $don_vi_truc_thuoc = DonVi::where('id', $request->user()->id_don_vi)->orWhere('id_don_vi_cha', $request->user()->id_don_vi)->pluck('id');
                    $can_bo = CanBo::whereIn('id_don_vi', $don_vi_truc_thuoc)->pluck('id');
                    $query = $query->where(fn ($q) =>  $q
                        ->whereIn('nguoi_tao', $can_bo)
                        ->orWhereIn('id_can_bo', $can_bo));
                }
                // Neu la lanh dao thi show het cua can bo
            }
        }

        if ($request->vu_viec)
            $query = $query->where('id_vu_viec', $request->vu_viec);
        if ($request->trang_thai)
            $query = $query->whereIn('trang_thai', explode(',', $request->trang_thai));
        if ($request->muc_do_uu_tien)
            $query = $query->whereIn('muc_do_uu_tien', explode(',', $request->muc_do_uu_tien));
        if ($request->ten_cong_viec)
            $query = $query->where('ten_cong_viec', 'LIKE', "%$request->ten_cong_viec%");

        $query = $query->orderBy('trang_thai')->orderBy('muc_do_uu_tien', 'DESC')->orderBy('ngay_het_han', 'DESC');
        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();
        return $this->sendResponse($objs, 'CongViec retrieved successfully', $total);
    }

    public static function setCongViecFields(&$congViec, Request $request)
    {
        if ($request->user()->chuc_vu !== 0)
            $congViec->id_can_bo = $request->sel_can_bo['value'] ?? null;
        else $congViec->id_can_bo = $request->user()->id;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $congViec = new CongViec();
        $congViec->fill($data);
        $congViec->nguoi_tao = $request->user()->id;
        self::setCongViecFields($congViec, $request);
        if ($congViec->id_can_bo) {
            $congViec->ngay_giao = now();
            $congViec->trang_thai = 1; /// mỚi giao
        }

        $congViec->save();
        $congViec->refresh();

        return $this->sendResponse($congViec, 'Thêm mới thành công');
    }

    public function them_khoi_tao(Request $request)
    {
        $vu_viec = $request->id_vu_viec;
        if ($vu_viec) {
            $vv = VuViec::find($vu_viec);
            if ($vv) {
                $cvkt = CongViecKhoiTao::where('loai_vu_viec', $vv->loai_vu_viec)->get();
                foreach ($cvkt as $key => $value) {
                    $cv = new CongViec();
                    $cv->id_vu_viec = $vu_viec;
                    $cv->nguoi_tao = $request->user()->id;
                    $cv->id_nhom_cong_viec = $value->id_nhom_cong_viec;
                    $cv->ten_cong_viec = $value->ten_cong_viec;

                    if ($value->thoi_han != '') {
                        $ngay = substr($value->thoi_han, -2, 2);
                        $thang = substr($value->thoi_han, -4, -2);
                        $s = "+$thang months $ngay days";
                        if (empty($thang))
                            $s = "+$ngay days";
                        $cv->ngay_het_han = date('Y-m-d H:i:s', strtotime($s));
                    }

                    if ($vv->id_can_bo_chinh) {
                        $cv->id_can_bo = $vv->id_can_bo_chinh;
                        $cv->trang_thai = 1;
                        $cv->ngay_giao = now();
                    }
                    $cv->save();
                }
                $result = CongViec::where('id_vu_viec', $vu_viec)->get();
                return $this->sendResponse($result, 'Đã thêm các công việc khởi tạo');
            }
        }
        return $this->sendError('You are not allowed to access this data', [], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function sua_trang_thai(Request $request, CongViec $congViec)
    {
        $congViec->fill($request->all());
        switch ($request->trang_thai) {
            case 3:
                $congViec->ngay_bat_dau = now();
                break;
            case 4:
                $congViec->ngay_ket_thuc = now();
                break;
            case 6:
                $congViec->ngay_xac_nhan = now();
                break;
            case 5:
                $congViec->ngay_ket_thuc = null; // Chua dat
                break;
            case 7:
                $congViec->ngay_hoan_thanh = now();
                break;
        }
        $congViec->save();
        $congViec->refresh();
        return $this->sendResponse($congViec, "Cập nhật trạng thái thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CongViec $congViec)
    {
        $data = $request->all();
        $congViec->fill($data);
        self::setCongViecFields($congViec, $request);

        if ($congViec->trang_thai == 0 && $congViec->id_can_bo) {
            $congViec->ngay_giao = now();
            $congViec->trang_thai = 1; /// mỚi giao
        }
        $congViec->save();
        $congViec->refresh();

        return $this->sendResponse($congViec, 'Cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(CongViec $congViec)
    {
        $congViec->delete();
        return $this->sendResponse('', 'Xóa thành công vai trò của người trong vụ việc');
    }

    public function bao_cao_cong_viec(Request $request)
    {
        $can_bo = CanBo::where('chuc_vu', '<=', 4)->with('cong_viec_nhans')->get();      // Tu giup viec tro xuong
        foreach ($can_bo as $key => $cb) {
            $cb->cv_hoan_thanh_dung_han = $cb->cong_viec_nhans
                ->where('trang_thai', 7)
                ->where('ngay_ket_thuc', '<=', 'ngay_het_han')
                ->count();
            $cb->cv_hoan_thanh_qua_han = $cb->cong_viec_nhans
                ->where('trang_thai', 7)
                ->where('ngay_ket_thuc', '>', 'ngay_het_han')
                ->count();
            $cb->cv_cho_danh_gia = $cb->cong_viec_nhans
                ->whereIn('trang_thai', [4, 6])
                ->count();
            $cb->cv_huy = $cb->cong_viec_nhans
                ->where('trang_thai', 8)
                ->count();
            $cb->cv_thuc_hien = $cb->cong_viec_nhans
                ->whereNotIn('trang_thai', [4, 6, 7, 8])
                ->count();
            $date = Date('Y-m-d');
            $cb->cv_muon = CongViec::where('id_can_bo', $cb->id)
                ->where('trang_thai', '!=', 8)
                ->where(fn ($query) => $query
                    ->where(fn ($q) => $q
                        ->whereNull('ngay_ket_thuc')
                        ->whereRaw("ngay_het_han < '$date'"))
                    ->orWhereRaw("ngay_ket_thuc > ngay_het_han"))
                ->count();
        }

        return $this->sendResponse($can_bo, 'Successfull', count($can_bo));
    }
}
