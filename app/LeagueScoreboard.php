<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeagueScoreboard extends Model
{
    protected $fillable = [
        'idClub', 'Position', 'Matches', 'Won', 'Draw', 'Lost', 'Points', 'Season', 'League',
    ];
}