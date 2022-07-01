<?php

namespace App\Http\Controllers;

use App\Models\Nguoi;
use App\Models\VuViec;
use App\Models\VuViecNguoi;
use Illuminate\Http\Request;

class VuViecNguoiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->vu_viec) {
            $objs = VuViecNguoi::where('id_vu_viec', $request->vu_viec)->with('nguoi')->get();
            return $this->sendResponse($objs, 'VuViecNguoi retrieved successfully');
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
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

        $nguoi = new Nguoi();
        if ($request->id_nguoi)
            $nguoi = Nguoi::find($request->id_nguoi);
        else if ($request->so_dinh_danh) {
            $nguoi = Nguoi::where('so_dinh_danh', $request->so_dinh_danh)->first();
            if (!$nguoi) $nguoi = new Nguoi();
        }
        $nguoi->fill($data);
        NguoiController::setNguoiFields($nguoi, $request);
        $nguoi->save();
        $nguoi->refresh();

        $vu_viec_nguoi = new VuViecNguoi();
        $vu_viec_nguoi->fill($data);
        $vu_viec_nguoi->id_nguoi = $nguoi->id;
        $vu_viec_nguoi->id_vu_viec = $request->id_vu_viec;
        $vu_viec_nguoi->save();

        $vuViec = VuViec::find($request->id_vu_viec);
        $vuViec->ten_vu_viec = VuViecController::calTenVuViec($vuViec);
        $vuViec->save();

        $vu_viec_nguoi->refresh();
        $vu_viec_nguoi->nguoi = $nguoi;
        return $this->sendResponse($vu_viec_nguoi, 'Thêm mới thành công');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VuViecNguoi  $vu_viec_nguoi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VuViecNguoi $vu_viec_nguoi)
    {
        $data = $request->all();
        $nguoi = Nguoi::find($vu_viec_nguoi->id_nguoi);
        $nguoi->fill($data);
        NguoiController::setNguoiFields($nguoi, $request);
        $nguoi->save();
        $nguoi->refresh();

        $vu_viec_nguoi->fill($data);
        $vu_viec_nguoi->save();

        $vuViec = VuViec::find($vu_viec_nguoi->id_vu_viec);
        $vuViec->ten_vu_viec = VuViecController::calTenVuViec($vuViec);
        $vuViec->save();

        $vu_viec_nguoi->refresh();
        $vu_viec_nguoi->nguoi = $nguoi;
        return $this->sendResponse($vu_viec_nguoi, 'Cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VuViecNguoi  $vuViecNguoi
     * @return \Illuminate\Http\Response
     */
    public function destroy(VuViecNguoi $vuViecNguoi)
    {
        $vuViecNguoi->delete();
        return $this->sendResponse('', 'Xóa thành công vai trò của người trong vụ việc');
    }
}
