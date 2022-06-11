<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVanBanPhapLuatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('van_ban_phap_luats', function (Blueprint $table) {
            $table->id();
            $table->string('ten_van_ban', 100)->nullable();
            $table->string('phan_loai', 50)->nullable();
            $table->string('so_hieu', 50)->nullable();
            $table->string('co_quan_ban_hanh', 200)->nullable();
            $table->date('ngay_ban_hanh')->nullable();
            $table->string('ten_file', 200)->nullable();
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
        Schema::dropIfExists('van_ban_phap_luats');
    }
}
