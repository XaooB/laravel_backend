<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LatestMatchResults extends Model
{
    protected $fillable = [
        'id', 'League', 'Date', 'Location','idClubHome', 'HomeClubScore', 'idClubAway', 'AwayClubScore', 'Type' 
    ];
}
