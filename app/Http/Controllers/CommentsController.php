<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Comments;
use App\Http\Resources\Comments as CommentsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;

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
    public function buildComment($articleID, $mainCommentID, &$commentPart, $values)
    {
        $comments = DB::table('comments')->select('idComment as idcomment', 'idUser as user', 'Content', 'created_at as create_date', 'updated_at as modify_date', 'idReference as comments')->where('idArticle', $articleID)->where('idReference', $mainCommentID)->whereIn('comments.Visible', $values)->orderBy('idReference', 'asc')->get();
        foreach ($comments as $key => $comment) {
            UsersController::buildUserData($comment->user);
            array_push($commentPart, $comment);
            $subCommentsCount= DB::table('comments')->where('idArticle', $articleID)->where('idReference', $comment->idcomment)->whereIn('comments.Visible', $values)->count();
            if($subCommentsCount > 0) {
                $comment->comments = array();
                $this->buildComment($articleID, $comment->idcomment, $comment->comments, $values);
            }
            else $comment->comments = null;
        }
    }

    // $id = article id -> only for normal users
    public function get_article_comments($id)
    {
        $articleComments = array();
        $this->buildComment($id, 0, $articleComments, [1]);
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
        if($request->idarticle != null && $request->idreference != null && $request->content != null){
            $idUser = $_SESSION['iduser'];
            $comments = new Comments;
            $comments->idArticle = $request->idarticle;
            $comments->idUser = $idUser;
            $comments->idReference = $request->idreference;
            $comments->Content = $request->content;
            if($comments->save()) { 
                $notification = new Notifications;
                $notification->idUser = $idUser;
                $notification->idReference = $request->idreference;
                $notification->idComment = DB::table('comments')->select('idComment')->where('idArticle', $request->idarticle)->where('idUser', $idUser)->where('idReference', $request->idreference)->value('idComment');
                $notification->save();
                return response()->json(['message' => 'success']); 
            }
            return response()->json(['message' => 'failure']);
        }
        return response()->json(['message' => 'connection failure']);
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
        if($request->name != null && $request->content != null){
            if(Comments::where('idComment', '=' , $id)->where('idUser', $_SESSION['iduser'])->where('Visible', '=', 1)->update(['Content' => $request->content])) { return response()->json(['message' => 'success']); }
            else { return response()->json(['message' => 'failure']); }
        }
        return response()->json(['message' => 'connection failure']);
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
        if(Comments::where('idComment', '=' , $id)->where('idUser', $_SESSION['iduser'])->where('Visible', '=', 1)->update(['Visible' => 0]))  {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'failure']);}
        return response()->json(['message' => 'connection failure']);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------
    // $id = article id -> only for staff
    public function staff_get_article_comments($id)
    {
        $articleComments = array();
        $this->buildComment($id, 0, $articleComments, [0,1]);
        return response()->json($articleComments);
    }

    public function staff_change_comment_visibility(Request $request, $id)
    {
        if(Comments::where('idComment', $id)->where('Visible', '!=', $request->visible)->update(['Visible' => $request->visible]))
            return response()->json(['message' => 'success']);
        else
            return response()->json(['message' => 'failure']);
    }
}
