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

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}