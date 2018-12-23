<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeagueScoreboardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('league_scoreboards', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('idClub')->nullable();
            $table->tinyInteger('Position')->nullable();
            $table->tinyInteger('Matches')->nullable();
            $table->tinyInteger('Won')->nullable();
            $table->tinyInteger('Draw')->nullable();
            $table->tinyInteger('Lost')->nullable();
            $table->tinyInteger('Points')->nullable();
            $table->string('Season')->nullable();
            $table->string('League', 4)->nullable();
            $table->string('Group', 8)->nullable();
            $table->foreign('idClub')->references('idClub')->on('clubs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('league_scoreboards');
    }
}
