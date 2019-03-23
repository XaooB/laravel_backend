<?php

namespace App\CacheData;

use App\Surveys;
use App\SurveySets;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\SurveySetsController;

class SurveysCache
{
	CONST CACHE_KEY = 'SURVEYS';

	public function latest()
	{
		$key = 'latest';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
			$latestSurvey = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->orderBy('idSurvey', 'desc')->first();
        	$latestSurvey->answers = array();
        	SurveySetsController::getAnswers($latestSurvey->answers, $latestSurvey->idsurvey);
			return $latestSurvey;
		});
	}

	public function get_survey($id)
	{
		$key = 'get_survey.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($id) {
			$survey_set = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->where('idSurvey', $id)->first();
        	$survey_set->answers = array();
        	$this->getAnswers($survey_set->answers, $survey_set->idsurvey);
			return $survey_set;
		});
	}

	public function index()
	{
		$key = 'index';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
			$surveys = Surveys::all();
			return $surveys;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}