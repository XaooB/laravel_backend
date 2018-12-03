<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserChanges extends JsonResource
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
            'iduser' => $this->idUser,
            'idstaff' => $this->idStaff,
            'value_before' => $this->ValueBefore,
            'value_after' => $this->ValueAfter,
            'date' => $this->created_at
        ];
    }
}
