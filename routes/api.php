<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuanHuyenController;
use App\Http\Controllers\ToiDanhController;
use App\Http\Controllers\CanBoController;
use App\Http\Controllers\DonViController;
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
Route::get('quan-huyen', [QuanHuyenController::class, 'index']);
Route::get('tim-xa-phuong', [DonViController::class, 'get_xa_phuong']);

// private routes
Route::middleware('auth:api')->group(function () {

    // Account
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/get-user', [AuthController::class, 'user'])->name('getuser');
    Route::put('/profile', [AuthController::class, 'update'])->name('profile');
    Route::put('/password', [AuthController::class, 'password'])->name('password');

    // Vu Viec
    Route::resource('vu-viec', VuViecController::class);

    // Add middleware checkadmin
    Route::middleware('checkadmin')->group(function () {
        Route::resource('can-bo', CanBoController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::put('reset/{id}', [CanBoController::class, 'reset']);

        Route::get('cai-dat', [SettingController::class, 'index']);
        Route::put('cai-dat', [SettingController::class, 'update']);
    });
});
