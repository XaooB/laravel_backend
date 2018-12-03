<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\UpcomingMatches;
use App\Http\Resources\UpcomingMatches as UpcomingMatchesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\ExternalAPI\FootballAPIConnector;
use App\Http\Controllers\ClubsController;

class UpcomingMatchesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Upcoming Matches
        FootballAPIConnector::getUpcomingMatches_ExternalAPI('https://api.football-data.org/v2/teams/86/matches?status=SCHEDULED', env('APP_FootballAPIToken'));
    }

    public function get_upcoming_matches($count)
    {
        $upcoming_matches = DB::table('upcoming_matches')->select('League as league', 'Date as date', 'Location as location', 'idClub as club')->where('upcoming_matches.Date', '>', DB::raw('NOW()'))->orderBy('upcoming_matches.Date', 'asc')->limit($count)->get();
        foreach ($upcoming_matches as $key => $match) {
            ClubsController::buildClubData($match->club);
        }
        return response()->json($upcoming_matches);
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
