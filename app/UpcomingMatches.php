<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UpcomingMatches extends Model
{
        protected $fillable = [
        'id', 'League', 'Date', 'Location','idClub', 
    ];
}