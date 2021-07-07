<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\TransactionItem;
use Log;
use Validator;

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
		
		
		
		$length = sizeof($transactionItems)-1;
		if($length==-1){
			return json_encode(['status' => 'error', 'messages' => ['Musisz dodać przynajmniej 1 produkt']]);
		}
		else{
			$rules1 = [
				'date' => 'required',
				'time' => 'required',
				'customer_id' => 'required'
			];
			$customMessages1 = [
				'date.required' => 'Pole data nie moze byc puste!',
				'time.required' => 'Pole godzina nie moze byc puste!',
				'customer_id.required' => 'Pole klient nie moze byc puste!'
			];
			$validator1 = Validator::make($transaction, $rules1, $customMessages1);
			
			$messages2 = [];
			$rules2 = [
					'amount' => 'required|gt:0|numeric',
					'product_id' => 'required'
				];
				$customMessages2 = [
					'amount.gt' => 'Ilosc nie moze byc ujemna ani rowna 0!',
					'amount.numeric' => 'Ilosc musi byc liczba!',
					'amount.required' => 'Pole ilosc nie moze byc puste!',
					'product_id.required' => 'Pole produkt nie moze byc puste!'
				];
			
			$validation2=true;
			$validator2 = Validator::make($transactionItems[0], $rules2, $customMessages2);
			$messagesTemp = $validator2->messages()->get('*');
			$messages2 = array_merge($messages2,$messagesTemp);
			
			if($validator2->fails())
				$validation2=false;
			
		
			$messagesTemp = [];
			while($length>=1){
				$validator2 = Validator::make($transactionItems[$length], $rules2, $customMessages2);
				
				if($validator2->fails())
				$validation2=false;
				$length = $length - 1;
				$messagesTemp = $validator2->messages()->get('*');
				$messages2 = array_merge($messages2,$messagesTemp);
				
			}

			$messages1 = [];
			if ($validator1->fails()||$validation2==false) {
				$messages1 = $validator1->messages()->get('*');
				$messages = array_merge($messages1, $messages2);
				Log::info($messages);
				return json_encode(['status' => 'error', 'messages' => $messages]);
			}
			
			
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
				return json_encode(['status' => 'error', 'messages' => ['Nie udalo sie utworzyc transakcji']]);
			}
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
