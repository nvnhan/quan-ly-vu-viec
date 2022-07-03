<?php

namespace App\Http\Controllers;

use App\Models\DonVi;
use Illuminate\Http\Request;

class DonViController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $qh_su_dung = env('QUAN_HUYEN_SU_DUNG');
        $objs = DonVi::where('dia_phuong', $qh_su_dung)->get();
        return $this->sendResponse($objs, 'DonVi retrieved successfully');
    }

    public function get_xa_phuong(Request $request)
    {
        $q = $request->q;
        if ($q) {
            $query = DonVi::where('ten_don_vi', 'LIKE', "%$q%")->whereIn('loai_don_vi', ['Xã', 'Phường', 'Thị trấn']);
            if ($request->l)
                $query = $query->limit($request->l);
            $objs = $query->get();
            return $this->sendResponse($objs, 'XaPhuong retrieved successfully', count($objs));
        } else return $this->sendError("Error");
    }

    public function get_don_vi(Request $request)
    {
        $q = $request->q;
        if ($q) {
            $qh_su_dung = env('QUAN_HUYEN_SU_DUNG');
            $query = DonVi::where('ten_don_vi', 'LIKE', "%$q%")
                ->where('dia_phuong', $qh_su_dung);

            // Xã, phường, thị trấn, đội trực thuộc Quận/huyện
            if (!empty($request->type))
                $query = $query->whereNull('id_don_vi_cha');

            if ($request->l)
                $query = $query->limit($request->l);
            $objs = $query->get();
            return $this->sendResponse($objs, 'XaPhuong retrieved successfully', count($objs));
        } else
            return $this->sendError('Error');
    }

    public function setDonViFields(&$donVi, Request $request)
    {
        $donVi->id_don_vi_cha = $request->sel_don_vi_cha['value'] ?? null;
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
        $obj = new DonVi();
        $obj->fill($data);
        $obj->dia_phuong = env('QUAN_HUYEN_SU_DUNG');

        self::setDonViFields($obj, $request);
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DonVi  $donVi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DonVi $donVi)
    {
        $donVi->fill($request->all());

        self::setDonViFields($donVi, $request);
        $donVi->save();
        $donVi->refresh();
        return $this->sendResponse($donVi, "Cập nhật thành công");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DonVi  $donVi
     * @return \Illuminate\Http\Response
     */
    public function destroy(DonVi $donVi)
    {
        $donVi->delete();
        return $this->sendResponse('', "Xóa thành công đơn vị");
    }
}
