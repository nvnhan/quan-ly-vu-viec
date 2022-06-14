<?php

namespace App\Http\Controllers;

use App\Models\NhomCongViec;
use Illuminate\Http\Request;

class NhomCongViecController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $objs = NhomCongViec::all();
        return $this->sendResponse($objs, 'NhomCongViec retrieved successfully', count($objs));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $obj = new NhomCongViec();
        $obj->nhom_cong_viec = $request->nhom_cong_viec;
        $obj->save();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NhomCongViec  $nhomCongViec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NhomCongViec $nhomCongViec)
    {
        $nhomCongViec->nhom_cong_viec = $request->nhom_cong_viec;
        $nhomCongViec->save();
        return $this->sendResponse($nhomCongViec, "Cập nhật thành công");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NhomCongViec  $nhomCongViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(NhomCongViec $nhomCongViec)
    {
        $nhomCongViec->delete();
        return $this->sendResponse('', 'Xóa thành công nhóm công việc');
    }
}
