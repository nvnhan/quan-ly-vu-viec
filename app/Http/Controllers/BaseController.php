<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message, $total = 1)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'total' => $total,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($errorMessage, $errorDatas = [], $code = 200)
    {
        $response = [
            'success' => false,
            'data' => [],
            'message' => $errorMessage,
        ];
        if (!empty($errorDatas)) {
            $response['data'] = $errorDatas;
        }

        return response()->json($response, $code);
    }
}
