<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\UserLikes;
use App\Http\Resources\UserLikes as UserLikesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use Facades\App\CacheData\ArticlesCache;

if(!isset($_SESSION)) { session_start(); }

class UserLikesController extends Controller
{
    protected $reactions = array('like', 'dislike');

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $reaction = 'like'; // $request->reaction
        $type = 'article'; // $request->type
        $data = json_decode($request->getContent(), true);
        if(in_array($reaction, $this->reactions) && isset($type) && isset($data['idreference']))
        {
            if(DB::table('user_likes')->where('Type', 'article')->where('Reaction', 'like')->where('idReference', $data['idreference'])->where('idUser', $_SESSION['iduser'])->count())
                return response()->json(['status' => false, 'error' => 'wrong data']);
            $userLike = new UserLikes;
            $userLike->idUser = $_SESSION['iduser'];
            $userLike->idReference = $request->idreference;
            $userLike->Type = $type;
            $userLike->Reaction = $reaction;
            $userLike->save();
            ArticlesCache::removeFromCache($data['idreference']);
            return response()->json(['status' => true, 'error' => '']);
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
        $reaction = 'like'; // $request->reaction
        $type = 'article'; // $request->type
        if(in_array($reaction, $this->reactions))
        {
            if(UserLikes::where('idUser', $_SESSION['iduser'])->where('idReference', $id)->where('Type', $type)->update(['Reaction' => $reaction]))
                return response()->json(['status' => true, 'error' => '']);
            else
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reaction = 'like'; // $request->reaction
        $type = 'article'; // $request->type
        if(UserLikes::where('idUser', $_SESSION['iduser'])->where('Type', $type)->where('idReference', $id)->delete()) {
            ArticlesCache::removeFromCache($id);
            return response()->json(['status' => true, 'error' => '']);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }
}
