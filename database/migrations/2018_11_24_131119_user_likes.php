<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserLikes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_likes', function (Blueprint $table) {
            $table->unsignedInteger('idUser');
            $table->unsignedInteger('idReference');
            $table->string('Type', 45);
            $table->string('Reaction', 15);
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idReference')->references('idArticle')->on('articles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_likes');
    }
}
