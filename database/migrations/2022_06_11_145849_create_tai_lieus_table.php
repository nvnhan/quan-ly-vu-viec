<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaiLieusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tai_lieus', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_vu_viec')->unsigned();
            $table->bigInteger('id_cong_viec')->unsigned()->nullable();
            $table->string('ten_tai_lieu', 100);
            $table->text('noi_dung')->nullable();
            $table->string('ten_file', 200)->nullable();

            $table->bigInteger('nguoi_tao')->unsigned();
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
        Schema::dropIfExists('tai_lieus');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
