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
            // $table->string('loai_cong_van', 50)->nullable();
            $table->string('so_hieu', 50)->nullable();
            $table->date('ngay_ban_hanh')->nullable();

            $table->string('co_quan_nhan', 200)->nullable();
            $table->string('so_cong_van_phan_hoi', 50)->nullable();
            $table->date('ngay_phan_hoi')->nullable();
            $table->string('noi_dung_phan_hoi', 500)->nullable();

            $table->bigInteger('id_vu_viec')->unsigned();
            $table->bigInteger('id_can_bo')->unsigned()->nullable();
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
        Schema::dropIfExists('cong_vans');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
