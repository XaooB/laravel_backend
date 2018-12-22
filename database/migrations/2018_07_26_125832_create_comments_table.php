<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('idComment');
            $table->unsignedInteger('idReference');
            $table->unsignedInteger('idSubReference')->nullable();
            $table->string('Type', 45);
            $table->unsignedInteger('idUser');
            $table->text('Content');
            $table->boolean('Visible')->default(1);
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('idReference')->references('idArticle')->on('articles')->onDelete('cascade');
			//$table->foreign('idReference')->references('id')->on('latest_match_results')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
