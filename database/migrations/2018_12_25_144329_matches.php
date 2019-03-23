<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Matches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->increments('id');
            $table->string('League', 45);
            $table->timestamp('Date');
            $table->string('Location', 45);
            $table->unsignedInteger('idClubHome');
            $table->tinyInteger('HomeClubScore')->nullable();
            $table->unsignedInteger('idClubAway');
            $table->tinyInteger('AwayClubScore')->nullable();
            $table->string('Type', 45);
            $table->string('Season', 9);
            $table->timestamps();
            $table->foreign('idClubHome')->references('idClub')->on('clubs')->onDelete('cascade');
            $table->foreign('idClubAway')->references('idClub')->on('clubs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
