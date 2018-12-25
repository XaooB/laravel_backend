<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\MatchesChats;
use App\Http\Resources\MatchesChats as MatchesChatsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;
use App\Notifications;

if(!isset($_SESSION)) { session_start(); } 

class MatchesChatsController extends Controller
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

    // $id = article id -> only for normal users
    public function get_match_chat($id)
    {
        $matchChat = DB::table('matches_chats')->select('idMatchChat as idmatchchat', 'idUser as user', 'Content as content', 'created_at as create_date', 'updated_at as modify_date')->where('idReference', $id)->where('comments.Visible', 1)->orderBy('idMatchChat', 'desc')->get();
        return response()->json($matchChat);
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
        if(isset($data['idreference']) && (isset($data['content']) && strlen($data['content']) <= 500))
        {
            $matchChat = new MatchesChats;
            $matchChat->idReference = $data['idreference'];
            $matchChat->idUser = $_SESSION['iduser'];
            $matchChat->Content = $data['content'];
            $matchChat->Type = 'article';
            $matchChat->updated_at = null;
            if($matchChat->save())
                return response()->json(['status' => true, 'error' => '']);
            else
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
        /*
            Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="PUT">
        */
            $data = json_decode($request->getContent(), true);
            if(isset($data['content']) && strlen($data['content']) <= 500){
                if(MatchesChats::where('idMatchChat', $id)->where('idUser', $_SESSION['iduser'])->where('Visible', 1)->update(['Content' => $data['content']]))
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
            if(MatchesChats::where('idMatchChat', $id)->where('idUser', $_SESSION['iduser'])->where('Visible', 1)->update(['Visible' => 0]))  
                return response()->json(['status' => true, 'error' => '']);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------
    // $id = article id -> only for staff
        public function staff_get_article_comments($id)
        {
            $matchChat = DB::table('matches_chats')->select('idMatchChat as idmatchchat', 'idUser as user', 'Content as content', 'created_at as create_date', 'updated_at as modify_date')->where('idReference', $id)->orderBy('idMatchChat', 'desc')->get();
        return response()->json($matchChat);
        }

        public function staff_change_comment_visibility(Request $request, $id)
        {
            if(DB::table('matches_chats')->where('idMatchChat', $id)->update(['Visible' => DB::raw('ABS(Visible-1)')]))
                return response()->json(['status' => true, 'error' => '']);
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
    }
