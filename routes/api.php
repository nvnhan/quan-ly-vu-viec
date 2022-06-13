<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuanHuyenController;
use App\Http\Controllers\ToiDanhController;
use App\Http\Controllers\UserController;
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

// private routes
Route::middleware('auth:api')->group(function () {

    // Account
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/get-user', [AuthController::class, 'user'])->name('getuser');
    Route::put('/profile', [AuthController::class, 'update'])->name('profile');
    Route::put('/password', [AuthController::class, 'password'])->name('password');

    // Dinh Danh
    // Route::delete('dinh-danh/deletes', [DinhDanhController::class, 'deletes']);
    // Route::post('dinh-danh/them-file', [DinhDanhController::class, 'themfile']);

    // Add middleware checkadmin
    Route::middleware('checkadmin')->group(function () {
        Route::resource('nguoi-dung', UserController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::put('reset/{id}', [UserController::class, 'reset']);
        Route::put('sua-them-moi/{id}', [UserController::class, 'change_permission']);
    });
});
