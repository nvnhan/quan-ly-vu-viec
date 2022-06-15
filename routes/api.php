<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuanHuyenController;
use App\Http\Controllers\ToiDanhController;
use App\Http\Controllers\CanBoController;
use App\Http\Controllers\CapBacController;
use App\Http\Controllers\CongViecKhoiTaoController;
use App\Http\Controllers\DonViController;
use App\Http\Controllers\NguoiController;
use App\Http\Controllers\NhomCongViecController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\VuViecController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// public routes

Route::post('/login', [AuthController::class, 'login'])->name('login.api');
Route::post('/register', [AuthController::class, 'register'])->name('register.api');

Route::get('toi-danh', [ToiDanhController::class, 'index']);

// private routes
Route::middleware('auth:api')->group(function () {

    // Account
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/get-user', [AuthController::class, 'user'])->name('getuser');
    Route::put('/profile', [AuthController::class, 'update'])->name('profile');
    Route::put('/password', [AuthController::class, 'password'])->name('password');

    // Danh Muc
    Route::get('quan-huyen', [QuanHuyenController::class, 'index']);
    Route::get('tim-xa-phuong', [DonViController::class, 'get_xa_phuong']);
    Route::get('tim-don-vi', [DonViController::class, 'get_don_vi']);

    // Vu Viec
    Route::resource('vu-viec', VuViecController::class);

    Route::get('nhom-cong-viec', [NhomCongViecController::class, 'index']);
    Route::get('cap-bac', [CapBacController::class, 'index']);

    // Add middleware checkadmin
    Route::middleware('checkadmin')->group(function () {
        Route::resource('can-bo', CanBoController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::put('reset/{id}', [CanBoController::class, 'reset']);
        Route::get('can-bo/check/{name}', [CanBoController::class, 'check']);

        Route::resource('nguoi', NguoiController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

        Route::resource('don-vi', DonViController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('nhom-cong-viec', NhomCongViecController::class)->only(['store', 'update', 'destroy']);
        Route::resource('cong-viec-khoi-tao', CongViecKhoiTaoController::class)->only(['index', 'store', 'update', 'destroy']);

        Route::get('cai-dat', [SettingController::class, 'index']);
        Route::put('cai-dat', [SettingController::class, 'update']);
    });
});
