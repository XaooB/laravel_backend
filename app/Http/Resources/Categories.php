<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Categories extends Resource
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
            'idcategory' => $this->idCategory,
            'name' => $this->Name
        ];
    }
}
