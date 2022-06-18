<?php

namespace App\Http\Controllers;

use App\Models\CongViec;
use App\Models\CongViecKhoiTao;
use App\Models\VuViec;
use Illuminate\Http\Request;
use phpseclib3\Crypt\RC2;

class CongViecController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->vu_viec) {
            $objs = CongViec::where('id_vu_viec', $request->vu_viec)->get();
            return $this->sendResponse($objs, 'CongViec retrieved successfully');
        } else
            return $this->sendError('You are not allowed to access this data', [], 403);
    }

    public static function setCongViecFields(&$congViec, Request $request)
    {
        $congViec->id_can_bo = $request->sel_can_bo['value'] ?? null;
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

        $congViec = new CongViec();
        $congViec->fill($data);
        $congViec->nguoi_tao = $request->user()->id;
        self::setCongViecFields($congViec, $request);
        if ($congViec->id_can_bo) {
            $congViec->ngay_giao = now();
            $congViec->trang_thai = 1; /// mỚi giao
        }

        $congViec->save();
        $congViec->refresh();

        return $this->sendResponse($congViec, 'Thêm mới thành công');
    }

    public function them_khoi_tao(Request $request)
    {
        $vu_viec = $request->id_vu_viec;
        if ($vu_viec) {
            $vv = VuViec::find($vu_viec);
            if ($vv) {
                $cvkt = CongViecKhoiTao::where('loai_vu_viec', $vv->loai_vu_viec)->get();
                foreach ($cvkt as $key => $value) {
                    $cv = new CongViec();
                    $cv->id_vu_viec = $vu_viec;
                    $cv->nguoi_tao = $request->user()->id;

                    $cv->id_nhom_cong_viec = $value->id_nhom_cong_viec;
                    $cv->ten_cong_viec = $value->ten_cong_viec;
                    $ngay = substr($value->thoi_han, -2, 2);
                    $thang = substr($value->thoi_han, -4, 2);
                    $cv->ngay_het_han = date('Y-m-d H:i:s', strtotime(now() . " +$thang months +$ngay days"));

                    $cv->save();
                }
                $result = CongViec::where('id_vu_viec', $vu_viec)->get();
                return $this->sendResponse($result, 'Đã thêm các công việc khởi tạo');
            }
        }
        return $this->sendError('You are not allowed to access this data', [], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function show(CongViec $congViec)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CongViec $congViec)
    {
        $data = $request->all();
        $congViec->fill($data);
        self::setCongViecFields($congViec, $request);

        if ($congViec->trang_thai == 0 && $congViec->id_can_bo) {
            $congViec->ngay_giao = now();
            $congViec->trang_thai = 1; /// mỚi giao
        }
        $congViec->save();
        $congViec->refresh();

        return $this->sendResponse($congViec, 'Cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CongViec  $congViec
     * @return \Illuminate\Http\Response
     */
    public function destroy(CongViec $congViec)
    {
        $congViec->delete();
        return $this->sendResponse('', 'Xóa thành công vai trò của người trong vụ việc');
    }
}
