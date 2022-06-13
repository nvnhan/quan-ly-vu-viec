<?php

namespace App\Http\Controllers;

use App\Helpers\Util;
use App\Models\QuanHuyen;
use Illuminate\Http\Request;

class SettingController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $qh = env("QUAN_HUYEN_SU_DUNG");
        $obj = QuanHuyen::find($qh);
        $data = [
            'value' => $qh,
            'label' => $obj->ten_huyen . ' - ' . $obj->ten_tinh ?? ''
        ];
        $data = [
            'quan_huyen' => (object) $data,
            'thu_truong' => env('THU_TRUONG'),
            'pho_thu_truong' => env('PHO_THU_TRUONG'),
        ];
        return $this->sendResponse((object) $data, "Setting retrieved successfully");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        Util::updateDotEnv('QUAN_HUYEN_SU_DUNG', $request->quan_huyen['value']);
        Util::updateDotEnv('THU_TRUONG', $request->thu_truong);
        Util::updateDotEnv('PHO_THU_TRUONG', $request->pho_thu_truong);

        return $this->sendResponse([], "Cập nhật thành công");
    }
}
