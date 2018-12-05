<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Http\Requests;
    use App\Articles;
    use App\Http\Resources\Articles as ArticlesResource;
    use App\Http\Controllers\Auth;
    use Illuminate\Support\Facades\DB;
    use App\Http\Controllers\UsersController;

    session_start();

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
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->leftJoin('user_article_likes', 'user_article_likes.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 150) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->where('articles.Visible', '!=', 0)->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle', 'user_article_likes.idArticle')->get();
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
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('Main', '!=', 0)->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'desc')->limit($count)->get();
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
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('Main', 0)->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'desc')->limit($count)->get();
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
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('articles.Visible', '!=', 0)->orderBy('articles.Views', 'desc')->limit($count)->get();
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
                 $article = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->leftJoin('user_article_likes', 'user_article_likes.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', 'articles.Content as content', 'articles.Views as views', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw("(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle and user_article_likes.Type = 'like') as likes_count"))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle', 'user_article_likes.idarticle')->where('articles.idArticle', $id)->where('articles.Visible', '!=', 0)->get();
            }
            else
                return response()->json(['message' => 'wrong article id']);
            UsersController::buildUserData($article[0]->user);
            $articleViews = $article[0]->views;
            $articleViews += 1;
            Articles::where('idArticle', $id)->update(['Views' => $articleViews]);
            return response()->json($article);
        }
        
        public function show_neighbours($id, $count)
        {
            $previousCount = DB::table('articles')->where('idArticle', '<', $id)->count();
            $nextCount = DB::table('articles')->where('idArticle', '>', $id)->count();
            if($previousCount >= $count && $nextCount >= $count) { $previousCount = $count; $nextCount = $count; }
            elseif($previousCount < $count && $nextCount > $count) { $nextCount = $count + ($count - $previousCount); }
            elseif($previousCount > $count && $nextCount < $count) { $previousCount = $count + ($count - $nextCount); }
            echo $previousCount . ' | ' . $nextCount . ' space ';
            $article['previous'] = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('articles.Visible', '!=', 0)->where('articles.idArticle', '<', $id)->orderBy('articles.idArticle', 'desc')->limit($previousCount)->get();

            $article['current'] = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('articles.Visible', '!=', 0)->where('articles.idArticle', $id)->get();

            $article['next'] = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('articles.Visible', '!=', 0)->orderBy('articles.idArticle', 'asc')->where('articles.idArticle', '>', $id)->limit($nextCount)->get();
            return response()->json($article);
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
            if($request->category != null && $_SESSION['token'] != null && $request->title != null && $request->content != null && $request->image != null)
            {
                $articles = new Articles;
                $articles->idCategory = DB::table('categories')->select('idCategory')->where('Name', $request->category)->value('idCategory');
                $articles->idUser = DB::table('users')->select('id')->where('remember_token', '=', $_SESSION['token'])->value('id');
                $articles->Title = $request->title;
                $articles->Content = $request->content;
                $image = $request->file('image');
                $input['imageName'] = time() . '.' . $image->getClientOriginalExtension();
                $destinationFolder = public_path('images') . '/articles';
                $articles->Image = env("APP_PUBLIC_PATH", "http://pw-inz.cba.pl/inz_be/public") . '/images' . '/articles' . '/' . $input['imageName'];
                $articles->Views = 1;
                if(Articles::where('Title', '=' , $articles->Title)->where('idCategory', '=' , $articles->idCategory)->where('idUser', '=' , $articles->idUser)->exists()) {return response()->json(['message' => 'failure']);}
                else {if($articles->save()) {$image->move($destinationFolder, $input['imageName']); return response()->json(['message' => 'success']);}}
                return response()->json(['message' => 'connection failure']);
            }
            return response()->json(['message' => 'failure']);
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
            if($request->category != null && $_SESSION['token'] != null && $request->title != null && $request->content)
            {
                if($request->file('image') != null) {
                    $input['imageName'] = time() . '.' . $request->file('image')->getClientOriginalExtension();
                    $destinationFolder = public_path('images') . '/articles'; }
                if(Articles::where('idArticle', '=' , $id)->where('Visible', '!=', 0)->update([
                    'idCategory' => DB::table('categories')->select('idCategory')->where('Name', $request->category)->value('idCategory'),
                    'idUser' => DB::table('users')->select('id')->where('remember_token', $_SESSION['token'])->value('id'),
                    'Title' => $request->title,
                    'Content' => $request->content,
                    'Image' => env("APP_PUBLIC_PATH", "http://pw-inz.cba.pl/inz_be/public") . '/images' . '/articles' . '/' . $input['imageName']
                ])) {$request->file('image')->move($destinationFolder, $input['imageName']); return response()->json(['message' => 'success']);}
                return response()->json(['message' => 'connection failure']);
            }
            return response()->json(['message' => 'failure']);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Request $request, $id)
        {
            $iduser = DB::table('users')->select('id')->where('remember_token', $_SESSION['token'])->value('id');
            if(Articles::where('idArticle', '=' , $id)->where('idUser', '=' , $iduser)->where('Visible', '!=', 0)->update(['Visible' => 0])) {return response()->json(['message' => 'success']);}
            else {return response()->json(['message' => 'connection failure']);}
        }

        // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

        // @index
        public function staff_index()
        {
             $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->get();
            foreach ($articles as $key => $article) {
                    UsersController::buildUserData($article->user);
            }
            return response()->json($articles);
        }

        public function staff_show_article($id)
        {
            if(Articles::where('idArticle', $id)->count())
                $article = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idArticle', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 200) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idArticle = articles.idArticle and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_article_likes where user_article_likes.idArticle = articles.idArticle) as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.created_at', 'articles.updated_at', 'comments.idArticle')->where('articles.idArticle', $id)->get();
            else
                return response()->json(['message' => 'wrong article id']);

            UsersController::buildUserData($article[0]->user);
            $articleViews = $article[0]->views;
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
            return response()->json(['message' => 'failure']);
        }

        public function staff_change_article_visibility(Request $request, $id)
        {
            if(Articles::where('idArticle', $id)->where('Visible', '!=', $request->visible)->update(['Visible' => $request->visible]))
                return response()->json(['message' => 'success']);
            else
                return response()->json(['message' => 'failure']);
        }
    }