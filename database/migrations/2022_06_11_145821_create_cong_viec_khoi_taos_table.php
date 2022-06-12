<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCongViecKhoiTaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cong_viec_khoi_taos', function (Blueprint $table) {
            $table->id();
            $table->string('loai_vu_viec', 10)->default('AĐ');
            $table->bigInteger('id_nhom_cong_viec')->unsigned();

            $table->string('ten_cong_viec', 100);
            $table->string('thoi_han', 6)->nullable();
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
        Schema::dropIfExists('cong_viec_khoi_taos');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
