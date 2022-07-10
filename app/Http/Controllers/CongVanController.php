<?php

namespace App\Http\Controllers;

use App\Models\CongVan;
use Illuminate\Http\Request;

class CongVanController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = CongVan::whereNull('id_cong_van_cha');
        if ($request->bat_dau && $request->ket_thuc)
            $query = $query->whereBetween('ngay_ban_hanh', [$request->bat_dau, $request->ket_thuc]);

        if (!empty($request->q))
            $query = $query->where('tieu_de', 'LIKE', "%$request->q%");
        if (!empty($request->tieu_de))
            $query = $query->where('tieu_de', 'LIKE', "%$request->tieu_de%");

        if (!empty($request->co_quan_nhan))
            $query = $query->where('co_quan_nhan', 'LIKE', "%$request->co_quan_nhan%");

        if (!empty($request->vu_viec))
            $query = $query->where('id_vu_viec', $request->vu_viec);

        $query = $query->orderBy('ngay_ban_hanh', 'DESC');
        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->with(['cong_van_don_doc'])->get();

        return $this->sendResponse($objs, "CongVan retrieved successfully", $total);
    }

    public static function setCongVanFields(&$congVan, Request $request)
    {
        if ($request->user()->chuc_vu !== 0)
            $congVan->id_can_bo = $request->sel_can_bo['value'] ?? null;
        else $congVan->id_can_bo = $request->user()->id;
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
        $obj = new CongVan();
        $obj->fill($data);
        $obj->nguoi_tao = $request->user()->id;
        if (empty($obj->id_cong_van_cha))
            self::setCongVanFields($obj, $request);

        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CongVan  $congVan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CongVan $congVan)
    {
        $user = $request->user();
        $data = $request->all();
        if ($user->chi_huy || $user->id == $congVan->nguoi_tao) {
            $congVan->fill($data);
            if (empty($congVan->id_cong_van_cha))
                self::setCongVanFields($congVan, $request);

            $congVan->save();
            $congVan->refresh();
            return $this->sendResponse($congVan, "Cập nhật thành công");
        } else return $this->sendError("Đồng chí không có quyền sửa thông tin văn bản");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CongVan  $congVan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, CongVan $congVan)
    {
        $user = $request->user();
        if ($user->quan_tri || $user->id == $congVan->nguoi_tao) {
            $congVan->delete();
            return $this->sendResponse('', "Xóa thành công văn bản");
        } else return $this->sendError("Đồng chí không có quyền xóa văn bản");
    }
}
