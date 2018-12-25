<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MatchesChats extends JsonResource
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
            'idmatchchat' => $this->idMatchChat,
            'user' => $this->idUser,
            'content' => $this->Content,
            'visible' => $this->Visible,
            'create_date' =>$this->created_at,
            'modify_date' =>$this->updated_at
        ];
    }
}
