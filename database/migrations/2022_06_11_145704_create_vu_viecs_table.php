<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVuViecsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vu_viecs', function (Blueprint $table) {
            $table->id();
            $table->string('loai_vu_viec', 10)->default('AĐ');
            $table->string('phan_loai_tin', 50)->nullable();

            $table->string('thoi_diem_xay_ra', 200)->nullable();
            $table->string('noi_xay_ra', 200)->nullable();
            $table->string('dp_xay_ra', 200)->nullable();
            $table->string('noi_dung_tom_tat', 200)->nullable();

            $table->date('ngay_keo_dai')->nullable();
            $table->string('ket_qua_giai_quyet', 200)->nullable();
            $table->date('ngay_ket_thuc_1')->nullable();
            $table->date('ngay_gia_han_xac_minh')->nullable();

            $table->date('ngay_ket_thuc_2')->nullable();
            $table->date('ngay_phuc_hoi')->nullable();
            $table->date('ngay_ket_thuc_phuc_hoi')->nullable();

            $table->string('ma_toi_danh', 10)->nullable();
            $table->date('ngay_khoi_to')->nullable();
            $table->string('thoi_han_dieu_tra', 6)->nullable();
            $table->date('ngay_gia_han')->nullable();
            $table->string('thoi_gian_gia_han', 6)->nullable();

            $table->date('ngay_ket_thuc_dieu_tra')->nullable();

            $table->string('so_ho_so', 100)->nullable();
            $table->date('ngay_dang_ky_ho_so')->nullable();
            $table->bigInteger('id_dtv_chinh')->unsigned()->nullable();
            $table->bigInteger('id_can_bo_chinh')->unsigned()->nullable();

            $table->bigInteger('nguoi_tao')->unsigned()->nullable();
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
        Schema::dropIfExists('vu_viecs');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
