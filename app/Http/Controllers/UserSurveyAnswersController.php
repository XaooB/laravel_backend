<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\UserSurveyAnswers;
use App\Http\Resources\UserSurveyAnswers as UserSurveyAnswersResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;

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

    public function get_user_answer_to_survey($id_user, $id_survey)
    {
        $dataArray = array();
        $survey_set = DB::table('survey_sets')->select('idSurveySet')->where('idSurvey', '=', $id_survey)->pluck('idSurveySet');
        $user_answerId = DB::table('user_survey_answers')->select('idSurveySet')->whereIn('idSurveySet', $survey_set)->where('idUser', $id_user)->value('idSurveySet');
        $user_answer = DB::table('survey_sets')->select('Answer')->where('idSurveySet', '=', $user_answerId)->value('Answer');
        $date = DB::table('user_survey_answers')->select('created_at')->whereIn('idSurveySet', $survey_set)->where('idUser', $id_user)->value('created_at');
        $data = array(
            'user_answer' => $user_answer,
            'date' => $date);
        array_push($dataArray, $data);
        return response()->json($dataArray);
    }

    public function get_users_answers_to_survey_count($id_survey)
    {
        $dataArray = array();
        $currentIndex = 0;
        $survey_setIds = DB::table('survey_sets')->select('idSurveySet')->where('idSurvey', '=', $id_survey)->pluck('idSurveySet');
        $survey_setAnswers = DB::table('survey_sets')->select('Answer')->where('idSurvey', '=', $id_survey)->pluck('Answer');
        foreach ($survey_setIds as $key => $surveySetId) {
            $userSurveyAnswersCount = DB::table('user_survey_answers')->where('idSurveySet', '=', $surveySetId)->count();
            $dataOne = array('answer' => $survey_setAnswers[$currentIndex++], 'count' => $userSurveyAnswersCount);
            array_push($dataArray, $dataOne);
        }
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
        $user_survey_answer = new UserSurveyAnswers;
        $user_survey_answer->idUser = DB::table('users')->select('id')->where('remember_token', $_SESSION['token'])->value('id');
        $user_survey_answer->idSurveySet = $request->idsurveyset;
        $surveyId = DB::table('survey_sets')->select('idSurvey')->where('idSurveySet', '=', $request->idsurveyset)->value('idSurvey');
        $answers = DB::table('survey_sets')->select('idSurveySet')->where('idSurvey', '=', $surveyId)->pluck('idSurveySet');
        if(UserSurveyAnswers::where('idUser', '=' , $user_survey_answer->idUser)->whereIn('idSurveySet', $answers)->exists()) 
            {return response()->json(['message' => 'failure']);}
        else {if($user_survey_answer->save()) {return response()->json(['message' => 'success']);}}
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
        if(UserSurveyAnswers::where('idUser', '=' , $id)->where('idSurveySet', '=' , $request->idsurveyset)->delete()) 
            {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'connection failure']);}
    }
}
