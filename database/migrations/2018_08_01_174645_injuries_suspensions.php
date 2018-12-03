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
        Schema::create('Injuries_Suspensions', function (Blueprint $table) {
            $table->increments('idInjurySuspension');
            $table->unsignedInteger('idUser');
            $table->unsignedInteger('idPlayer');
            $table->string('Type', 32);
            $table->string('Description', 256);
            $table->dateTime('ReturnDate');
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('Injuries_Suspensions');
    }
}
