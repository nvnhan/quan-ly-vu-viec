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
            $table->integer('id_vu_viec')->unsigned();
            $table->integer('id_cong_viec')->unsigned()->nullable();
            $table->string('ten_tai_lieu', 100);
            $table->text('noi_dung')->nullable();
            $table->string('ten_file', 200);

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
        Schema::dropIfExists('tai_lieus');
    }
}
