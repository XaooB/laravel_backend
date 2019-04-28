<?php

namespace App\CacheData;

use App\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ArticlesController;

class UsersCache
{
	CONST CACHE_KEY = 'USERS';

	public function by_id($id)
	{
		$key = 'by_id.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addHours(1), function() use($id) {
			$user = $id;
			UsersController::buildUserData($user, 'id');
			return $user;
		});
	}

	public function by_name($name)
	{
		$key = 'by_name.' . $name;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addHours(1), function() use($name) {
			$user = $name;
			UsersController::buildUserData($user, 'Name');
			return $user;
		});
	}

	public function by_email($email)
	{
		$key = 'by_email.' . $email;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addHours(1), function() use($email) {
			$user = $email;
			UsersController::buildUserData($user, 'Email');
			return $user;
		});
	}

	public function profile($id)
	{
		$key = 'profile.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(10), function() use($id) {
			$likedArticles = DB::table('articles')->rightJoin('user_likes', 'user_likes.idReference', '=', 'articles.idarticle')->leftJoin('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->distinct()->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->where('user_likes.idUser', $id)->get();
			$latestComments = DB::table('comments')->select('idComment as idcomment', 'idReference as idarticle', 'Content as content', 'created_at as create_date', 'updated_at as modify_date')->where('idUser', $id)->orderBy('comments.created_at', 'desc')->limit(7)->get();
			$userProfile = [
				'likedArticles' => $likedArticles,
				'latestComments' => $latestComments
			];
			return $userProfile;
		});
	}

	public function list($from, $quantity)
	{
		$key = 'list.' . $from . '.' . $quantity;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($from, $quantity) {
			$users = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'statuses.Name as status', 'users.created_at as create_date')->where('privileges.Name', '!=', 'root')->whereIn('statuses.Name', ['aktywny', 'zablokowany'])->orderBy('idUser', 'desc')->skip($from)->take($quantity)->get();
			return $users;
		});
	}

	public function paginate($count, $page)
	{
		$key = 'paginate.' . $count . '.' . $page;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($count, $page) {
			$users = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'statuses.Name as status', 'users.created_at as create_date')->where('privileges.Name', '!=', 'root')->whereIn('statuses.Name', ['aktywny', 'zablokowany'])->orderBy('idUser', 'desc')->paginate($count);
			return $users;
		});
	}
	
	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$latestUsers = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'privileges.Tier as tier', 'statuses.Name as status', DB::raw('(select count(*) from articles where articles.idUser = users.id) as articles_count'), DB::raw('(select count(*) from comments where comments.idUser = users.id) as comments_count'), 'users.created_at as create_date')->orderBy('users.created_at', 'desc')->limit(3)->get();
        	$weekSum = DB::table('users')->select(DB::raw('date(created_at) as day, count(*) as total_users'))->where(DB::raw('DATEDIFF(NOW(), users.created_at)'), '<', $days)->groupBy(DB::raw('day'))->get();
        	$weekSummary = array();
        	$to = date('Y-m-d', time());
        	$from = date('Y-m-d',(strtotime('-' . $days+1 . 'day', strtotime($to))));
        	for($from; $from <= $to; $from = date('Y-m-d',(strtotime( '+1 day', strtotime($from)))))
        	{
        	    $data = $weekSum->where('day', $from)->first();
        	    $count = isset($data->total_users) ? $data->total_users : 0;
        	    array_push($weekSummary, ['day' => $from, 'users_count' => $count]);
        	}
        	$panelData = [
        	    'weekSummary' => $weekSummary,
        	    'latestUsers' => $latestUsers->toArray(),
        	    'totalUsers' => User::count()
        	];
			return $panelData;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}

	public function removeFromCache($id)
	{
		$key = 'by_id.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->forget($cacheKey);
	}
}