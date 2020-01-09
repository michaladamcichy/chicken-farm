<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'id',
        'date',
        'time',
        'total',
        'customer_id'
    ];

    public $timestamps = false;
}
