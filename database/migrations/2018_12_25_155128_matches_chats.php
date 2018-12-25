<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MatchesChats extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches_chats', function (Blueprint $table) {
            $table->increments('idMatchChat');
            $table->unsignedInteger('idReference');
            $table->unsignedInteger('idUser');
            $table->text('Content');
            $table->boolean('Visible')->default(1);
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idReference')->references('id')->on('matches')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches_chats');
    }
}
