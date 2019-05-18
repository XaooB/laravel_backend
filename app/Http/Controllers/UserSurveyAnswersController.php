<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\UserSurveyAnswers;
use App\Http\Resources\UserSurveyAnswers as UserSurveyAnswersResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use Facades\App\CacheData\SurveysCache;

if(!isset($_SESSION)) { session_start(); } 

class UserSurveyAnswersController extends Controller
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

    public function get_user_answer_to_survey($id_survey)
    {
        $dataArray = array();
        $survey_set = DB::table('survey_sets')->select('idSurveySet')->where('idSurvey', $id_survey)->pluck('idSurveySet');
        $user_answerId = DB::table('user_survey_answers')->select('idSurveySet')->whereIn('idSurveySet', $survey_set)->where('idUser', $_SESSION['iduser'])->value('idSurveySet');
        $user_answer = DB::table('survey_sets')->select('Answer')->where('idSurveySet', '=', $user_answerId)->value('Answer');
        $date = DB::table('user_survey_answers')->select('created_at')->whereIn('idSurveySet', $survey_set)->where('idUser', $_SESSION['iduser'])->value('created_at');
        $data = array(
            'idsurveyset' => $user_answerId,
            'answer' => $user_answer,
            'date' => $date);
        array_push($dataArray, $data);
        return response()->json($dataArray);
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
        if(isset($data['idsurveyset']) && isset($data['idsurvey']))
        {
            if(UserSurveyAnswers::updateOrCreate(['idUser' => $_SESSION['iduser'], 'idSurvey' => $data['idsurvey']], 
                ['idSurveySet' => $data['idsurveyset']]))
            {
                SurveysCache::forgetKey('latest');
                SurveysCache::forgetKey('latest.user.' . $_SESSION['iduser']);
                return response()->json(['message' => 'success']);
            }
        }
        return response()->json(['message' => 'connection failure'], 400);
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
            if(UserSurveyAnswers::where('idUser', '=' , $id)->update(['idSurveySet' => $request->idsurveyset])) {return response()->json(['message' => 'success']);}
            else {return response()->json(['message' => 'connection failure']);}
        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $data = json_decode($request->getContent(), true);
        if(isset($data['idsurvey']))
            if(UserSurveyAnswers::where('idUser', $id)->where('idUser', $_SESSION['iduser'])->where('idSurvey', $data['idsurvey'])->delete()) 
                return response()->json(['message' => 'success']);
        return response()->json(['message' => 'connection failure'], 400);
    }
}