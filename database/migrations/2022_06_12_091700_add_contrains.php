<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddContrains extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('can_bos', function (Blueprint $table) {
            $table->foreign('id_cap_bac')->references('id')->on('cap_bacs');
            $table->foreign('id_don_vi')->references('id')->on('don_vis')->onDelete('set null');
        });

        Schema::table('don_vis', function (Blueprint $table) {
            $table->foreign('id_don_vi_cha')->references('id')->on('don_vis')->onDelete('cascade');
            $table->foreign('dia_phuong')->references('id')->on('quan_huyens')->onDelete('cascade');
        });

        Schema::table('quan_huyens', function (Blueprint $table) {
            $table->foreign('id_tinh')->references('id')->on('tinhs')->onDelete('cascade');
        });

        Schema::table('vu_viecs', function (Blueprint $table) {
            // $table->foreign('id_dp_xay_ra')->references('id')->on('don_vis')->onDelete('set null');
            $table->foreign('ma_toi_danh')->references('ma_toi_danh')->on('toi_danhs');
            $table->foreign('id_dtv_chinh')->references('id')->on('can_bos')->onDelete('set null');
            $table->foreign('id_can_bo_chinh')->references('id')->on('can_bos')->onDelete('set null');
            $table->foreign('nguoi_tao')->references('id')->on('can_bos')->onDelete('set null');
        });

        Schema::table('nguois', function (Blueprint $table) {
            $table->foreign('id_dp_thuong_tru')->references('id')->on('don_vis')->onDelete('set null');
            $table->foreign('id_dp_tam_tru')->references('id')->on('don_vis')->onDelete('set null');
            $table->foreign('id_dp_noi_o_hien_nay')->references('id')->on('don_vis')->onDelete('set null');
            $table->foreign('id_dp_thong_bao')->references('id')->on('don_vis')->onDelete('set null');
        });

        Schema::table('vu_viec_nguois', function (Blueprint $table) {
            $table->foreign('id_vu_viec')->references('id')->on('vu_viecs')->onDelete('cascade');
            $table->foreign('id_nguoi')->references('id')->on('nguois')->onDelete('cascade');

            $table->foreign('ma_toi_danh')->references('ma_toi_danh')->on('toi_danhs');
        });

        Schema::table('cong_viecs', function (Blueprint $table) {
            $table->foreign('id_vu_viec')->references('id')->on('vu_viecs')->onDelete('cascade');
            $table->foreign('id_nhom_cong_viec')->references('id')->on('nhom_cong_viecs')->onDelete('set null');

            $table->foreign('id_can_bo')->references('id')->on('can_bos')->onDelete('set null');
            $table->foreign('nguoi_tao')->references('id')->on('can_bos')->onDelete('set null');
        });

        Schema::table('cong_viec_khoi_taos', function (Blueprint $table) {
            $table->foreign('id_nhom_cong_viec')->references('id')->on('nhom_cong_viecs');
        });

        Schema::table('tai_lieus', function (Blueprint $table) {
            $table->foreign('id_vu_viec')->references('id')->on('vu_viecs');
            $table->foreign('id_cong_viec')->references('id')->on('cong_viecs')->onDelete('set null');
            $table->foreign('nguoi_tao')->references('id')->on('can_bos');
        });

        Schema::table('cong_vans', function (Blueprint $table) {
            $table->foreign('id_vu_viec')->references('id')->on('vu_viecs')->onDelete('set cascade');
            $table->foreign('id_can_bo')->references('id')->on('can_bos')->onDelete('set null');
            $table->foreign('nguoi_tao')->references('id')->on('can_bos')->onDelete('set null');
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
