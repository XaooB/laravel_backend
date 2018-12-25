<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatchesChats extends Model
{
    protected $fillable = [
        'Content', 'updated_at',
    ];
}
