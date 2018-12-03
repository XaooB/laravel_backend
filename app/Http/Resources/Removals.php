<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Removals extends JsonResource
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
            'iduser' => $this->id,
            'provider' => $this->provider,
            'provider_id' => $this->provider_id,
            'create_date' =>$this->created_at,
            'removal_date' =>$this->updated_at
        ];
    }
}
