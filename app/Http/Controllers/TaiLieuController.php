<?php

namespace App\Http\Controllers;

use App\Models\DonVi;
use App\Models\TaiLieu;
use App\Models\VuViec;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        if ($request->bat_dau && $request->ket_thuc)
            $query = $query->whereBetween('created_at', [$request->bat_dau, $request->ket_thuc]);

        if (!empty($request->q))
            $query = $query->where('ten_tai_lieu', 'LIKE', "%$request->q%");

        if (!empty($request->ten_tai_lieu))
            $query = $query->where('ten_tai_lieu', 'LIKE', "%$request->ten_tai_lieu%");

        if (!empty($request->vu_viec))
            $query = $query->where('id_vu_viec', $request->vu_viec);
        else {
            $user = $request->user();
            $qu = VuViec::query();
            if ($user->chuc_vu === 0)        // Neu la can bo
            {
                $vv = CongViec::where('id_can_bo', $user->id)->pluck('id_vu_viec');
                $qu->where(fn ($q) =>  $q
                    ->where('id_dtv_chinh', $user->id)
                    ->orWhere('id_can_bo_chinh', $user->id)
                    ->orWhere('nguoi_tao', $user->id)
                    ->orWhereIn('id', $vv));
            } else if ($user->chuc_vu === 1) {      // Doi pho
                $qu->where('id_don_vi', $user->id_don_vi);
            } else if ($user->chuc_vu <= 3) {      // Đội trưởng, tổng hợp đội
                $dv_con = DonVi::where('id_don_vi_cha', $user->id_don_vi)->pluck('id');
                $dv_con[] = $user->id_don_vi;
                $qu->whereIn('id_don_vi', $dv_con);
            }
            // Neu la lanh dao thi show het cua can bo
            $all_vu_viec = $qu->pluck('id');
            $query->whereIn('id_vu_viec', $all_vu_viec);
        }

        $query = $query->orderBy('created_at', 'DESC');
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

        // Save files
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $ext = strtolower($file->getClientOriginalExtension());
            $name = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getClientOriginalName()) . '.' . rand(1000, 9999);
            $file->storeAs('upload/tai-lieu', "$name.$ext"); // Upload file to storage/app/upload
            $obj->ten_file = "$name.$ext";
        }

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

            if ($taiLieu->ten_file && ($request->hasFile('file') || $request->file !== 'undefined')) {
                if (Storage::exists('upload/tai-lieu/' . $taiLieu->ten_file))
                    Storage::delete('upload/tai-lieu/' . $taiLieu->ten_file);

                $taiLieu->ten_file = null;
            }

            // Save new files
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

    public function tai_file(Request $request, $id)
    {
        $taiLieu = TaiLieu::find($id);
        if ($taiLieu && Storage::exists('upload/tai-lieu/' . $taiLieu->ten_file))
            return response()->download(storage_path('app\\upload\\tai-lieu\\' . $taiLieu->ten_file), $taiLieu->ten_file);
        else return $this->sendError('Tập tin không tồn tại', [], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaiLieu  $taiLieu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, TaiLieu $taiLieu)
    {
        $user = $request->user();
        if ($user->admin || $user->id == $taiLieu->nguoi_tao) {
            $taiLieu->delete();
            return $this->sendResponse('', "Xóa thành công tài liệu");
        } else return $this->sendError("Không thể xóa tài liệu");
    }
}
