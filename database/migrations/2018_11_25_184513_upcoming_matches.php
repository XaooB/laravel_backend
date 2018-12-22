<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpcomingMatches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upcoming_matches', function (Blueprint $table) {
            $table->increments('id');
            $table->string('League', 45);
            $table->timestamp('Date');
            $table->string('Location', 90);
            $table->unsignedInteger('idClub');
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
        Schema::dropIfExists('upcoming_matches');
    }
}
