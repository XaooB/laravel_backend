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
        public static function buildArticleData(&$article)
        {

        }

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 150) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->where('articles.Visible', '!=', 0)->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle', 'user_likes.idArticle')->get();
            foreach ($articles as $key => $article) {
                if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                $article->comments_count =  DB::table('comments')->where('idArticle', $article->idarticle)->count();
                $userID = $article->user;
                UsersController::buildUserData($article->user);
            }
            return response()->json($articles);
        }

        public function latest_main($count)
        {
            if($count > 0)
            {
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('Main', '!=', 0)->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'desc')->limit($count)->get();
                foreach ($articles as $key => $article) {
                    $article->comments_count =  DB::table('comments')->where('idArticle', $article->idarticle)->count();
                    if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                    UsersController::buildUserData($article->user);
                }
                return response()->json($articles);
            }
        }

        public function latest($count)
        {
            if($count > 0)
            {
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('Main', 0)->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'desc')->limit($count)->get();
                foreach ($articles as $key => $article) {
                    if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                    $article->comments_count =  DB::table('comments')->where('idArticle', $article->idarticle)->count();
                    UsersController::buildUserData($article->user);
                }
                return response()->json($articles);
            }
        }

        public function most_viewed($count)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('articles.Visible', '!=', 0)->orderBy('articles.Views', 'desc')->limit($count)->get();
            foreach ($articles as $key => $article) {
                if($article->visible)
                {
                    if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
                    $article->comments_count =  DB::table('comments')->where('idArticle', $article->idarticle)->count();
                    UsersController::buildUserData($article->user);
                }
            }
            return response()->json($articles);
        }

        public function show_article($id)
        {
            if(Articles::where('idArticle', $id)->where('Visible', '!=', 0)->count())
            {
                 $article = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', 'articles.Content as content', 'articles.Views as views', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw("(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like and user_likes.Type = 'like') as likes_count"))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle', 'user_likes.idarticle')->where('articles.idArticle', $id)->where('articles.Visible', '!=', 0)->first();
            }
            else
                return response()->json(['message' => 'wrong article id']);
            UsersController::buildUserData($article->user);
            $articleViews = $article->views;
            $articleViews += 1;
            Articles::where('idArticle', $id)->update(['Views' => $articleViews]);
            return response()->json($article);
        }

        public static function BuildNeighboursData($ids)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->join('users', 'articles.idUser', '=', 'users.id')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('articles.Visible', '!=', 0)->whereIn('articles.idArticle', $ids)->get();
            foreach ($articles as $key => $article) {
                UsersController::buildUserData($article->user);
            }
            return $articles;
        }

        public function show_neighbours($id)
        {
            $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '<', $id)->orderBy('idArticle', 'desc')->where('articles.Visible', '!=', 0)->limit(1)->value('idArticle');
            $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '>', $id)->orderBy('idArticle', 'asc')->where('articles.Visible', '!=', 0)->limit(1)->value('idArticle');
            if($idPrev && $idNext)
            {
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            elseif($idPrev)
            {
                $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '<', $idPrev)->orderBy('idArticle', 'desc')->where('articles.Visible', '!=', 0)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            elseif($idNext)
            {
                $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '>', $idNext)->orderBy('idArticle', 'asc')->where('articles.Visible', '!=', 0)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
                $articles = $this->BuildNeighboursData($ids);
                return response()->json($articles);
            }
            return response()->json(['status' => false]);
        }

        public static function escapeLike($str) 
        {
            return str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $str);
        }

        public function filtrate(Request $request)
        {
            if($request->phrase != null)
            {
                $fixedPhrase = $this->escapeLike($request->phrase);
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('Title', 'like', '%' . $fixedPhrase . '%')->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'desc')->get();
                foreach ($articles as $key => $article) 
                {
                    UsersController::buildUserData($article->user);
                }
                return response()->json($articles);
            }
            else
                return response()->json(['status' => false]);
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
            if($request->category != null && $request->title != null && $request->content != null && $request->image != null)
            {
                $articles = new Articles;
                $articles->idCategory = DB::table('categories')->select('idCategory')->where('Name', $request->category)->value('idCategory');
                $articles->idUser = $_SESSION['iduser'];
                $articles->Title = $request->title;
                $articles->Content = $request->content;
                $articles->Views = 1;
                if($request->main == true) { $articles->Main = 1; } else { $articles->Main = 0; }
                if(Articles::where('Title', '=' , $articles->Title)->where('idCategory', '=' , $articles->idCategory)->where('idUser', '=' , $articles->idUser)->exists()) 
                    {return response()->json(['status' => false]);}
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
                            return response()->json(['status' => 'success']);
                        }
                        else
                        { return response()->json(['status' => false]); } 
                    }
                return response()->json(['status' => false]);
            }
            return response()->json(['status' => false]);
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
            /*
                Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
                <input type="hidden" name="_method" value="PUT">
            */
            if($request->category != null && $request->title != null && $request->content)
            {
                if($request->file('image') != null) {
                    $image_name = 'articles' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
                    $destinationFolder = public_path('images') . '/articles/';
                    $request->file('image')->move($destinationFolder, $image_name);
                    $path = $destinationFolder . $image_name;
                    CloudinaryController::uploadImage($path, $image_name, 'articles', 'idArticle', $id); 
                }
                if($request->main == true) { $articleMain = 1; } else { $articleMain = 0; }
                if(Articles::where('idArticle', '=' , $id)->where('Visible', '!=', 0)->update([
                    'idCategory' => DB::table('categories')->select('idCategory')->where('Name', $request->category)->value('idCategory'),
                    'Title' => $request->title,
                    'Content' => $request->content,
                    'Main' => $articleMain]))
                    { return response()->json(['message' => 'success']); }
                return response()->json(['status' => false]);
            }
            return response()->json(['status' => flase]);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Request $request, $id)
        {
            $iduser = $_SESSION['iduser'];
            if(Articles::where('idArticle', '=' , $id)->where('idUser', '=' , $iduser)->where('Visible', '!=', 0)->update(['Visible' => 0])) {return response()->json(['message' => 'success']);}
            else {return response()->json(['message' => 'connection failure']);}
        }

        // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

        // @index
        public function staff_index()
        {
             $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->get();
            foreach ($articles as $key => $article) {
                    UsersController::buildUserData($article->user);
            }
            return response()->json($articles);
        }

        public function staff_show_article($id)
        {
            if(Articles::where('idArticle', $id)->count())
                $article = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = article and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = article and user_likes.Reaction = like) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->where('articles.idArticle', $id)->first();
            else
                return response()->json(['message' => 'wrong article id']);

            UsersController::buildUserData($article->user);
            $articleViews = $article->views;
            $articleViews += 1;
            Articles::where('idArticle', $id)->update(['Views' => $articleViews]);
            return response()->json($article);
        }

        // (only Content)
        public function staff_update(Request $request, $id)
        {
            /*
                Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
                <input type="hidden" name="_method" value="PUT">
            */
            if($request->content)
            {
                if(Articles::where('idArticle', '=' , $id)->update(['Content' => $request->content])) return response()->json(['message' => 'success']);
                else return response()->json(['message' => 'connection failure']);
            }
            return response()->json(['status' => false]);
        }

        public function staff_change_article_visibility(Request $request, $id)
        {
            if(Articles::where('idArticle', $id)->where('Visible', '!=', $request->visible)->update(['Visible' => $request->visible]))
                return response()->json(['message' => 'success']);
            else
                return response()->json(['status' => false]);
        }
    }