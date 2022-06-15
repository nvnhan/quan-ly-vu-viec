<?php

namespace App\Http\Controllers;

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

        return $this->sendResponse($objs, "VuViec retrieved successfully", $total);
    }

    public function setVuViecFields(&$vuViec, Request $request)
    {
        $vuViec->id_dp_xay_ra = $request->sel_dp_xay_ra['value'] ?? null;
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

        $obj->nguoi_tao = $request->user()->id;
        self::setVuViecFields($obj, $request);
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
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
