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
            $query = CongViec::where('id_vu_viec', $request->vu_viec);
            if ($request->trang_thai)
                $query = $query->where('trang_thai', $request->trang_thai);
            if ($request->uu_tien)
                $query = $query->where('muc_do_uu_tien', $request->uu_tien);

            return $this->sendResponse($query->get(), 'CongViec retrieved successfully');
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

                    if ($value->thoi_han != '') {
                        $ngay = substr($value->thoi_han, -2, 2);
                        $thang = substr($value->thoi_han, -4, -2);
                        $s = "+$thang months $ngay days";
                        if (empty($thang))
                            $s = "+$ngay days";
                        $cv->ngay_het_han = date('Y-m-d H:i:s', strtotime($s));
                    }

                    if ($vv->id_can_bo_chinh) {
                        $cv->id_can_bo = $vv->id_can_bo_chinh;
                        $cv->trang_thai = 1;
                        $cv->ngay_giao = now();
                    }
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
    public function sua_trang_thai(Request $request, CongViec $congViec)
    {
        $congViec->fill($request->all());
        switch ($request->trang_thai) {
            case 3:
                $congViec->ngay_bat_dau = now();
                break;
            case 4:
                $congViec->ngay_ket_thuc = now();
                break;
            case 5:
                $congViec->ngay_xac_nhan = now();
                break;
            case 8:
                $congViec->ngay_hoan_thanh = now();
                break;
        }
        $congViec->save();
        $congViec->refresh();
        return $this->sendResponse($congViec, "Cập nhật trạng thái thành công");
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
