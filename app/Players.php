<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Players extends Model
{
    protected $fillable = [
        'idPlayer', 'Name', 'DateOfBirth', 'Nationality', 'Image', 'Position', 'ShirtNumber', 'Role'
    ];
}
