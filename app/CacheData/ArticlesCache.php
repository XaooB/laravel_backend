<?php

namespace App\CacheData;

use App\Articles;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\ArticlesController;

class ArticlesCache
{
	CONST CACHE_KEY = 'ARTICLES';

	public function latest_main($count)
	{
		$key = 'latest_main.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($count) {
			ArticlesController::buildArticleData($articles_latest_main, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest_main;
		});
	}	

	public function latest($count)
	{
		$key = 'latest_plain.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($count) {
			ArticlesController::buildArticleData($articles_latest, [1], 'articles.Main', [0], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}