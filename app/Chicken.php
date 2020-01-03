<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chicken extends Model
{
    protected $fillable = [
        'id',
        'birthdate',
        'weight',
        'type',
        'chickenhouse_id'
    ];
}
