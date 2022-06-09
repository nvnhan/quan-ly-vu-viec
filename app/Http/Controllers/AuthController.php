<?php

namespace App\Http\Controllers;

use App\Helpers\Classes;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:3|confirmed',
        ], [
            'required' => 'Bắt buộc phải có :attribute',
            'unique' => 'Tên đăng nhập đã tồn tại',
            'password.min' => 'Mật khẩu phải có từ 3 ký tự trở lên'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Có lỗi", $validator->errors()->all());
        }

        $request['password'] = Hash::make($request['password']);
        $user = User::create($request->toArray());
        if (env('DEFAULT_INSERT') == '1') {
            $user->them_moi = true;
            $user->save();
        }

        return $this->sendResponse("", 'Đăng ký thành công, bạn có thế đăng nhập ngay');
    }

    /**
     * Login in web
     */
    public function login(Request $request)
    {
        $user = User::where('username', $request->username)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                if ($user->actived) {
                    // Delete all previous Tokens
                    $user->tokens()
                        ->where('name', 'Web API login')
                        ->delete();

                    $response = $user->toArray();

                    $token = $user->createToken('Web API login')->accessToken;
                    $response['token'] = $token;
                    return $this->sendResponse($response, 'Đăng nhập thành công');
                } else
                    return $this->sendError("Tài khoản không hoạt động. Vui lòng liên hệ quản trị viên", []);
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
            if ($user->admin)
                $response['default_insert'] = env('DEFAULT_INSERT');
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
            $user->fill($request->except('username', 'password', 'ngay_het_han', 'phan_quyen', 'actived'))->save();
            $response = $user->toArray();

            if ($user->admin) {
                Classes::updateDotEnv('DEFAULT_INSERT', $request->default_insert);
                $response['default_insert'] = env('DEFAULT_INSERT');
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
            $user = User::where('username', $u->username)->first();
            $validator = Validator::make($request->all(), [
                'old_pass' => 'required|string',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->errors()->all(), []);
            }

            if (!Hash::check($request->old_pass, $user->password)) {
                return $this->sendError("Mật khẩu cũ không chính xác", []);
            }

            $request['password'] = Hash::make($request['password']);
            $user->fill($request->except('username'))->save();
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
