<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSurveySetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survey_sets', function (Blueprint $table) {
            $table->increments('idSurveySet');
            $table->unsignedInteger('idSurvey');
            $table->string('Answer', 60);
            $table->timestamps();
            $table->foreign('idSurvey')->references('idSurvey')->on('surveys')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survey_sets');
    }
}
