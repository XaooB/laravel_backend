<?php

namespace App\CacheData;

use App\Matches;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\MatchesController;

class MatchesCache
{
	CONST CACHE_KEY = 'MATCHES';

	public function next_match_date($count)
	{
		$key = 'scheduled.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($count) {
			MatchesController::buildMatchData($scheduled, 'SCHEDULED', $count, 'asc');
			return $scheduled;
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
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
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