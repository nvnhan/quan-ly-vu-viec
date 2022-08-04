<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('nguois', function (Blueprint $table) {
            $table->text('tats')->after('don_vi_tra_cuu')->nullable();
        });

        Schema::table('cong_vans', function (Blueprint $table) {
            $table->string('mo_ta', 200)->after('tieu_de')->nullable();
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
