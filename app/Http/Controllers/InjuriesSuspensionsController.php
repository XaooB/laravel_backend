<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\InjuriesSuspensions;
use App\Http\Resources\InjuriesSuspensions as InjuriesSuspensionsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PlayersController;
use Facades\App\CacheData\InjuriesSuspensionsCache;


class InjuriesSuspensionsController extends Controller
{
    public static function buildInjurySuspensionData(&$injuriesSuspensions, $type, $count)
    {
        if($type == 'actual')
        {
            $injuriesSuspensions = DB::table('injuries_suspensions')->whereRaw('ReturnDate > NOW()')->get();
            foreach ($injuriesSuspensions as $key => $injurySuspension)
            {
                PlayersController::buildPlayerData($injurySuspension->idPlayer);
            }
        }
        elseif($type == 'injury' || $type == 'suspension')
        {
            $injuriesSuspensions = DB::table('injuries_suspensions')->where('Type', $type)->orderBy('idInjurySuspension', 'desc')->limit($count)->get();
            foreach ($injuriesSuspensions as $key => $injurySuspension)
            {
                PlayersController::buildPlayerData($injurySuspension->idPlayer);
            }
        }
        else
            $injuriesSuspensions = array();
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

    public function latest_injuries($count)
    {
        $injuriesSuspensions = InjuriesSuspensionsCache::latest_injuries($count);
        return response()->json($injuriesSuspensions);
    }

    public function latest_suspensions($count)
    {
        $injuriesSuspensions = InjuriesSuspensionsCache::latest_suspensions($count);
        return response()->json($injuriesSuspensions);
    }

    public function actual()
    {
        $injuriesSuspensions = InjuriesSuspensionsCache::actual();
        return response()->json($injuriesSuspensions);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

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
        $injuriesSuspensions = new InjuriesSuspensions;
        $injuriesSuspensions->idUser = $_SESSION['iduser'];
        $injuriesSuspensions->idPlayer = $request->idplayer;
        $injuriesSuspensions->Type = $request->type;
        $injuriesSuspensions->Description = $request->description;
        $injuriesSuspensions->ReturnDate = $request->returndate;

        if(InjuriesSuspensions::where('idUser', '=' , $injuriesSuspensions->idUser)->where('idPlayer', '=' , $injuriesSuspensions->idPlayer)->exists()) 
            {return response()->json(['message' => 'connection failure']);}
        else {if($injuriesSuspensions->save()) {return response()->json(['message' => 'success']);}}
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
        if(InjuriesSuspensions::where('idInjurySuspension', '=' , $id)->update([
            'idUser' => $_SESSION['iduser'],
            'idPlayer' => $request->idplayer,
            'Type' => $request->type,
            'Description' => $request->description,
            'ReturnDate' => $request->returndate])) 
            return response()->json(['message' => 'success']);
        else 
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
        /*
            Aby wysłać dane (usunięcie) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="DELETE">
        */
        if(InjuriesSuspensions::where('idInjurySuspension', '=' , $id)->where('idUser', '=' , $request->iduser)->delete()) 
            return response()->json(['message' => 'success']);
        else
            return response()->json(['message' => 'failure']);
    }
}