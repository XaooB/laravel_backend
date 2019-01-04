<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\SurveySets;
use App\Http\Resources\SurveySets as SurveySetsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserSurveyAnswersController;

class SurveySetsController extends Controller
{
    public static function buildSurveySetData(&$survey)
    {
        $survey = DB::table('survey_sets')->select('Answer as answer', 'idSurveySet as id_survey_set')->where('idSurvey', $survey)->get();
    }

    public static function getAnswers(&$survey, $surveyID)
    {
        $surveyAnswers = DB::table('survey_sets')->leftJoin('user_survey_answers', 'user_survey_answers.idSurveySet', '=', 'survey_sets.idSurveySet')->select('survey_sets.idSurveySet as idsurveyset', 'survey_sets.Answer as answer', DB::raw('count(user_survey_answers.idSurveySet) as users_anwsers_count'))->groupBy('survey_sets.idSurveySet', 'survey_sets.Answer', 'user_survey_answers.idSurveySet')->where('survey_sets.idSurvey', $surveyID)->get();
        foreach ($surveyAnswers as $key => $surveyAnswer) {
            array_push($survey, array('idsurveyset' => $surveyAnswer->idsurveyset, 'answer' => $surveyAnswer->answer, 'answers_count' => $surveyAnswer->users_anwsers_count));
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /*$surveys = DB::table('surveys')->select( 'idSurvey as idsurvey', 'Topic as topic')->get();
        foreach ($surveys as $key => $survey) {
            $survey->answers = array();
            $this->getAnswers($survey->answers, $survey->idsurvey);
        }
        return response()->json($surveys);*/
    }

    public function get_survey_set($id)
    {
        $survey_set = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->where('idSurvey', $id)->first();
        $survey_set->answers = array();
        $this->getAnswers($survey_set->answers, $survey_set->idsurveyset);
        return response()->json($survey_set);
    }

    public function get_latest()
    {
        $latestSurvey = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->orderBy('idSurvey', 'desc')->first();
        $latestSurvey->answers = array();
        $this->getAnswers($latestSurvey->answers, $latestSurvey->idsurvey);
        return response()->json($latestSurvey);
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
        $data = json_decode($request->getContent(), true);
        if(isset($data['answer']))
        {
            foreach ($data['answer'] as $key => $answer)
            {
                if(SurveySets::where('idSurvey', $request->idsurvey)->where('Answer', $answer)->exists()) 
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            foreach ($data['answer'] as $key => $answer)
            {
                $survey_set = new SurveySets;
                $survey_set->idSurvey = $request->idsurvey;
                $survey_set->Answer = $answer;
                if($survey_set->save()) 
                    { }
                else
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            return response()->json(['status' => true, 'error' => '']);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data']);
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
        $data = json_decode($request->getContent(), true);
        if(isset($data['answer']))
        {
            if(SurveySets::where('idSurveySet', '=' , $id)->update(['Answer' => $data['answer']])) 
                return response()->json(['status' => true, 'error' => '']);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
        
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
        if(SurveySets::where('idSurveySet', '=' , $id)->delete()) 
            return response()->json(['status' => true, 'error' => '']);
        else 
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }
}
