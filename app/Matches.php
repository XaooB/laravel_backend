<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    protected $fillable = [
        'id', 'League', 'Date', 'Location','idClubHome', 'HomeClubScore', 'idClubAway', 'AwayClubScore', 'Type' 
    ];
}
