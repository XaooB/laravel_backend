<?php

namespace App\CacheData;

use App\Categories;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoriesCache
{
	CONST CACHE_KEY = 'CATEGORIES';

	public function index()
	{
		$key = 'index';
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() {
			$categories = DB::table('categories')->select('idCategory as idcategory', 'Name as name')->get();
			return $categories;
		});
	}

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}
}