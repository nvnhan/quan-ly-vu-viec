<?php

namespace App\Http\Controllers;

use App\Models\CongViecKhoiTao;
use Illuminate\Http\Request;

class CongViecKhoiTaoController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $objs = CongViecKhoiTao::all();
        return $this->sendResponse($objs, 'CongViecKhoiTao retrieved successfully', count($objs));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $obj = new CongViecKhoiTao();
        $obj->fill($request->all());
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, 'Thêm mới thành công');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CongViecKhoiTao  $congViecKhoiTao
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CongViecKhoiTao $congViecKhoiTao)
    {
        $congViecKhoiTao->fill($request->all());
        $congViecKhoiTao->save();
        return $this->sendResponse($congViecKhoiTao, "Cập nhật thành công");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CongViecKhoiTao  $congViecKhoiTao
     * @return \Illuminate\Http\Response
     */
    public function destroy(CongViecKhoiTao $congViecKhoiTao)
    {
        $congViecKhoiTao->delete();
        return $this->sendResponse('', 'Đã xóa công việc khởi tạo');
    }
}
