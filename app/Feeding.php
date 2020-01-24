<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feeding extends Model
{
    protected $fillable = [
        'date',
        'time',
        'fodder_amount',
        'chickenhouse_id'
    ];

    public $timestamps = false;
}
