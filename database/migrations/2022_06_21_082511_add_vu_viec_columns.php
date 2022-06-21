<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVuViecColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vu_viecs', function (Blueprint $table) {
            $table->string('ten_vu_viec', 500)->after('id')->nullable();
            $table->string('khu_vuc_xay_ra', 200)->after('dp_xay_ra')->nullable();
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
