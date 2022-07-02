<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnNgayThang extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vu_viecs', function (Blueprint $table) {
            $table->date('ngay_ket_thuc_dieu_tra_1')->after('ngay_ket_thuc_dieu_tra')->nullable();
            $table->date('ngay_ket_thuc_dieu_tra_2')->after('ngay_ket_thuc_dieu_tra_1')->nullable();
            $table->date('ngay_ket_thuc_dieu_tra_3')->after('ngay_ket_thuc_dieu_tra_2')->nullable();
            $table->string('phuong_thuc_pham_toi', 200)->after('loai_toi_pham')->nullable();
            $table->string('noi_thuc_hien_pham_toi', 200)->after('phuong_thuc_pham_toi')->nullable();

            $table->dropColumn([
                'thoi_han_dieu_tra',
                'ngay_gia_han',
                'thoi_gian_gia_han'
            ]);
        });

        Schema::table('vu_viec_nguois', function (Blueprint $table) {
            $table->integer('so_ngay_tam_giu')->after('ngay_tam_giu')->nullable();
            $table->integer('so_ngay_tam_giu_1')->after('so_ngay_tam_giu')->nullable();
            $table->integer('so_ngay_tam_giu_2')->after('so_ngay_tam_giu_1')->nullable();
            $table->date('ngay_ket_thuc_tam_giam')->after('so_ngay_tam_giu_2')->nullable();
            $table->date('ngay_ket_thuc_tam_giam_1')->after('ngay_ket_thuc_tam_giam')->nullable();
            $table->date('ngay_ket_thuc_tam_giam_2')->after('ngay_ket_thuc_tam_giam_1')->nullable();

            $table->dropColumn([
                'thoi_han_gia_han_tam_giu_1',
                'thoi_han_gia_han_tam_giu_2',
                'thoi_han_giam',
                'ngay_gia_han_tam_giam_1',
                'ngay_gia_han_tam_giam_2',
                'thoi_han_gia_han_giam_1',
                'thoi_han_gia_han_giam_2',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
