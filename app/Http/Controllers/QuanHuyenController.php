<?php

namespace App\Http\Controllers;

use App\Models\QuanHuyen;
use Illuminate\Http\Request;

class QuanHuyenController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = $request->q;
        $query = QuanHuyen::where('ten_huyen', 'LIKE', "%$q%")->orWhereRelation('tinh', 'ten_tinh', 'LIKE', "%$q%");
        if ($request->l)
            $query = $query->limit($request->l);
        $objs = $query->get();
        return $this->sendResponse($objs, 'QuanHuyen retrieved successfully', count($objs));
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
     * @param  \App\Models\QuanHuyen  $quanHuyen
     * @return \Illuminate\Http\Response
     */
    public function show(QuanHuyen $quanHuyen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\QuanHuyen  $quanHuyen
     * @return \Illuminate\Http\Response
     */
    public function edit(QuanHuyen $quanHuyen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuanHuyen  $quanHuyen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuanHuyen $quanHuyen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuanHuyen  $quanHuyen
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuanHuyen $quanHuyen)
    {
        //
    }
}
