<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Matches;
use App\Http\Resources\Matches as MatchesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\FootballAPIController;
use App\Http\Controllers\ClubsController;

class MatchesController extends Controller
{

    public static function buildMatchData(&$match, $type, $count, $orderValue)
    {
        if($count == 1)
        {
            $match = DB::table('matches')->select('idClubHome as home_team', 'HomeClubScore as home_team_score', 'idClubAway as away_team', 'AwayClubScore as away_team_score', 'League as league', 'Date as date')->where('Type', $type)->orderBy('Date', $orderValue)->first();
            ClubsController::buildClubData($match->home_team);
            ClubsController::buildClubData($match->away_team);
            if($type == 'SCHEDULED')
                {
                    unset($match->home_team_score);
                    unset($match->away_team_score);
                }
        }
        elseif($count > 1)
        {
            $match = DB::table('matches')->select('idClubHome as home_team', 'HomeClubScore as home_team_score', 'idClubAway as away_team', 'AwayClubScore as away_team_score', 'League as league', 'Date as date')->where('Type', $type)->orderBy('Date', $orderValue)->limit($count)->get();
            foreach ($match as $key => $matchData) {
                ClubsController::buildClubData($matchData->home_team);
                ClubsController::buildClubData($matchData->away_team);
                if($type == 'SCHEDULED')
                {
                    unset($matchData->home_team_score);
                    unset($matchData->away_team_score);
                }
            }
        }
        else
            $match = array();
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

    public function update_scheduled_matches()
    {
        // Upcoming Matches
        FootballAPIController::getScheduledMatches_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=SCHEDULED', env('APP_FootballAPIToken'), 'SCHEDULED');
    }

    public function update_live_match()
    {
        // Live Match Result
        FootballAPIController::getLiveMatch_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=LIVE', env('APP_FootballAPIToken'), 'LIVE');
    }

    public function update_finished_matches()
    {
        // Latest Match Result
        FootballAPIController::getFinishedMatches_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=FINISHED', env('APP_FootballAPIToken'), 'FINISHED');
    }

    public function get_scheduled_matches($count)
    {
        $this->buildMatchData($scheduled_matches, 'SCHEDULED', $count, 'asc');
        return response()->json($scheduled_matches);
    }

    public function get_live_match()
    {
        if(DB::table('matches')->where('Type', 'LIVE')->count() > 0)
            $this->buildMatchData($live_match, 'LIVE', 1, 'desc');
        else
            $this->buildMatchData($live_match, 'FINISHED', 1, 'desc');
        return response()->json($live_match);
    }

    public function get_finished_match()
    {
        $this->buildMatchData($finished_match, 'FINISHED', 1, 'desc');
        return response()->json($finished_match);
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
