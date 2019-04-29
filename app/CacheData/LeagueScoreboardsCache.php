<?php

namespace App\CacheData;

use App\LeagueScoreboard;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\LeagueScoreboardController;
use Illuminate\Support\Facades\Redis;

class LeagueScoreboardsCache
{
	CONST CACHE_KEY = 'LEAGUE_SCOREBOARD';

	public function league_scoreboard($season, $league)
	{
		$key = '.' . $season . '.' . $league;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($season, $league) {
			LeagueScoreboardController::buildScoreboardData($scoreboard, $season, $league);
			return $scoreboard;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}