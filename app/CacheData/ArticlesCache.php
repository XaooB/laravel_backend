<?php

namespace App\CacheData;

use App\Articles;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\ArticlesController;

class ArticlesCache
{
	CONST CACHE_KEY = 'ARTICLES';

	public function article($id, $user)
	{
		$key = 'article.' . $id . '.' . $user;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($id, $user) {
            if(Articles::where('idArticle', $id)->where('Visible', 1)->count())
            {
                ArticlesController::buildArticleData($article, [1], 'Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '');
                Articles::where('idArticle', $id)->increment('Views', 1);
                if($user != 'none')
                {
                    // sprawdzenie czy użytkownik którego dane sesji zostały przesłane polubił dany artykuł
                    if(DB::table('user_likes')->where('Type', 'article')->where('Reaction', 'like')->where('idReference', $id)->where('idUser', $user)->count())
                        $article->liked = true;
                    else
                        $article->liked = false;
                }
                else
                    $article->liked = false;
            }
          	return $article;
		});
	}

	public function latest_main($count)
	{
		$key = 'latest_main.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($count) {
			ArticlesController::buildArticleData($articles_latest_main, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest_main;
		});
	}	

	public function latest($count)
	{
		$key = 'latest_plain.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($count) {
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

	public function neighbours($id)
	{
		$key = 'neighbours.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($id) {
            $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '<', $id)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '>', $id)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            if($idPrev && $idNext)
                $ids = [$idPrev, $id, $idNext];
            elseif($idPrev)
            {
                $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '<', $idPrev)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
            }
            elseif($idNext)
            {
                $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '>', $idNext)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
            }
            $articles = ArticlesController::BuildNeighboursData($ids);
            return $articles;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}