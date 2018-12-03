<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Comments extends Resource
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
            'idcomment' => $this->idComment,
            'user' => $this->idUser,
            'content' => $this->Content,
            'visible' => $this->Visible,
            'create_date' =>$this->created_at,
            'modify_date' =>$this->updated_at,
            'comments' => $this->idReference
        ];
    }
}
