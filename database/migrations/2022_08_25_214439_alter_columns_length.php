<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterColumnsLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('nguois', function (Blueprint $table) {
            $table->string('noi_sinh', 1000)->change();
            $table->string('thuong_tru', 500)->change();
            $table->string('tam_tru', 500)->change();
            $table->string('noi_o_hien_nay', 500)->change();
            $table->string('noi_cap', 500)->change();
            $table->string('noi_lam_viec', 500)->change();
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
