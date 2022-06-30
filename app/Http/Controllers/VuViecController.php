<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use App\Models\DonVi;
use App\Models\VuViec;
use Illuminate\Http\Request;

class VuViecController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = VuViec::query();
        if ($request->bat_dau && $request->ket_thuc)
            $query = $query->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);

        if (!empty($request->q)) {
            $query = $query->where('ten_vu_viec', 'LIKE', "%$request->q%");
        }

        if (!empty($request->loai_vu_viec)) {
            $tt = explode(",", $request->loai_vu_viec);
            $query = $query->whereIn('loai_vu_viec', $tt);
        }

        if (!empty($request->phan_loai_tin)) {
            $tt = explode(",", $request->phan_loai_tin);
            $query = $query->whereIn('phan_loai_tin', $tt);
        }

        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();

        // foreach ($objs as $key => $value) {
        //     $dvs = DonVi::whereIn('id', $value->dp_xay_ras)->with('quan_huyen')->get();
        //     // $huyen = array_column($dvs, 'quan_huyen');
        //     // \Log::debug($dvs);
        // }

        return $this->sendResponse($objs, "VuViec retrieved successfully", $total);
    }

    public function setVuViecFields(&$vuViec, Request $request)
    {
        $dp = [];       // Xa, phuong
        foreach ($request->sel_dp_xay_ra as $key => $value)
            if ($value['value']) $dp[] = $value['value'];
        $vuViec->dp_xay_ra = implode(',', $dp);
        // Gen Khu vuc xay ra
        $don_vis = DonVi::whereIn('id', $dp)->select('dia_phuong')->distinct()->get();

        if (count($dp) === 1) {
            $dv = DonVi::whereIn('id', $dp)->get();
            $vuViec->khu_vuc_xay_ra = $dv[0]->loai_don_vi . ' ' . $dv[0]->ten_don_vi . ' - ' . $don_vis[0]->ten_dia_phuong;  //  Xa/Phuong Quan/Huyen - Tinh/Thanh pho
        } else if (count($don_vis) === 1)
            $vuViec->khu_vuc_xay_ra = $don_vis[0]->ten_dia_phuong;  // Quan/Huyen - Tinh/Thanh pho
        else {
            $tmp = explode(' - ', $don_vis[0]->ten_dia_phuong ?? '')[1] ?? '';        // Tinh/Thanh pho
            for ($i = 1; $i < count($don_vis); $i++) {
                $tmp1 = explode(' - ', $don_vis[$i]->ten_dia_phuong)[1] ?? '';
                if ($tmp !== $tmp1) {
                    $tmp = 'Toàn quốc';
                    break;
                }
            }
            $vuViec->khu_vuc_xay_ra = $tmp;
        }

        $vuViec->id_dtv_chinh = $request->sel_dtv_chinh['value'] ?? null;
        $vuViec->id_can_bo_chinh = $request->sel_can_bo_chinh['value'] ?? null;
        $cb = CanBo::whereIn('id', [$vuViec->id_dtv_chinh, $vuViec->id_can_bo_chinh])->with('don_vi')->get();
        foreach ($cb as $c) {
            if (!empty($c->don_vi->id_don_vi_cha))
                $vuViec->id_don_vi = $c->don_vi->id_don_vi_cha;
            else
                $vuViec->id_don_vi = $c->id_don_vi;
            break;
        }

        if (str_contains($vuViec->thoi_diem_xay_ra, '00:00:00')) {
            $vuViec->thoi_diem_xay_ra = date('d/m/Y', strtotime($vuViec->thoi_diem_xay_ra));
        }
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
        $obj = new VuViec();
        $obj->fill($data);

        if ($request->ngay_cqdt && $request->loai_vu_viec === 'AĐ') {
            $obj->ngay_keo_dai = date('Y-m-d H:i:s', strtotime($request->ngay_cqdt . ' +20 days'));
            $obj->ngay_ket_thuc_1 = date('Y-m-d H:i:s', strtotime($request->ngay_cqdt . ' +2 months'));
        }

        $obj->nguoi_tao = $request->user()->id;
        self::setVuViecFields($obj, $request);
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function show(VuViec $vuViec)
    {
        $result = [];
        $dvs = DonVi::whereIn('id', $vuViec->dp_xay_ras)->get();
        foreach ($dvs as $key => $dv)
            $result[] = (object)[
                'value' => $dv->id,
                'label' => ($dv->loai_don_vi ?? '') . ' ' . ($dv->ten_don_vi ?? '') . ' - ' . ($dv->ten_dia_phuong ?? '')
            ];

        if ($vuViec->loai_vu_viec === 'AĐ') {
            $nguoi_to_giac = $vuViec->vu_viec_nguois()->where('tu_cach_to_tung', 1)->count();
            if ($nguoi_to_giac <= 0)
                $vuViec->canh_bao = "Vụ việc này hiện chưa có thông tin người tố giác";
        } else if ($vuViec->loai_vu_viec === 'AK') {
            $bi_can = $vuViec->vu_viec_nguois()->where('tu_cach_to_tung', 2)->count();
            if ($bi_can <= 0)
                $vuViec->canh_bao = "Vụ việc này hiện chưa có thông tin bị can";
        }
        $vuViec->sel_dp_xay_ra = $result;
        return $this->sendResponse($vuViec, "VuViec retrieved successfully");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VuViec $vuViec)
    {
        $user = $request->user();
        $data = $request->all();
        $model = VuViec::find($vuViec->id);
        if ($user->admin || $user->id == $model->id) {
            $model->fill($data);
            self::setVuViecFields($model, $request);
            $model->save();
            $model->refresh();
            return $this->sendResponse($model, "Cập nhật thành công");
        } else return $this->sendError("Không thể sửa thông tin vụ việc");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(VuViec $vuViec)
    {
        $user = $request->user();
        $model = VuViec::find($id);
        if ($user->admin || $user->id == $model->id) {
            $model->delete();
            return $this->sendResponse('', "Xóa thành công vụ việc");
        } else return $this->sendError("Không thể xóa vụ việc");
    }
}
