<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNgayKetThucTamGiu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vu_viec_nguois', function (Blueprint $table) {
            $table->date('ngay_ket_thuc_tam_giu')->after('ngay_tam_giu')->nullable();
            $table->date('ngay_ket_thuc_tam_giu_1')->after('ngay_ket_thuc_tam_giu')->nullable();
            $table->date('ngay_ket_thuc_tam_giu_2')->after('ngay_ket_thuc_tam_giu_1')->nullable();

            $table->dropColumn([
                'so_ngay_tam_giu',
                'so_ngay_tam_giu_1',
                'so_ngay_tam_giu_2'
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
