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
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(5), function() use($count) {
			ArticlesController::buildArticleData($articles_latest_main, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest_main;
		});
	}	

	public function latest($count)
	{
		$key = 'latest_plain.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(5), function() use($count) {
			ArticlesController::buildArticleData($articles_latest, [1], 'articles.Main', [0], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest;
		});
	}

	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$articlesByCategory = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->select('categories.Name as category', DB::raw('count(*) as articles_count'))->groupBy('categories.Name')->get();
            ArticlesController::buildArticleData($latestArticles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', 3, null, 'articles.Title', '');
            $weekSum = DB::table('articles')->select(DB::raw('date(created_at) as day, count(*) as total_articles'))->where(DB::raw('DATEDIFF(NOW(), articles.created_at)'), '<', $days)->groupBy(DB::raw('day'))->get();
            $weekSummary = array();
            $to = date('Y-m-d', time());
            $from = date('Y-m-d',(strtotime('-' . $days+1 . 'day', strtotime($to))));
            for($from; $from <= $to; $from = date('Y-m-d',(strtotime( '+1 day', strtotime($from)))))
            {
                $data = $weekSum->where('day', $from)->first();
                $count = isset($data->total_comments) ? $data->total_articles : 0;
                array_push($weekSummary, ['day' => $from, 'articles_count' => $count]);
            }
            $panelData = [
                'weekSummary' => $weekSummary,
                'latestArticles' => $latestArticles->toArray(),
                'articlesByCategory' => $articlesByCategory->toArray(),
                'totalArticles' => Articles::count()
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