<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dois', function (Blueprint $table) {
            $table->id();
            $table->string('id_tam', 10);
            $table->string('ten_doi', 200);
            $table->string('id_huyen', 10);
            $table->string('loai', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dois');
    }
}
