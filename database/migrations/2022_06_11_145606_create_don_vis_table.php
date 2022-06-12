<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDonVisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('don_vis', function (Blueprint $table) {
            $table->id();
            $table->string('id_tam', 10);
            $table->string('ten_don_vi', 200);
            $table->bigInteger('id_don_vi_cha')->unsigned()->nullable();
            $table->string('dia_phuong', 10);
            $table->string('loai_don_vi', 100);
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
        Schema::dropIfExists('don_vis');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
