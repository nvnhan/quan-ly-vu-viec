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
            $table->integer('id_vu_viec')->unsigned();
            $table->integer('id_nguoi')->unsigned();
            $table->integer('tu_cach_to_tung');

            $table->string('hanh_vi', 200)->nullable();
            $table->text('loi_khai')->nullable();
            $table->string('ma_toi_danh', 10)->nullable();

            $table->dateTime('ngay_xay_ra')->nullable();
            $table->string('noi_xay_ra', 200)->nullable();

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

            $table->string('don_vi_tra_cuu', 200)->nullable();
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
        Schema::dropIfExists('vu_viec_nguois');
    }
}
