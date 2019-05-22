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
            $table->unsignedInteger('idClub');
            $table->tinyInteger('Position');
            $table->tinyInteger('Matches');
            $table->tinyInteger('Won');
            $table->tinyInteger('Draw');
            $table->tinyInteger('Lost');
            $table->tinyInteger('Points');
            $table->string('Season', 9);
            $table->string('League', 4);
            $table->string('Group', 8)->nullable();
            $table->timestamps();
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
