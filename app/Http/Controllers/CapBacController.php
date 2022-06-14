<?php

namespace App\Http\Controllers;

use App\Models\CapBac;
use Illuminate\Http\Request;

class CapBacController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $objs = CapBac::all();
        return $this->sendResponse($objs, 'CapBac retrieved successfully', count($objs));
    }
}
