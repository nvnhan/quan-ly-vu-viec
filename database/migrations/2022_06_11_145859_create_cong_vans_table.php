<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCongVansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cong_vans', function (Blueprint $table) {
            $table->id();
            $table->string('tieu_de', 100)->nullable();
            $table->string('loai_cong_van', 50)->nullable();
            $table->string('so_hieu', 50)->nullable();
            $table->date('ngay_ban_hanh')->nullable();
            $table->string('co_quan_ban_hanh', 200)->nullable();

            $table->integer('id_vu_viec')->unsigned()->nullable();
            $table->integer('id_can_bo')->unsigned()->nullable();
            $table->string('ket_qua_xu_ly', 500)->nullable();
            $table->date('ngay_xu_ly')->nullable();

            $table->integer('nguoi_tao')->unsigned()->nullable();
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
        Schema::dropIfExists('cong_vans');
    }
}
