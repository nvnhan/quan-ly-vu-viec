<?php

namespace App\Http\Controllers;

use App\Models\VanBanPhapLuat;
use Illuminate\Http\Request;

class VanBanPhapLuatController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $van_ban = VanBanPhapLuat::all();
        return $this->sendResponse($van_ban, 'VanBanPhapLuat retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $van_ban = new VanBanPhapLuat();
        $van_ban->fill($request->all());

        // Save files
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $ext = strtolower($file->getClientOriginalExtension());
            $name = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getClientOriginalName()) . '.' . rand(1000, 9999);
            $file->storeAs('upload/van-ban', "$name.$ext"); // Upload file to storage/app/upload
            $van_ban->ten_file = "$name.$ext";
        }

        $van_ban->save();
        $van_ban->refresh();
        return $this->sendResponse($van_ban, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VanBanPhapLuat  $vanBanPhapLuat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VanBanPhapLuat $vanBanPhapLuat)
    {
        $user = $request->user();
        $data = $request->all();
        if ($user->admin) {
            $vanBanPhapLuat->fill($data);

            if ($vanBanPhapLuat->ten_file && ($request->hasFile('file') || $request->file !== 'undefined')) {
                if (Storage::exists('upload/van-ban/' . $vanBanPhapLuat->ten_file))
                    Storage::delete('upload/van-ban/' . $vanBanPhapLuat->ten_file);

                $vanBanPhapLuat->ten_file = null;
            }

            // Save new files
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $ext = strtolower($file->getClientOriginalExtension());
                $name = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getClientOriginalName()) . '.' . rand(1000, 9999);
                $file->storeAs('upload/van-ban', "$name.$ext"); // Upload file to storage/app/upload
                $vanBanPhapLuat->ten_file = "$name.$ext";
            }

            $vanBanPhapLuat->save();
            $vanBanPhapLuat->refresh();
            return $this->sendResponse($vanBanPhapLuat, "Cập nhật thành công");
        } else return $this->sendError("Không thể sửa thông tin văn bản");
    }

    public function tai_file(Request $request, $id)
    {
        $vanBanPhapLuat = VanBanPhapLuat::find($id);
        if ($vanBanPhapLuat && Storage::exists('upload/van-ban/' . $vanBanPhapLuat->ten_file))
            return response()->download(storage_path('app\\upload\\van-ban\\' . $vanBanPhapLuat->ten_file), $vanBanPhapLuat->ten_file);
        else return $this->sendError('Tập tin không tồn tại', [], 404);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VanBanPhapLuat  $vanBanPhapLuat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, VanBanPhapLuat $vanBanPhapLuat)
    {
        $user = $request->user();
        if ($user->admin) {
            $vanBanPhapLuat->delete();
            return $this->sendResponse('', "Xóa thành công văn bản");
        } else return $this->sendError("Không thể xóa văn bản");
    }
}
