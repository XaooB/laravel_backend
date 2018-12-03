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
            $table->integer('Position')->nullable();
            $table->integer('Matches')->nullable();
            $table->string('Won')->nullable();
            $table->string('Draw')->nullable();
            $table->string('Lost')->nullable();
            $table->string('Points')->nullable();
            $table->string('Season')->nullable();
            $table->string('League')->nullable();
            $table->string('Group')->nullable();
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
