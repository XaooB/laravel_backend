<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Users extends Resource
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
            'iduser' => $this->id,
            'name' => $this->Name,
            'email' => $this->Email,
            'image' => $this->Image,
            'privilege' => $this->idPrivilege,
            'status' => $this->idStatus,
            'create_date' =>$this->created_at
        ];
    }
}
