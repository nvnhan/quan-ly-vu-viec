<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaoCaoController;
use App\Http\Controllers\QuanHuyenController;
use App\Http\Controllers\ToiDanhController;
use App\Http\Controllers\CanBoController;
use App\Http\Controllers\CapBacController;
use App\Http\Controllers\CongVanController;
use App\Http\Controllers\CongViecController;
use App\Http\Controllers\CongViecKhoiTaoController;
use App\Http\Controllers\DonViController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NguoiController;
use App\Http\Controllers\NhomCongViecController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TaiLieuController;
use App\Http\Controllers\VanBanPhapLuatController;
use App\Http\Controllers\VuViecController;
use App\Http\Controllers\VuViecNguoiController;
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

    // Home
    Route::get('/so-lieu-cong-viec', [HomeController::class, 'so_lieu_cong_viec']);
    Route::get('/tong-quan', [HomeController::class, 'index']);

    // Danh Muc
    Route::get('quan-huyen', [QuanHuyenController::class, 'index']);
    Route::get('tim-xa-phuong', [DonViController::class, 'get_xa_phuong']);
    Route::get('tim-don-vi', [DonViController::class, 'get_don_vi']);
    Route::get('tim-can-bo', [CanBoController::class, 'get_can_bo']);
    Route::get('tim-nguoi', [NguoiController::class, 'get_nguoi']);
    Route::resource('nguoi', NguoiController::class)->only(['index', 'show']);

    // Vu Viec
    Route::resource('vu-viec', VuViecController::class);
    Route::resource('vu-viec-nguoi', VuViecNguoiController::class)->only(['index', 'store', 'destroy']);
    // Dung cho upload file bang Form Data
    // Form Data chi up thong qua POST
    Route::post('vu-viec-nguoi/{vu_viec_nguoi}', [VuViecNguoiController::class, 'update']);

    Route::resource('cong-viec', CongViecController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::post('cong-viec/khoi-tao', [CongViecController::class, 'them_khoi_tao']);
    Route::post('cong-viec/{cong_viec}/trang-thai', [CongViecController::class, 'sua_trang_thai']);
    Route::get('cong-viec/bao-cao', [CongViecController::class, 'bao_cao_cong_viec']);

    Route::resource('tai-lieu', TaiLieuController::class);
    // Dung cho upload file bang Form Data
    // Form Data chi up thong qua POST
    Route::post('tai-lieu/{tai_lieu}', [TaiLieuController::class, 'update']);
    Route::get('tai-lieu/{tai_lieu}/tai-file', [TaiLieuController::class, 'tai_file']);

    Route::resource('cong-van', CongVanController::class);

    Route::resource('van-ban-phap-luat', VanBanPhapLuatController::class);
    // Dung cho upload file bang Form Data
    // Form Data chi up thong qua POST
    Route::post('van-ban-phap-luat/{van_ban_phap_luat}', [VanBanPhapLuatController::class, 'update']);
    Route::get('van-ban-phap-luat/{van_ban_phap_luat}/tai-file', [VanBanPhapLuatController::class, 'tai_file']);

    Route::get('lanh-dao', [CanBoController::class, 'get_lanh_dao']);
    Route::get('nhom-cong-viec', [NhomCongViecController::class, 'index']);
    Route::get('cap-bac', [CapBacController::class, 'index']);

    Route::get('bao-cao', [BaoCaoController::class, 'index']);

    // Check Quan tri
    Route::middleware('check.quantri')->group(function () {
        Route::resource('can-bo', CanBoController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::put('reset/{id}', [CanBoController::class, 'reset']);
        Route::get('can-bo/check/{name}', [CanBoController::class, 'check']);

        Route::resource('nguoi', NguoiController::class)->only(['store', 'destroy']);
        // Dung cho upload file bang Form Data
        // Form Data chi up thong qua POST
        Route::post('nguoi/{nguoi}', [NguoiController::class, 'update']);

        Route::resource('don-vi', DonViController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('nhom-cong-viec', NhomCongViecController::class)->only(['store', 'update', 'destroy']);
        Route::resource('cong-viec-khoi-tao', CongViecKhoiTaoController::class)->only(['index', 'store', 'update', 'destroy']);
    });

    // Add middleware check Admin tong
    Route::middleware('check.admin')->group(function () {
        Route::get('cai-dat', [SettingController::class, 'index']);
        Route::put('cai-dat', [SettingController::class, 'update']);
    });
});
