<?php

namespace App\Http\Controllers;

use App\Models\TaiLieu;
use Illuminate\Http\Request;

class TaiLieuController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = TaiLieu::query();

        if (!empty($request->vu_viec))
            $query = $query->where('id_vu_viec', $request->vu_viec);

        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();

        return $this->sendResponse($objs, "TaiLieu retrieved successfully", $total);
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
        $obj = new TaiLieu();
        $obj->fill($data);

        $obj->nguoi_tao = $request->user()->id;

        // Save File

        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaiLieu  $taiLieu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaiLieu $taiLieu)
    {
        $user = $request->user();
        $data = $request->all();
        if ($user->admin || $user->id == $taiLieu->nguoi_tao) {
            $taiLieu->fill($data);

            //TODO: Delete old file

            // Save files
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $ext = strtolower($file->getClientOriginalExtension());
                $name = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getClientOriginalName()) . '.' . rand(1000, 9999);
                $file->storeAs('upload/tai-lieu', "$name.$ext"); // Upload file to storage/app/upload
                $taiLieu->ten_file = "$name.$ext";
            }

            $taiLieu->save();
            $taiLieu->refresh();
            return $this->sendResponse($taiLieu, "Cập nhật thành công");
        } else return $this->sendError("Không thể sửa thông tin tài liệu");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaiLieu  $taiLieu
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaiLieu $taiLieu)
    {
        $user = $request->user();
        if ($user->admin || $user->id == $taiLieu->nguoi_tao) {
            $taiLieu->delete();
            return $this->sendResponse('', "Xóa thành công tài liệu");
        } else return $this->sendError("Không thể xóa tài liệu");
    }
}
