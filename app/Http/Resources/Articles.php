<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Articles extends Resource
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
            'idarticle' => $this->idArticle,
            'category' => $this->idCategory,
            'user' => $this->idUser,
            'title' => $this->Title,
            'image' => $this->Image,
            'content' => $this->Content,
            'views' => $this->Views,
            'create_date' =>$this->created_at,
            'modify_date' =>$this->updated_at
        ];
    }
}
