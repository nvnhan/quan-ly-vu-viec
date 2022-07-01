<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CanBoController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = CanBo::query();
        if (!$user->admin)
            $query = $query->where('chuc_vu', '<', 9);

        return $this->sendResponse($query->get(), "User retrieved successfully");
    }

    public function get_can_bo(Request $request)
    {
        $q = $request->q;
        $query = CanBo::where('ho_ten', 'LIKE', "%$q%");

        if ($request->type === 'dtv')
            $query = $query->where('chuc_danh_lanh_dao', 'Điều tra viên');

        if ($request->l)
            $query = $query->limit($request->l);
        $objs = $query->get();
        return $this->sendResponse($objs, 'CanBo retrieved successfully', count($objs));
    }

    public function get_lanh_dao(Request $request)
    {
        $objs = CanBo::whereIn('chuc_vu', [5, 6])->get();
        return $this->sendResponse($objs, 'LanhDao retrieved successfully', count($objs));
    }

    public function setCanBoFields(&$canBo, Request $request)
    {
        $canBo->id_don_vi = $request->sel_don_vi['value'] ?? null;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $u = CanBo::where('ten_dang_nhap', $request->ten_dang_nhap)->first();
        if ($u)
            return $this->sendError("Trùng tên tài khoản");

        $data = $request->all();
        $obj = new CanBo();
        $obj->fill($data);
        // if (!$user->admin)
        //     $obj->chuc_vu = 0;

        $obj->ten_dang_nhap = strtolower($obj->ten_dang_nhap);
        $obj->mat_khau = Hash::make('123');
        self::setCanBoFields($obj, $request);
        $obj->save();
        $obj->refresh();
        return $this->sendResponse($obj, "Thêm mới thành công, mật khẩu: 123");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = CanBo::find($id);
        $user->fill($request->except('ten_dang_nhap', 'mat_khau'));
        // if (!$request->user()->admin)
        //     $user->chuc_vu = 0;
        self::setCanBoFields($user, $request);
        $user->save();
        $user->refresh();
        return $this->sendResponse($user, "Cập nhật thành công");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = CanBo::find($id);
        // BanRa::where('username', $user->username)->delete();

        $user->delete();
        return $this->sendResponse('', "Đã xóa thông tin cán bộ");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function reset(Request $request, $id)
    {
        $auth = CanBo::where('ten_dang_nhap', $request->user()->ten_dang_nhap)->first();
        if (Hash::check($request->mat_khau, $auth->mat_khau)) {
            $user = CanBo::find($id);
            $user->mat_khau = Hash::make('123');
            $user->save();
            return $this->sendResponse($user, "Khôi phục mật khẩu thành công");
        } else return $this->sendError("Mật khẩu quản trị viên không chính xác");
    }

    public function check(Request $request, $name)
    {
        $obj = CanBo::where('ten_dang_nhap', $name)->get();
        if (count($obj) === 0) return $this->sendResponse(1, 'Tên đăng nhập này chưa được sử dụng');
        else
            return $this->sendError('Tên đăng nhập bị trùng');
    }
}
