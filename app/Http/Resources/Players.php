<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Players extends Resource
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
            'id_player' => $this->idPlayer,
            'name' => $this->Name,
            'date_of_birth' => $this->DateOfBirth,
            'nationality' => $this->Nationality,
            'image' => $this->Image,
            'position' => $this->Position,
            'shirt_number' => $this->ShirtNumber,
            'role' => $this->Role
        ];
    }
}
