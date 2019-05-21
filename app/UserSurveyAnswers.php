<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSurveyAnswers extends Model
{
	protected $primaryKey = 'idUserSurveyAnswer';

    protected $table = 'user_survey_answers';

    protected $fillable = ['idUser', 'idSurvey', 'idSurveySet'];
}
