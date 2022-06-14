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
        //
    }

    public function get_xa_phuong(Request $request)
    {
        $q = $request->q;
        $query = DonVi::where('ten_don_vi', 'LIKE', "%$q%")->whereIn('loai_don_vi', ['Xã', 'Phường', 'Thị trấn']);
        if ($request->l)
            $query = $query->limit($request->l);
        $objs = $query->get();
        return $this->sendResponse($objs, 'XaPhuong retrieved successfully', count($objs));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * @param  \App\Models\DonVi  $donVi
     * @return \Illuminate\Http\Response
     */
    public function show(DonVi $donVi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DonVi  $donVi
     * @return \Illuminate\Http\Response
     */
    public function edit(DonVi $donVi)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DonVi  $donVi
     * @return \Illuminate\Http\Response
     */
    public function destroy(DonVi $donVi)
    {
        //
    }
}
