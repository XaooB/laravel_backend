<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserArticleLikes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_article_likes', function (Blueprint $table) {
            $table->unsignedInteger('idUser');
            $table->unsignedInteger('idArticle');
            $table->string('Type', 7);
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('idArticle')->references('idArticle')->on('articles')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_article_likes');
    }
}
