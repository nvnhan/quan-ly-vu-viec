<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableAddColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('can_bos', function (Blueprint $table) {
            $table->string('chuc_danh_lanh_dao', 50)->after('chuc_vu')->nullable();
        });

        Schema::table('nguois', function (Blueprint $table) {
            $table->string('giay_dinh_danh', 50)->after('sdt')->nullable();
        });

        Schema::table('vu_viecs', function (Blueprint $table) {
            $table->date('ngay_ca_phuong')->after('phan_loai_tin')->nullable();
            $table->date('ngay_cqdt')->after('ngay_ca_phuong')->nullable();
            $table->date('ngay_phan_cong')->after('ngay_cqdt')->nullable();
            $table->string('so_phan_cong', 50)->after('ngay_phan_cong')->nullable();
            $table->string('loai_toi_pham', 50)->after('ma_toi_danh')->nullable();
            $table->string('ket_qua_an', 50)->after('ngay_ket_thuc_dieu_tra')->nullable();
            $table->date('ngay_lap_ho_so')->after('so_ho_so')->nullable();
        });

        Schema::table('vu_viec_nguois', function (Blueprint $table) {
            $table->string('truong_hop_bat', 50)->after('ngay_bat')->nullable();
        });

        Schema::table('don_vis', function (Blueprint $table) {
            $table->string('ma_don_vi', 50)->after('ten_don_vi')->nullable();
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
