<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAnhColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('nguois', function (Blueprint $table) {
            $table->string('ten_file', 200)->after('gioi_tinh')->nullable();
        });
        Schema::table('vu_viecs', function (Blueprint $table) {
            $table->string('so_ho_so_luu', 100)->after('ngay_dang_ky_ho_so')->nullable();
            $table->date('ngay_nop_luu')->after('so_ho_so_luu')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
