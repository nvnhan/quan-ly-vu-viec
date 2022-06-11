<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCongViecsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cong_viecs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_vu_viec')->unsigned();
            $table->integer('id_nhom_cong_viec')->unsigned()->nullable();

            $table->string('ten_cong_viec', 100)->nullable();
            $table->text('noi_dung')->nullable();
            $table->integer('muc_do_uu_tien')->default(1);

            $table->date('ngay_giao')->nullable();
            $table->date('ngay_het_han')->nullable();
            $table->date('ngay_bat_dau')->nullable();
            $table->date('ngay_ket_thuc')->nullable();
            $table->date('ngay_xac_nhan')->nullable();
            $table->date('ngay_hoan_thanh')->nullable();

            $table->integer('trang_thai')->default(0);
            $table->string('ket_qua', 500)->nullable();
            $table->string('phe_duyet', 500)->nullable();

            $table->integer('id_can_bo')->unsigned()->nullable();
            $table->integer('nguoi_tao')->unsigned();
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
        Schema::dropIfExists('cong_viecs');
    }
}
