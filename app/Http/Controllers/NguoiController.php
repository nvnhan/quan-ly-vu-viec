<?php

namespace App\Http\Controllers;

use App\Models\Nguoi;
use Illuminate\Http\Request;

class NguoiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Nguoi::query();

        if (!empty($request->ten))
            $query = $query->where('ho_ten', 'LIKE', "%$request->ten%");

        if (!empty($request->bo))
            $query = $query->where('ho_ten_bo', 'LIKE', "%$request->bo%");

        if (!empty($request->me))
            $query = $query->where('ho_ten_me', 'LIKE', "%$request->me%");

        if (!empty($request->dd))
            $query = $query->where('so_dinh_danh', $request->dd);

        // For AJAX pagination loading
        $total = $query->count();
        $page = $request->p;
        $size = $request->s;
        if ($page > 0 && $size > 0)
            $query = $query->skip(($page - 1) * $size)->take($size);
        $objs = $query->get();

        return $this->sendResponse($objs, "Nguoi retrieved successfully", $total);
    }

    public function setNguoiFields(&$nguoi, Request $request)
    {
        $nguoi->id_dp_thuong_tru = $request->sel_dp_thuong_tru['value'] ?? null;
        $nguoi->id_dp_tam_tru = $request->sel_dp_tam_tru['value'] ?? null;
        $nguoi->id_dp_noi_o_hien_nay = $request->sel_dp_noi_o_hien_nay['value'] ?? null;
        $nguoi->id_dp_thong_bao = $request->sel_dp_thong_bao['value'] ?? null;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Nguoi  $nguoi
     * @return \Illuminate\Http\Response
     */
    public function show(Nguoi $nguoi)
    {
        return $this->sendResponse($nguoi, "Nguoi retrieved successfully");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Nguoi  $nguoi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Nguoi $nguoi)
    {
        $data = $request->all();
        $nguoi->fill($data);
        self::setNguoiFields($nguoi, $request);
        $nguoi->save();
        $nguoi->refresh();
        return $this->sendResponse($nguoi, "Cập nhật thành công");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Nguoi  $nguoi
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nguoi $nguoi)
    {
        $nguoi->delete();
        return $this->sendResponse('', "Xóa thành công người");
    }
}
