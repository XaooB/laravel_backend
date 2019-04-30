<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LeagueScoreboard;
use App\Http\Resources\LeagueScoreboard as LeagueScoreboardResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\FootballAPIController;
use App\Http\Controllers\ClubsController;
use Facades\App\CacheData\LeagueScoreboardsCache;

class LeagueScoreboardController extends Controller
{
    public static function buildScoreboardData(&$scoreboard, $season, $league)
    {
        if($league == 'CL')
        {
            $scoreboard = DB::table('league_scoreboards')->select('Group as group')->where('Season', $season)->where('League', $league)->groupBy('Group')->get();
            foreach ($league_scoreboard as $key => $leagueClubs) {
                $leagueClubs->standings = DB::table('league_scoreboards')->select('idClub as club', 'Position as position', 'Matches as matches', 'Won as won', 'Draw as draw', 'Lost as lost', 'Points as points')->where('Season', $season)->where('League', $league)->where('Group', $leagueClubs->group)->orderBy('Position', 'asc')->get();
                foreach ($leagueClubs->standings as $key => $club) {
                    ClubsController::buildClubData($club->club);
                }
            }
        }
        if($league == 'PD')
            $scoreboard = DB::table('league_scoreboards')->select('idClub as club', 'Position as position', 'Matches as matches', 'Won as won', 'Draw as draw', 'Lost as lost', 'Points as points')->where('Season', $season)->where('League', $league)->orderBy('Position', 'asc')->get();
        foreach ($scoreboard as $key => $team) {
            ClubsController::buildClubData($team->club);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Spain League - Primera Division
        FootballAPIController::getLeagueScoreboard_PD_ExternalAPI('https://api.football-data.org/v2/competitions/PD/standings', env('APP_FootballAPIToken'));
        // Europe League - UEFA Champions League
        FootballAPIController::getLeagueScoreboard_CL_ExternalAPI('https://api.football-data.org/v2/competitions/CL/standings', env('APP_FootballAPIToken'));    
    }

    public function update_league_scoreboard_CL()
    {
        // Europe League - UEFA Champions League
        FootballAPIController::getLeagueScoreboard_CL_ExternalAPI('https://api.football-data.org/v2/competitions/CL/standings', env('APP_FootballAPIToken')); 
    }

    public function update_league_scoreboard_PD()
    {
        // Spain League - Primera Division
        FootballAPIController::getLeagueScoreboard_PD_ExternalAPI('https://api.football-data.org/v2/competitions/PD/standings', env('APP_FootballAPIToken'));
    }

    public function get_league_scoreboard($season, $league)
    {
        $league_scoreboard = LeagueScoreboardsCache::league_scoreboard($season, $league);
        return response()->json($league_scoreboard);
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
