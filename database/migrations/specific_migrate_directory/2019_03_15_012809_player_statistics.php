<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PlayerStatistics extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_statistics', function (Blueprint $table) {
            $table->increments('idPlayerStatistics');
            $table->unsignedInteger('idPlayer');
            $table->unsignedInteger('idStatistics');
            $table->string('Value', 10);
            $table->string('Season', 9);
            $table->timestamps();
            $table->foreign('idPlayer')->references('idPlayer')->on('players')->onDelete('cascade');
            $table->foreign('idStatistics')->references('idStatistics')->on('statistics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_statistics');
    }
}
