<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Comments;
use App\Http\Resources\Comments as CommentsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;
use App\Notifications;

if(!isset($_SESSION)) { session_start(); } 

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    // Nesting whole comments in article -> only for normal users
    public function buildComment($articleID, $mainCommentID, &$commentPart, $values, $type, $orderColumn, $orderValue)
    {
        $comments = DB::table('comments')->select('idComment as idcomment', 'idUser as user', 'Content as content', 'created_at as create_date', 'updated_at as modify_date', 'idSubReference as comments')->where('idReference', $articleID)->where('idSubReference', $mainCommentID)->where('Type', $type)->whereIn('comments.Visible', $values)->orderBy($orderColumn, $orderValue)->get();
        foreach ($comments as $key => $comment) {
            UsersController::buildUserData($comment->user);
            array_push($commentPart, $comment);
            $subCommentsCount= DB::table('comments')->where('idReference', $articleID)->where('idSubReference', $comment->idcomment)->whereIn('comments.Visible', $values)->count();
            if($subCommentsCount > 0) {
                $comment->comments = array();
                $this->buildComment($articleID, $comment->idcomment, $comment->comments, $values, $type, 'idComment', 'asc');
            }
            else $comment->comments = null;
        }
    }

    // $id = article id -> only for normal users
    public function get_article_comments($id)
    {
        $articleComments = array();
        $this->buildComment($id, 0, $articleComments, [1], 'article', 'idComment', 'desc');
        return response()->json($articleComments);
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
        if(isset($data['idreference']) && (isset($data['idsubreference']) || $data['idsubreference'] == 0) && (isset($data['content']) && strlen($data['content']) <= 500))
        {
            $comments = new Comments;
            $comments->idReference = $data['idreference'];
            $comments->idUser = $_SESSION['iduser'];
            $comments->idSubReference = $data['idsubreference'];
            $comments->Content = $data['content'];
            $comments->Type = 'article';
            $comments->updated_at = null;
            $userID = DB::table('comments')->where('idComment', $data['idsubreference'])->value('idUser');
            if($comments->save())
            {
                if($data['idsubreference'] > 0 && $_SESSION['iduser'] != $userID)
                {
                    $notification = new Notifications;
                    $notification->idUser = $userID;
                    $notification->idReference = $data['idreference'];
                    $notification->Type = 'article';
                    $notification->Readed = 0;
                    $notification->save();
                    return response()->json(['status' => true, 'error' => '']);
                }
                else
                    return response()->json(['status' => true, 'error' => '']);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    public function panel(Request $request)
    {
        $commentsCount = DB::table('comments')->select(DB::raw('date(created_at) as day, count(*) as total_comments'))->where(DB::raw('DATEDIFF(NOW(), comments.created_at)'), '<', 7)->groupBy(DB::raw('day'))->get();
        $commentData = array();
        $i = date('Y-m-d', time());
        $till = date('Y-m-d',(strtotime( '-7 day', strtotime($i))));
        for($i; $i > $till; $i = date('Y-m-d',(strtotime( '-1 day', strtotime($i)))))
        {
            foreach ($commentsCount as $key => $commentCount) {
                if($commentCount->day == $i)
                    array_push($commentData, ['day' => $i, 'comments_count' => $commentCount->total_comments]);
                else
                    array_push($commentData, ['day' => $i, 'comments_count' => 0]);
            }
        }
        return response()->json($commentData);
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
            $data = json_decode($request->getContent(), true);
            if(isset($data['content']) && strlen($data['content']) <= 500){
                if(Comments::where('idComment', '=' , $id)->where('idUser', $_SESSION['iduser'])->where('Visible', 1)->update(['Content' => $data['content']]))
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
        /*
            Aby wysłać dane (usunięcie) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="DELETE">
        */
            if(Comments::where('idComment', '=' , $id)->where('idUser', $_SESSION['iduser'])->where('Visible', 1)->update(['Visible' => 0]))  
                return response()->json(['status' => true, 'error' => '']);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------
    // $id = article id -> only for staff
        public function staff_get_article_comments($id)
        {
            $articleComments = array();
            $this->buildComment($id, 0, $articleComments, [0,1], 'article', 'idComment', 'desc');
            return response()->json($articleComments);
        }

        public function staff_change_comment_visibility(Request $request, $id)
        {
            if(DB::table('comments')->where('idComment', $id)->update(['Visible' => DB::raw('ABS(Visible-1)')]))
                return response()->json(['status' => true, 'error' => '']);
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
    }
