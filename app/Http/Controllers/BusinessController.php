<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Product;
use App\Transaction;
use App\Storagerecord;
use Log;

class BusinessController extends Controller
{
    public function show() {
        $customers = Customer::all();
        $products = Product::all();
        $transactions = Transaction::all();
        $storagerecords = Storagerecord::join('products', 'storagerecords.product_id', '=', 'products.id')
            ->select('storagerecords.*', 'products.name')->get();

        return view('business',
            ['customers' => $customers,
            'products' => $products,
            'transactions' => $transactions,
            'storagerecords' => $storagerecords]);
    }
}
