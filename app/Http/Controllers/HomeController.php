<?php

namespace App\Http\Controllers;

use App\Models\CongViec;
use Illuminate\Http\Request;

class HomeController extends BaseController
{
    //
    public function index()
    {
    }

    public function so_lieu_cong_viec(Request $request)
    {
        $moi_giao = CongViec::where('id_can_bo', $request->user()->id)->whereIn('trang_thai', [1, 2, 3, 7])->count();
        $data = [
            'moi_giao' => $moi_giao
        ];

        return $this->sendResponse($data, 'SoLieuCongViec retrieved successfully');
    }
}
