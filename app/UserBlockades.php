<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBlockades extends Model
{
    protected $fillable = ['idUser', 'idStaff', 'Value', 'Reason'];
}
