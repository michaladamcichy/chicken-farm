<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChickenhousesFarmworkers extends Model
{
    protected $fillable = [
        'chickenhouse_id',
        'worker_id'
    ];

    public $timestamps = false;
}
