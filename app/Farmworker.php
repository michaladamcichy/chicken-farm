<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Farmworker extends Model
{
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'salary'
    ];

    public $timestamps = false;
}
