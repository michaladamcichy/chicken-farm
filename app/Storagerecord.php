<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Storagerecord extends Model
{
    protected $fillable = [
        'data',
        'time',
        'amount',
        'type',
        'product_id'
    ];

    public $timestamps = false;
}
