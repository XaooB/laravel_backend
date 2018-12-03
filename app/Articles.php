<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    //
    protected $fillable = ['idCategory', 'idUser', 'Topic', 'Image', 'Content', 'Views'];
}
