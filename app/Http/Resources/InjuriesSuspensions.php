<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InjuriesSuspensions extends JsonResource
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
            'idinjurysuspension' => $this->idInjurySuspension,
            'player' => $this->idPlayer,
            'type' => $this->Type,
            'description' => $this->Description,
            'return_date' => $this->ReturnDate,
            'create_date' =>$this->created_at
        ];
    }
}
