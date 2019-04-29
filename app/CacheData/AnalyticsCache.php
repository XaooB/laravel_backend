<?php

namespace App\CacheData;

use Analytics;
use Spatie\Analytics\Period;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redis;

class AnalyticsCache
{
	CONST CACHE_KEY = 'ANALYTICS';

	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$VisitorsAndPageViews = Analytics::fetchVisitorsAndPageViews(Period::days($days));
    		$TotalVisitorsAndPageViews = Analytics::fetchTotalVisitorsAndPageViews(Period::days($days));
    		$MostVisitedPages = Analytics::fetchMostVisitedPages(Period::days($days), 3);
    		$panelData = [
        		'visitorsAndPageViews' => $VisitorsAndPageViews->toArray(),
        		'totalVisitorsAndPageViews' => $TotalVisitorsAndPageViews->toArray(),
        		'mostVisitedPages' => $MostVisitedPages->toArray(),
    		];
    		return $panelData;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}