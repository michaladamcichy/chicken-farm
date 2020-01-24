<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\TransactionItem;
use Log;

class TransactionsController extends Controller
{
    private function sumTransactionItems($transactionItems) {
        $sum = 0;
        foreach($transactionItems as $transactionItem) {
            $sum += $transactionItem['amount'] * $transactionItem['product_unit_cost'];
        }
    }

    public function show() {
        return view('transactions');
    }

    public function addTransaction(Request $request) {
        $request = $request->all();
        $transaction = $request['transaction'];
        $transactionItems = $request['transactionItems'];
        
        $success = true;
        $id = null;
        try {
            $id = Transaction::insertGetId($transaction);
            $transaction = Transaction::find($id);

            foreach($transactionItems as $transactionItem) {
                $transactionItem['transaction_id'] = $id;
                TransactionItem::insert($transactionItem);
            }
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($transaction);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function getTransactionItems($id) {
        $success = true;
        $transactionItems = [];
        try {
            $transactionItems = TransactionItem::where('transaction_id', $id)
                ->join('products', 'products.id', '=', 'transaction_items.product_id')
                ->select('transaction_items.*', 'products.name as product_name', 'products.unit_cost as product_unit_cost')
                ->orderBy('product_id')->get();
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }
        return json_encode($transactionItems);
    }

    public function deleteTransaction($id) {
        $success = true;

        try {
            $transactionItems = TransactionItem::where('transaction_id', $id)->delete();

            $transaction = Transaction::find($id);
            $transaction->delete();
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
