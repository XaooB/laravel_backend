<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Articles;
use App\Http\Resources\Articles as ArticlesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CloudinaryController;
use Facades\App\CacheData\ArticlesCache;

if(!isset($_SESSION)) { session_start(); } 

class ArticlesController extends Controller
{
    public static function buildArticleData(&$articles, $whereVisible, $whereInColumn, $whereInValues, $orderColumn, $orderValue, $quantity, $articleID, $filterColumn, $phrase)
    {
        if($articleID == null)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where($filterColumn, 'like', '%' . $phrase . '%')->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
            foreach ($articles as $key => $article) 
            {
                if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                UsersController::buildUserData($article->user, 'id');
            }
        }
        else
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where('articles.idArticle', $articleID)->first();
            UsersController::buildUserData($articles->user, 'id');
        }
    }

    public static function escapeLike($str) 
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $str);
    }

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            if(isset($_SESSION['iduser']))
            {
                if(Articles::where('idUser', $_SESSION['iduser'])->count() > 0)
                    $this->buildArticleData($articles, [0, 1], 'articles.idUser', [$_SESSION['iduser']], 'articles.idArticle', 'desc', null, null, 'articles.Title', '');
                else
                    $this->buildArticleData($articles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', null, null, 'articles.Title', '');
                return response()->json($articles);
            }
        }

        public function latest_main($count)
        {
            if($count > 0)
            {
                $articles = ArticlesCache::latest_main($count);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function latest($count)
        {
            if($count > 0)
            {
                $articles = ArticlesCache::latest($count);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function most_viewed($count, $interval)
        {
            if($count > 0)
            {
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', [1])->where(DB::raw('DATEDIFF(NOW(), articles.created_at)'), '<', $interval)->get();         
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function show_article($id)
        {
            if(isset($_SESSION['iduser']))
                $user = $_SESSION['iduser'];
            else
                $user = 'none';
            $articles = ArticlesCache::article($id, $user);
            return response()->json($articles);
        }

        public static function BuildNeighboursData($ids)
        {
            $articles = array();
            self::buildArticleData($articles, [1], 'articles.idArticle', $ids, 'articles.idArticle', 'asc', 3, null, 'articles.Title', '');
            return $articles;
        }

        public function show_neighbours($id)
        {
            $articles = ArticlesCache::neighbours($id);
            return response()->json($articles);
        }

        public function filtrate($count, $phrase)
        {
            if(isset($phrase) && isset($count))
            {
                // uniknięcie zagrożenia SQL Injection
                $fixedPhrase = $this->escapeLike($phrase);
                $articles = array();
                $this->buildArticleData($articles, [1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', $fixedPhrase);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function panel($days)
        {
            $articles = ArticlesCache::panel($days);
            return response()->json($articles);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            //
        }

        /**
         * Store a newly created resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request)
        {
            //if(isset($data['category']) && isset($data['title']) && isset($data['content']) && $request->file('image') != null)
            if(isset($request->category) && isset($request->title) && isset($request->content) && $request->file('image') != null)
            {
                $articles = new Articles;
                $articles->idCategory = $request->category;
                $articles->idUser = $_SESSION['iduser'];
                $articles->Title = $request->title;
                $articles->Content = $request->content;
                $articles->Views = 1;

                $image_name = 'articles' . $_SESSION['iduser'] . time() . $request->category . '.' . $request->file('image')->getClientOriginalExtension();
                $destinationFolder = public_path('images') . '/articles/';
                $request->file('image')->move($destinationFolder, $image_name);
                $path = $destinationFolder . $image_name;

                $articles->Image = CloudinaryController::uploadImage($path, $image_name, 'articles');

                if(Articles::where('Title', $articles->Title)->where('idCategory', $articles->idCategory)->where('idUser', $articles->idUser)->exists()) 
                {
                    return response()->json(['status' => false, 'error' => 'wrong data'], 204);
                }
                else
                {
                    if($articles->save())
                    {
                        return response()->json(['status' => true, 'error' => ''], 201);
                    }
                    else
                        return response()->json(['status' => false, 'error' => 'wrong data'], 204);
                }
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            else
                return response()->json(['status' => false, 'error' => $request]);
        }

        /**
         * Display the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function show($id)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function edit($id)
        {
            //
        }

        /**
         * Update the specified resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, $id)
        {
            if(isset($request->category) && isset($request->title) && isset($request->content))
            {
                if($request->file('image') != null)
                {
                    $image_name = 'articles' . $_SESSION['iduser'] . time() . $request->category . '.' . $request->file('image')->getClientOriginalExtension();
                    $destinationFolder = public_path('images') . '/articles/';
                    $request->file('image')->move($destinationFolder, $image_name);
                    $path = $destinationFolder . $image_name;

                    $articleImage = CloudinaryController::uploadImage($path, $image_name, 'articles'); 
                }
                if(Articles::where('idArticle', $id)->update([
                    'idCategory' => $request->category,
                    'Title' => $request->title,
                    'Content' => $request->content,
                    'Image' => $articleImage]))
                	return response()->json(['status' => true, 'error' => ''], 202);
                else
                    return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Request $request, $id)
        {
            if(Articles::where('idArticle', $id)->where('idUser', $_SESSION['iduser'])->delete()) 
                return response()->json(['status' => true, 'error' => ''], 202);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

        public function staffShowArticle($id)
        {
            if(Articles::where('idArticle', $id)->count())
            {
                $articles = '';
                $this->buildArticleData($articles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '');
                Articles::where('idArticle', $id)->increment('Views', 1);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function staffUpdate(Request $request, $id)
        {
            if(isset($request->content))
            {
                if(Articles::where('idArticle', '=' , $id)->update(['Content' => $data['content']])) 
                    return response()->json(['status' => true, 'error' => ''], 202);
                else 
                    return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function staffChangeArticleVisibility($id)
        {
            if(DB::table('articles')->where('idArticle', $id)->update(['Visible' => DB::raw('ABS(Visible-1)')]))
                return response()->json(['status' => true, 'error' => ''], 202);
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }

        public function staffChangeArticleMain($id)
        {
            if(DB::table('articles')->update(['Main' => DB::raw('(case when `idArticle` = ' . $id . ' then 1 when `idArticle` <> ' . $id . ' then 0 end)')]))
                return response()->json(['status' => true, 'error' => ''], 202);
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }
}