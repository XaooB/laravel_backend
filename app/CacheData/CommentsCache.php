<?php

namespace App\CacheData;

use App\Comments;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CommentsController;

class CommentsCache
{
	CONST CACHE_KEY = 'COMMENTS';

	public function get_article_comments($id)
	{
		$key = 'article_comments.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(5), function() use($id) {
			$articleComments = array();
        	CommentsController::buildComment($id, 0, $articleComments, [1], 'article', 'idComment', 'desc');
        	return $articleComments;
		});
	}

	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$latestComments = DB::table('comments')->select('idComment as idcomment', 'idReference as idarticle', 'idUser as user', 'Content as content', 'created_at as create_date', 'updated_at as modify_date')->orderBy('comments.created_at', 'desc')->limit(3)->get();
        	foreach ($latestComments as $key => $comment) {
        	    UsersController::buildUserData($comment->user, 'id');
        	}
        	$weekSum = DB::table('comments')->select(DB::raw('date(created_at) as day, count(*) as total_comments'))->where(DB::raw('DATEDIFF(NOW(), comments.created_at)'), '<', $days)->groupBy(DB::raw('day'))->get();
        	$weekSummary = array();
        	$to = date('Y-m-d', time());
        	$from = date('Y-m-d',(strtotime('-' . $days+1 . 'day', strtotime($to))));
        	for($from; $from <= $to; $from = date('Y-m-d',(strtotime( '+1 day', strtotime($from)))))
        	{
        	    $data = $weekSum->where('day', $from)->first();
        	    $count = isset($data->total_comments) ? $data->total_comments : 0;
        	    array_push($weekSummary, ['day' => $from, 'comments_count' => $count]);
        	}
        	$panelData = [
        	    'weekSummary' => $weekSummary,
        	   	'latestComments' => $latestComments->toArray(),
        	    'totalComments' => Comments::count()
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