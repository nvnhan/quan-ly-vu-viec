<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCanBosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('can_bos', function (Blueprint $table) {
            $table->id();
            $table->string('ho_ten', 50)->nullable();
            $table->bigInteger('id_cap_bac')->unsigned()->nullable();
            $table->integer('chuc_vu')->default(0);

            $table->boolean('dieu_tra_vien')->default(false);
            $table->bigInteger('id_don_vi')->unsigned()->nullable();
            $table->string('sdt', 20)->nullable();
            $table->string('dia_chi', 500)->nullable();

            $table->string('ten_dang_nhap', 50)->unique();
            $table->string('mat_khau')->default('$2y$10$VYDferfmJQBX.0D3.jTziu9isw2E.XN3GtRd9Eoscr0Tju1rb83Gi');
            $table->boolean('khoa_tai_khoan')->default(false);
            $table->dateTime('dang_nhap_cuoi')->nullable();
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
        Schema::dropIfExists('can_bos');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
