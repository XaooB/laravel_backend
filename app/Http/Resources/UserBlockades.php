<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserBlockades extends JsonResource
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
            'user' => $this->idUser,
            'staff' => $this->idStaff,
            'value' => $this->Value,
            'reason' => $this->Reason,
            'date' => $this->created_at
        ];
    }
}
