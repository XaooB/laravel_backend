<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Notifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('idNotification');
            $table->unsignedInteger('idUser');
            $table->unsignedInteger('idReference');
            $table->unsignedInteger('idSubReference');
            $table->string('Type', 45);
            $table->tinyInteger('Readed');
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('idReference')->references('idReference')->on('comments')->onDelete('cascade');
            $table->foreign('idSubReference')->references('idComment')->on('comments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
