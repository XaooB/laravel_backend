<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Clubs;
use App\Http\Resources\Clubs as ClubsResource;
use App\Http\Controllers\Auth;
use App\ExternalAPI\FootballAPIConnector;
use Illuminate\Support\Facades\DB;

class ClubsController extends Controller
{
    public static function buildClubData(&$club)
    {
        if(DB::table('clubs')->where('idClub', $club)->count())
            $club = DB::table('clubs')->select('Name as name', 'ShortName as short_name', 'Image as image')->where('idClub', $club)->first();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$clubs = Clubs::all();
        //return response()->json(ClubsResource::collection($clubs));
        // Spain League Clubs
        FootballAPIConnector::getClubs_ExternalAPI('https://api.football-data.org/v2/competitions/PD/teams', 'a526814bc45a452ea371bec3ec82baaf');
        // UEFA Champions League Clubs
        FootballAPIConnector::getClubs_ExternalAPI('https://api.football-data.org/v2/competitions/CL/teams', 'a526814bc45a452ea371bec3ec82baaf');
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
        if($request->image != null && $request->cname != null)
        {
            $clubs = new Clubs;
            $input['imageName'] = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/' . 'clubs';
            $clubs->Name = $request->cname;
            $clubs->Image = $destinationFolder . '/' . $input['imageName'];
            if(Clubs::where('Name', '=' , $clubs->Name)->exists()) { return response()->json(['message' => 'failure']); }
            else {
                if($clubs->save()) { $request->file('image')->move($destinationFolder, $input['imageName']); return response()->json(['message' => 'success']);} 
                else { return response()->json(['message' => 'connection failure']); } 
            }
        }
        else { return response()->json(['message' => 'failure']); }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
