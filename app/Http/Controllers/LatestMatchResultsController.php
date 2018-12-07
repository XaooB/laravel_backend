<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LatestMatchResults;
use App\Http\Resources\LatestMatchResults as LatestMatchResultsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\ExternalAPI\FootballAPIConnector;

class LatestMatchResultsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Latest Match Result
        FootballAPIConnector::getLatestMatchResult_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=FINISHED', env('APP_FootballAPIToken'));
    }

    public function get_latest_match_result(Request $request)
    {
        $latest_match = DB::table('latest_match_results')->join('clubs as clubHome', 'clubHome.idClub', '=', 'latest_match_results.idClubHome')->join('clubs as clubAway', 'clubAway.idClub', '=', 'latest_match_results.idClubAway')->select('clubHome.ShortName as home_team', 'HomeClubScore as home_team_score', 'clubAway.ShortName as away_team', 'AwayClubScore as away_team_score', 'League as league', 'Date as date')->orderBy('Date', 'desc')->first();
        return response()->json($latest_match);

        var_dump($request->cookie('token'));
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
        //
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
