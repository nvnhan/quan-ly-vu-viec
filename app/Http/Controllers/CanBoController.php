<?php

namespace App\Http\Controllers;

use App\Models\CanBo;
use Illuminate\Http\Request;

class CanBoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->admin)
            $objs = User::where('username', '!=', $user->username)->get();
        else $objs = [];
        return $this->sendResponse($objs, "User retrieved successfully");
    }

    public function all(Request $request)
    {
        $user = $request->user();
        if ($user->admin)
            $objs = User::query();
        else
            $objs = User::where('username', $user->username);
        $objs = $objs->get(['username', 'ho_ten']);
        return $this->sendResponse($objs, "User retrieved successfully");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $u = User::where('username', $request->username)->first();
        if ($u)
            return $this->sendError("Trùng tên tài khoản");

        $user = $request->user();
        $data = $request->all();
        $obj = new User();
        $obj->fill($data);
        if (!$user->admin)
            $obj->phan_quyen = 0;

        $obj->username = strtolower($obj->username);
        $obj->password = Hash::make('123');
        $obj->save();
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
        $user = User::find($id);
        $user->fill($request->except('username', 'password'));
        if (!$request->user()->admin)
            $user->phan_quyen = 0;
        $user->save();
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
        $user = User::find($id);
        // BanRa::where('username', $user->username)->delete();

        $user->delete();
        return $this->sendResponse('', "Xóa thành công nhân viên");
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
        $auth = User::where('username', $request->user()->username)->first();
        if (Hash::check($request->password, $auth->password)) {
            $user = User::find($id);
            $user->password = Hash::make('123');
            $user->save();
            return $this->sendResponse($user, "Khôi phục thành công thành công");
        } else return $this->sendError("Không đúng mật khẩu quản trị viên");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $model
     * @return \Illuminate\Http\Response
     */
    public function change_permission(Request $request, $id)
    {
        $auth = User::where('username', $request->user()->username)->first();
        if ($auth->admin) {
            $user = User::find($id);
            $user->them_moi = $request->check;
            $user->save();
            return $this->sendResponse($user, "Cập nhật thành công");
        } else return $this->sendError("Có lỗi");
    }
}
