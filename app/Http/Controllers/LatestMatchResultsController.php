<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LatestMatchResults;
use App\Http\Resources\LatestMatchResults as LatestMatchResultsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\FootballAPIController;
use App\Http\Controllers\ClubsController;

class LatestMatchResultsController extends Controller
{
    public static function buildMatchData(&$match, $type, $count)
    {
        if($count == 1)
        {
            $match = DB::table('latest_match_results')->select('idClubHome as home_team', 'HomeClubScore as home_team_score', 'idClubAway as away_team', 'AwayClubScore as away_team_score', 'League as league', 'Date as date')->where('Type', $type)->orderBy('Date', 'desc')->first();
            ClubsController::buildClubData($match->home_team);
            ClubsController::buildClubData($match->away_team);
        }
        elseif($count > 1)
        {
            $matches = DB::table('latest_match_results')->select('idClubHome as home_team', 'HomeClubScore as home_team_score', 'idClubAway as away_team', 'AwayClubScore as away_team_score', 'League as league', 'Date as date')->where('Type', $type)->orderBy('Date', 'desc')->get();
        }
        else
            return array();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Latest Match Result
        FootballAPIController::getLatestMatchResult_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=FINISHED', env('APP_FootballAPIToken'), 'FINISHED');
    }

    public function live()
    {
    	// Live Match Result
        FootballAPIController::getLatestMatchResult_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=LIVE', env('APP_FootballAPIToken'), 'LIVE');
    }

    public function get_latest_match_result()
    {
        $this->buildMatchData($latest_match, 'FINISHED', 1);
        return response()->json($latest_match);
    }

    public function get_live_match_result()
    {
        if(DB::table('latest_match_results')->where('Type', 'LIVE')->count() > 0)
            $this->buildMatchData($live_match, 'LIVE', 1);
        else
            $this->buildMatchData($live_match, 'FINISHED', 1);
        return response()->json($live_match);
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
