<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Surveys extends Resource
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
            'idsurvey' => $this->idSurvey,
            'topic' => $this->Topic,
            'create_date' =>$this->created_at
        ];
    }
}
