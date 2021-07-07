<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Egg extends Model
{
    protected $fillable = [
        'date',
        'time',
        'chicken_id',
    ];

    protected $primaryKey = ['date','time', 'chicken_id'];
    public $incrementing = false;
    public $timestamps = false;
}
