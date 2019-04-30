<?php

namespace App\CacheData;

use App\Matches;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\MatchesController;
use Illuminate\Support\Facades\Redis;

class MatchesCache
{
	CONST CACHE_KEY = 'MATCHES';

	public static function next_match_date()
	{
		$key = 'next_match_date';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() {
			if(DB::table('matches')->select('Date')->where(DB::raw('Date BETWEEN DATE_ADD(NOW(), INTERVAL -1 HOUR) AND DATE_ADD(NOW(), INTERVAL 4 HOUR)'))->orderBy('Date', 'asc')->count() > 0)
				$next_match_date = DB::table('matches')->select('Date')->where(DB::raw('Date BETWEEN DATE_ADD(NOW(), INTERVAL -1 HOUR) AND DATE_ADD(NOW(), INTERVAL 4 HOUR)'))->orderBy('Date', 'asc')->value('Date');
			else
				$next_match_date = null;
			return $next_match_date;
		});
	}

	public function scheduled_matches($count)
	{
		$key = 'scheduled.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($count) {
			MatchesController::buildMatchData($scheduled, 'SCHEDULED', $count, 'asc');
			return $scheduled;
		});
	}

	public function live_match()
	{
		$key = 'live';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(3), function() {
			MatchesController::buildMatchData($live, 'LIVE', 1, 'desc');
			return $live;
		});
	}

	public function finished_match()
	{
		$key = 'finished.1';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
			MatchesController::buildMatchData($finished, 'FINISHED', 1, 'desc');
			return $finished;
		});
	}

	public function finished_matches($count)
	{
		$key = 'finished.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($count) {
			MatchesController::buildMatchData($finished, 'FINISHED', $count, 'desc');
			return $finished;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}