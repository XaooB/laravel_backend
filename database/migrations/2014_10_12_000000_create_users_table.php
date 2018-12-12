<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('Name', 45)->unique();
            $table->string('Email', 90)->unique();
            $table->string('Image', 256)->default('http://pw-inz.cba.pl/inz_be/public/images/default_icon.png');
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->unsignedInteger('idPrivilege')->default(1);
            $table->unsignedInteger('idStatus')->default(1);
            $table->timestamps();
            $table->foreign('idPrivilege')->references('idPrivilege')->on('privileges')->onDelete('cascade');
            $table->foreign('idStatus')->references('idStatus')->on('statuses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
