<?php

namespace App\CacheData;

use App\InjuriesSuspensions;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\InjuriesSuspensionsController;
use Illuminate\Support\Facades\Redis;

class InjuriesSuspensionsCache
{
	CONST CACHE_KEY = 'INJURY_SUSPENSION';

	public function latest_injuries($count)
	{
		$key = 'latest_injuries.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($count) {
			InjuriesSuspensionsController::buildInjurySuspensionData($injurysuspension, 'injury', $count);
			return $injurysuspension;
		});
	}

	public function latest_suspensions($count)
	{
		$key = 'latest_suspensions.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() use($count) {
			InjuriesSuspensionsController::buildInjurySuspensionData($injurysuspension, 'suspension', $count);
			return $injurysuspension;
		});
	}

	public function actual()
	{
		$key = 'actual';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(30), function() {
			InjuriesSuspensionsController::buildInjurySuspensionData($injurysuspension, 'actual', null);
			return $injurysuspension;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}