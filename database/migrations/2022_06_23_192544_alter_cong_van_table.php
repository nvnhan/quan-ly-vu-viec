<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCongVanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cong_vans', function (Blueprint $table) {
            $table->date('han_tra_loi')->after('id_can_bo')->nullable();
            $table->bigInteger('id_cong_van_cha')->after('id')->unsigned()->nullable();
            $table->foreign('id_cong_van_cha')->references('id')->on('cong_vans')->onDelete('set null');
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
