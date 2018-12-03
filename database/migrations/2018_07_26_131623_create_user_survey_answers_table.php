<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSurveyAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_survey_answers', function (Blueprint $table) {
            $table->unsignedInteger('idUser');
            $table->unsignedInteger('idSurveySet');
            $table->timestamps();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('idSurveySet')->references('idSurveySet')->on('survey_sets')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_survey_answers');
    }
}
