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
            $table->tinyInteger('Position', 3)->nullable();
            $table->tinyInteger('Matches', 3)->nullable();
            $table->tinyInteger('Won', 3)->nullable();
            $table->tinyInteger('Draw', 3)->nullable();
            $table->tinyInteger('Lost', 3)->nullable();
            $table->tinyInteger('Points', 3)->nullable();
            $table->string('Season', 9)->nullable();
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
