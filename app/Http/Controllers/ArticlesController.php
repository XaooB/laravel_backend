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

if(!isset($_SESSION)) { session_start(); } 

class ArticlesController extends Controller
{
    public static function buildArticleData(&$articles, $whereVisible, $whereInColumn, $whereInValues, $orderColumn, $orderValue, $quantity, $articleID, $filterColumn, $phrase)
    {
        if($articleID == null)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where($filterColumn, 'like', '%' . $phrase . '%')->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
            foreach ($articles as $key => $article) 
            {
                if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                UsersController::buildUserData($article->user);
            }
        }
        else
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where('articles.idArticle', $articleID)->first();
            UsersController::buildUserData($articles->user);
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
            //
        }

        public function latest_main($count)
        {
            if($count > 0)
            {
                $articles = array();
                $this->buildArticleData($articles, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function latest($count)
        {
            if($count > 0)
            {
                $articles = array();
                $this->buildArticleData($articles, [1], 'articles.Main', [0], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function most_viewed($count)
        {
            if($count > 0)
            {
                $articles = array();
                $this->buildArticleData($articles, [1], 'articles.Main', [0], 'articles.Views', 'desc', $count, null, 'articles.Title', '');
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function show_article($id)
        {
            if(Articles::where('idArticle', $id)->where('Visible', 1)->count())
            {
                $this->buildArticleData($articles, [1], 'Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '');
                Articles::where('idArticle', $id)->increment('Views', 1);
                if(isset($_SESSION['iduser']))
                {
                    if(DB::table('user_likes')->where('Type', 'article')->where('Reaction', 'like')->where('idReference', $id)->where('idUser', $_SESSION['iduser'])->count())
                        $articles->liked = true;
                    else
                        $articles->liked = false;
                }
                else
                    $articles->liked = false;
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public static function BuildNeighboursData($ids)
        {
            $articles = array();
            self::buildArticleData($articles, [1], 'articles.idArticle', $ids, 'articles.idArticle', 'asc', 3, null, 'articles.Title', '');
            return $articles;
        }

        public function show_neighbours($id)
        {
            $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '<', $id)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '>', $id)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            if($idPrev && $idNext)
            {
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            elseif($idPrev)
            {
                $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '<', $idPrev)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            elseif($idNext)
            {
                $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '>', $idNext)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function filtrate($count, Request $request)
        {
            $data = json_decode($request->getContent(), true);
            if(isset($data['phrase']))
            {
                $fixedPhrase = $this->escapeLike($data['phrase']);
                $articles = array();
                $this->buildArticleData($articles, [1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', $fixedPhrase);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function panel_articles(Request $request)
        {
            $articlesByCategory = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->select('categories.Name as category', DB::raw('count(*) as articles_count'))->groupBy('categories.Name')->get();
            return response()->json($articlesByCategory);
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
            $data = json_decode($request->getContent(), true);
            if(isset($data['category']) && isset($data['title']) && isset($data['content']) && isset($data['image']))
            {
                $articles = new Articles;
                $articles->idCategory = $data['category'];
                $articles->idUser = $_SESSION['iduser'];
                $articles->Title = $data['title'];
                $articles->Content = $data['content'];
                $articles->Views = 1;
                $articles->Main = $request->main ? 1 : 0; 
                if(Articles::where('Title', $articles->Title)->where('idCategory', $articles->idCategory)->where('idUser', $articles->idUser)->exists()) 
                {
                    return response()->json(['status' => false, 'error' => 'wrong data']);
                }
                else
                {
                    if($articles->save())
                    {
                        $id = DB::table('articles')->select('idArticle')->where('Title', $articles->Title)->where('idUser', $articles->idUser)->where('Content', $articles->Content)->value('idArticle');
                        $image_name = 'articles' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
                        $destinationFolder = public_path('images') . '/articles/';
                        $request->file('image')->move($destinationFolder, $image_name);
                        $path = $destinationFolder . $image_name;
                        CloudinaryController::uploadImage($path, $image_name, 'articles', 'idArticle', $id);
                        return response()->json(['status' => true, 'error' => '']);
                    }
                    else
                        return response()->json(['status' => false, 'error' => 'wrong data']);
                }
                return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
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
        	$data = json_decode($request->getContent(), true);
            if(isset($data['category']) && isset($data['title']) && isset($data['content']))
            {
                if($request->file('image') != null)
                {
                    $image_name = 'articles' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
                    $destinationFolder = public_path('images') . '/articles/';
                    $request->file('image')->move($destinationFolder, $image_name);
                    $path = $destinationFolder . $image_name;
                    CloudinaryController::uploadImage($path, $image_name, 'articles', 'idArticle', $id); 
                }
                $articleMain = $data['main'] ? 1 : 0;
                if(Articles::where('idArticle', '=' , $id)->where('Visible', 1)->update([
                    'idCategory' => DB::table('categories')->select('idCategory')->where('Name', $data['category'])->value('idCategory'),
                    'Title' => $data['title'],
                    'Content' => $data['content'],
                    'Main' => $articleMain]))
                	return response()->json(['status' => true, 'error' => '']);
                else
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Request $request, $id)
        {
            if(Articles::where('idArticle', '=' , $id)->where('idUser', '=' , $_SESSION['iduser'])->where('Visible', 1)->update(['Visible' => 0])) 
                return response()->json(['status' => true, 'error' => '']);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

        public function staff_show_article($id)
        {
            if(Articles::where('idArticle', $id)->count())
            {
                $articles = '';
                $this->buildArticleData($articles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '');
                Articles::where('idArticle', $id)->increment('Views', 1);
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        // (only Content)
        public function staff_update(Request $request, $id)
        {
            /*
                Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
                <input type="hidden" name="_method" value="PUT">
            */
            $data = json_decode($request->getContent(), true);
            if($data['content'])
            {
                if(Articles::where('idArticle', '=' , $id)->update(['Content' => $data['content']])) 
                    return response()->json(['status' => true, 'error' => '']);
                else 
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

        public function staff_change_article_visibility($id)
        {
            if(DB::table('articles')->where('idArticle', $id)->update(['Visible' => DB::raw('ABS(Visible-1)')]))
                return response()->json(['status' => true, 'error' => '']);
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
    }