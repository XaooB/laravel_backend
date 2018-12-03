<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserSurveyAnswers extends Resource
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
            'user' => $this->idUser,
            'surveyset' => $this->idSurveySet,
            'create_date' =>$this->created_at
        ];
    }
}
