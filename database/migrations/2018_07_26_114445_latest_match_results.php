<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LatestMatchResults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('latest_match_results', function (Blueprint $table) {
            $table->increments('id');
            $table->string('League', 45);
            $table->timestamp('Date');
            $table->string('Location', 45);
            $table->unsignedInteger('idClubHome');
            $table->string('HomeClubScore', 256);
            $table->unsignedInteger('idClubAway');
            $table->string('AwayClubScore', 256);
            $table->string('Type', 45);
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
        Schema::dropIfExists('latest_match_results');
    }
}
