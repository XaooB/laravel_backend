<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserChanges extends Model
{
    protected $fillable = ['idUser', 'idStaff', 'ValueBefore', 'ValueAfter'];
}
