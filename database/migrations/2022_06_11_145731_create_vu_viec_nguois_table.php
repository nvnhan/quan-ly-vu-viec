<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVuViecNguoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vu_viec_nguois', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_vu_viec')->unsigned();
            $table->bigInteger('id_nguoi')->unsigned();
            $table->integer('tu_cach_to_tung');

            $table->string('hanh_vi', 200)->nullable();
            $table->text('loi_khai')->nullable();
            $table->string('ma_toi_danh_bc', 10)->nullable();

            $table->dateTime('ngay_xay_ra_bc')->nullable();
            $table->string('noi_xay_ra_bc', 200)->nullable();

            $table->date('ngay_bat')->nullable();
            $table->date('ngay_tam_giu')->nullable();
            $table->string('thoi_han_gia_han_tam_giu_1', 6)->nullable();
            $table->string('thoi_han_gia_han_tam_giu_2', 6)->nullable();

            $table->date('ngay_tam_giam')->nullable();
            $table->string('thoi_han_giam', 6)->nullable();
            $table->date('ngay_gia_han_tam_giam_1')->nullable();
            $table->string('thoi_han_gia_han_giam_1', 6)->nullable();
            $table->date('ngay_gia_han_tam_giam_2')->nullable();
            $table->string('thoi_han_gia_han_giam_2', 6)->nullable();

            $table->date('ngay_khoi_to_bc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('vu_viec_nguois');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
