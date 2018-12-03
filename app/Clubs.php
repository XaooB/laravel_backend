<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clubs extends Model
{
    protected $fillable = [
        'idClub', 'Name', 'Image',
    ];
}
