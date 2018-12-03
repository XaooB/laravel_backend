<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class SurveySets extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'idsurveyset' => $this->idSurveySet,
            'idsurvey' => $this->idSurvey,
            'answer' => $this->Answer
        ];
    }
}
