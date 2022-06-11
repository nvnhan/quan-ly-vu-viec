<?php

namespace App\Http\Controllers;

use App\Helpers\Classes;
use App\Models\CanBo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ten_dang_nhap' => 'required|string|max:20|unique:can_bos',
            'mat_khau' => 'required|string|min:3|confirmed',
        ], [
            'required' => 'Bắt buộc phải có :attribute',
            'unique' => 'Tên đăng nhập đã tồn tại',
            'mat_khau.min' => 'Mật khẩu phải có từ 3 ký tự trở lên'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Có lỗi", $validator->errors()->all());
        }

        $request['mat_khau'] = Hash::make($request['mat_khau']);
        CanBo::create($request->toArray());

        return $this->sendResponse("", 'Đăng ký thành công, bạn có thế đăng nhập ngay');
    }

    /**
     * Login in web
     */
    public function login(Request $request)
    {
        $user = CanBo::where('ten_dang_nhap', $request->ten_dang_nhap)->first();

        if ($user) {
            if (Hash::check($request->mat_khau, $user->mat_khau)) {
                $user->dang_nhap_cuoi = now();
                // Delete all previous Tokens
                $user->tokens()
                    ->where('name', 'Web API login')
                    ->delete();

                $response = $user->toArray();

                $token = $user->createToken('Web API login')->accessToken;
                $response['token'] = $token;
                return $this->sendResponse($response, 'Đăng nhập thành công');
            } else
                return $this->sendError("Mật khẩu không chính xác", []);
        } else
            return $this->sendError('Tài khoản không tồn tại', []);
    }
    /**
     * Get user information
     */
    public function user(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $response = $user->toArray();
            return $this->sendResponse($response, 'Get user successfully');
        } else
            return $this->sendError('Invalid token or is Revoked', []);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->fill($request->except('ten_dang_nhap', 'mat_khau'))->save();
            $response = $user->toArray();

            if ($user->admin) {
                $user->chuc_vu = $request->chuc_vu;
                $user->id_don_vi = $request->id_don_vi;
            }
            return $this->sendResponse($response, 'Cập nhật thành công');
        } else
            return $this->sendError('Invalid token or is Revoked', []);
    }

    /**
     * User change password
     *
     * @param  mixed $request
     * @return void
     */
    public function password(Request $request)
    {
        $u = $request->user();
        if ($u) {
            $user = CanBo::where('ten_dang_nhap', $u->ten_dang_nhap)->first();
            $validator = Validator::make($request->all(), [
                'old_pass' => 'required|string',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->errors()->all(), []);
            }

            if (!Hash::check($request->old_pass, $user->mat_khau)) {
                return $this->sendError("Mật khẩu cũ không chính xác", []);
            }

            $request['mat_khau'] = Hash::make($request['password']);
            $user->fill($request->except('ten_dang_nhap'))->save();
            return $this->sendResponse($user, 'Đổi mật khẩu thành công');
        } else
            return $this->sendError('Invalid token or is Revoked', []);
    }

    /**
     * User logout
     *
     * @param  mixed $request
     * @return void
     */
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();

        return $this->sendResponse('', 'Đã đăng xuất');
    }
}
