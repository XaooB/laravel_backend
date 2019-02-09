<?php

namespace App\CacheData;

use App\Articles;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UsersController;

class ArticlesCache
{
	CONST CACHE_KEY = 'ARTICLES';

	public static function buildArticleData(&$articles, $whereVisible, $whereInColumn, $whereInValues, $orderColumn, $orderValue, $quantity, $articleID, $filterColumn, $phrase)
    {
        if($articleID == null)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where($filterColumn, 'like', '%' . $phrase . '%')->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
            foreach ($articles as $key => $article) 
            {
                if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                UsersController::buildUserData($article->user);
            }
        }
        else
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where('articles.idArticle', $articleID)->first();
            UsersController::buildUserData($articles->user);
        }
    }

	public function latest_main($count)
	{
		$key = 'latest_main.{$count}';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($count) {
			$data_articles = array();
			$data_articles = $this->buildArticleData($articles, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			var_dump($data_articles);
			return $data_articles;
		});
	}

	public function latest($count)
	{
		$key = 'latest.{$count}';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($count) {
			$data_articles = array();
			$data_articles = $this->buildArticleData($articles, [1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $data_articles;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . ".$key";
	}
}