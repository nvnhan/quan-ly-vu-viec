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
        if ($obj)
            $data = (object)[
                'value' => $qh,
                'label' =>  "$obj->loai $obj->ten_huyen_tinh" ?? ''
            ];
        else $data = null;
        $data = [
            'quan_huyen' => $data,
            // 'thu_truong' => env('THU_TRUONG'),
            // 'pho_thu_truong' => env('PHO_THU_TRUONG'),
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
        $ma_huyen = str_pad($request->quan_huyen['value'] ?? '', 3, '0', STR_PAD_LEFT);
        Util::updateDotEnv('QUAN_HUYEN_SU_DUNG', $ma_huyen);

        // Util::updateDotEnv('THU_TRUONG', $request->thu_truong);
        // Util::updateDotEnv('PHO_THU_TRUONG', $request->pho_thu_truong);

        return $this->sendResponse([], "Cập nhật thành công");
    }
}
