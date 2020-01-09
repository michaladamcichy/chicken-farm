<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chickenhouse extends Model
{
    protected $fillable = [
        'id',
        'size'
    ];

    public $timestamps = false;
}