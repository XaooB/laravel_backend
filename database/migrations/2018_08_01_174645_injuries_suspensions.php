<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InjuriesSuspensions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('injuries_suspensions', function (Blueprint $table) {
            $table->increments('idInjurySuspension');
            $table->unsignedInteger('idPlayer');
            $table->string('Type', 32);
            $table->string('Description', 256);
            $table->dateTime('ReturnDate');
            $table->timestamps();
            $table->foreign('idPlayer')->references('idPlayer')->on('players')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('injuries_suspensions');
    }
}
