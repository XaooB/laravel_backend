<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LeagueScoreboard extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {   
        return [
            'idclub' => $this->idClub,
            'position' => $this->Position,
            'matches' => $this->Matches,
            'won' => $this->Won,
            'draw' => $this->Draw,
            'lost' => $this->Lost,
            'points' => $this->Points,
            'season' => $this->Season,
            'league' => $this->League
        ];
    }
}
