<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('idArticle');
            $table->unsignedInteger('idCategory');
            $table->unsignedInteger('idUser');
            $table->string('Title', 90);
            $table->string('Image', 256)->nullable();
            $table->longText('Content');
            $table->unsignedInteger('Views')->nullable();
            $table->tinyInteger('Visible')->default(1);
            $table->tinyInteger('Main')->default(0);
            $table->timestamps();
            $table->foreign('idCategory')->references('idCategory')->on('categories')->onDelete('cascade');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
        });

        DB::statement('ALTER TABLE articles ADD FULLTEXT fulltext_index (Title, Content)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
