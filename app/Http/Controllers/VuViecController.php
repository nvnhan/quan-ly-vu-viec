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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $data = $request->all();
        // $obj = new DinhDanh();
        // $obj->fill($data);

        // $obj->username = $request->user()->username;
        // $obj->slug = Classes::slugify($obj->ho_ten);
        // $obj->ho_ten = mb_strtoupper($obj->ho_ten);
        // $obj->save();
        // return $this->sendResponse($obj, "Thêm mới thành công");
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
        // $user = $request->user();
        // $data = $request->all();
        // $model = DinhDanh::find($id);
        // if ($user->admin || $user->username == $model->username) {
        //     $model->fill($data);
        //     $model->slug = Classes::slugify($model->ho_ten);
        //     $model->ho_ten = mb_strtoupper($model->ho_ten);
        //     $model->save();
        //     return $this->sendResponse($model, "Cập nhật thành công");
        // } else return $this->sendError("Không thể sửa định danh");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VuViec  $vuViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(VuViec $vuViec)
    {
        // $user = $request->user();
        // $model = DinhDanh::find($id);
        // if ($user->admin || $user->username == $model->username) {
        //     $model->delete();
        //     return $this->sendResponse('', "Xóa thành công định danh");
        // } else return $this->sendError("Không thể xóa định danh");
    }
}
