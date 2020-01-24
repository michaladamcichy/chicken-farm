<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    protected $fillable = [
        'amount',
        'product_id',
        'transaction_id'
    ];

    protected $primaryKey = ['product_id','transaction_id'];
    public $incrementing = false;
    public $timestamps = false;
}
