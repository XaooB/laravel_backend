<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Surveys;
use App\Http\Resources\Surveys as SurveysResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SurveySetsController;

class SurveysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $surveys = Surveys::all();
        return response()->json(SurveysResource::collection($surveys));
    }

    public function get_survey($id)
    {
        $survey = Surveys::where('idSurvey', $id)->take(1)->get();
        return response()->json(SurveysResource::collection($survey));
    }

    public function latest($count)
    {
        //$survey = Surveys::orderBy('idSurvey', 'desc')->take($count)->get();
        //return response()->json(SurveysResource::collection($survey));
        $surveys = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic', 'idSurvey as answers','created_at as create_date')->orderBy('idSurvey', 'desc')->take($count)->get();
        foreach ($surveys as $key => $survey) {
            SurveySetsController::buildSurveySetData($survey->answers);
        }
        return response()->json($surveys);
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
        $surveys = new Surveys;
        $surveys->Topic = $request->topic;
        if(Surveys::where('Topic', '=' , $request->topic)->exists()) {return response()->json(['message' => 'failure']);}
        else {if($surveys->save()) {return response()->json(['message' => 'success']);}}
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
        if(Surveys::where('idSurvey', '=' , $id)->update(['Topic' => $request->topic])) {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'connection failure']);}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /*
            Aby wysłać dane (usunięcie) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="DELETE">
        */
        if(Surveys::where('idSurvey', '=' , $id)->delete()) {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'connection failure']);}
    }
}

