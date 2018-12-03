<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Removals extends Model
{
    protected $fillable = [
        'provider', 'provider_id',
    ];
}
