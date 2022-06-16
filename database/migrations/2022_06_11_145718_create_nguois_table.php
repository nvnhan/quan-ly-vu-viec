<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNguoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nguois', function (Blueprint $table) {
            $table->id();
            $table->string('ho_ten', 50)->nullable();
            $table->string('ten_khac', 50)->nullable();
            $table->string('gioi_tinh', 20)->nullable();

            $table->integer('ngay_sinh')->nullable();
            $table->integer('thang_sinh')->nullable();
            $table->integer('nam_sinh')->nullable();

            $table->string('noi_sinh', 200)->nullable();
            $table->string('thuong_tru', 50)->nullable();
            $table->bigInteger('id_dp_thuong_tru')->unsigned()->nullable();
            $table->string('tam_tru', 50)->nullable();
            $table->bigInteger('id_dp_tam_tru')->unsigned()->nullable();
            $table->string('noi_o_hien_nay', 50)->nullable();
            $table->bigInteger('id_dp_noi_o_hien_nay')->unsigned()->nullable();

            $table->string('sdt', 20)->nullable();
            $table->string('so_dinh_danh', 20)->unique()->nullable();
            $table->string('noi_cap', 50)->nullable();
            $table->date('ngay_cap')->nullable();

            $table->string('quoc_tich', 100)->default('Việt Nam')->nullable();
            $table->string('dan_toc', 100)->nullable();
            $table->string('ton_giao', 100)->nullable();
            $table->string('nghe_nghiep', 100)->nullable();
            $table->string('noi_lam_viec', 200)->nullable();

            $table->string('ho_ten_bo', 50)->nullable();
            $table->string('nam_sinh_bo', 4)->nullable();
            $table->string('ho_ten_me', 50)->nullable();
            $table->string('nam_sinh_me', 4)->nullable();
            $table->string('ho_ten_vo_chong', 50)->nullable();
            $table->string('nam_sinh_vo_chong', 4)->nullable();

            $table->bigInteger('id_dp_thong_bao')->unsigned()->nullable();
            $table->string('don_vi_tra_cuu', 200)->nullable();
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
        Schema::dropIfExists('nguois');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
