<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LatestMatchResults extends JsonResource
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
            'id' => $this->id,
            'league' => $this->League,
            'date' => $this->Date,
            'location' => $this->Location,
            'home_team' => $this->idClubHome,
            'home_team_score' => $this->HomeClubScore,
            'away_team' => $this->idClubAway,
            'away_team_score' => $this->AwayClubScore
        ];
    }
}
