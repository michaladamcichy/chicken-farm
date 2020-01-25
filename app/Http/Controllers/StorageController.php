<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Storagerecord;
use Log;
use Validator;

class StorageController extends Controller
{
    public function show() {
        return view('storage');
    }

    public function addStoragerecord(Request $request) {
        $storagerecord = $request->all();

		$rules = [
            'date' => 'required',
			'time' => 'required',
			'type' => 'required',
			'amount' => 'required|gt:0|numeric',
			'product_id' => 'required'
        ];
        $customMessages = [
            'amount.gt' => 'Ilosc nie moze byc ujemna ani rowna 0!',
			'amount.numeric' => 'Ilosc musi byc liczba!',
			'amount.required' => 'Pole ilosc nie moze byc puste!',
			'date.required' => 'Pole data nie moze byc puste!',
			'time.required' => 'Pole godzina nie moze byc puste!',
			'type.required' => 'Pole typ nie moze byc puste!',
			'product_id.required' => 'Pole produkt nie moze byc puste!'
        ];
        $validator = Validator::make($storagerecord, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		

        $success = true;
        try {
            Storagerecord::insert($storagerecord);
            $storagerecord = Storagerecord::where('date', $storagerecord['date'])
                ->where('time', $storagerecord['time'])
                ->where('product_id', $storagerecord['product_id'])->first();
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($storagerecord);
        } else {
            return json_encode(['status' => 'error', 'messages' => ['Nie udalo sie utworzyc wypisu w historii magazynu']]);
        }
    }

    public function updateStoragerecord(Request $request) {
        $updatedStoragerecord = $request->all();
        $success = true;
		
		$rules = [
            'date' => 'required',
			'time' => 'required',
			'type' => 'required',
			'amount' => 'required|gt:0|numeric',
			'product_id' => 'required'
        ];
        $customMessages = [
            'amount.gt' => 'Ilosc nie moze byc ujemna ani rowna 0!',
			'amount.numeric' => 'Ilosc musi byc liczba!',
			'amount.required' => 'Pole ilosc nie moze byc puste!',
			'date.required' => 'Pole data nie moze byc puste!',
			'time.required' => 'Pole godzina nie moze byc puste!',
			'type.required' => 'Pole typ nie moze byc puste!',
			'product_id.required' => 'Pole produkt nie moze byc puste!'
        ];
        $validator = Validator::make($updatedStoragerecord, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		

        try {
            $storagerecord = Storagerecord::where('date', $updatedStoragerecord['date'])
                ->where('time', $updatedStoragerecord['time'])
                ->where('product_id', $updatedStoragerecord['product_id'])
                ->first();
            $storagerecord->update($updatedStoragerecord);
            $storagerecord->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($storagerecord);
        } else {
            return json_encode(['status' => 'error', 'message' => ['Nie udalo sie utworzyc wypisu w historii magazynu']]);
        }
    }

    public function deleteStoragerecord(Request $request) {
        $storagerecord = $request->all();

        try {
            $storagerecord = Storagerecord::where('date', $storagerecord['date'])
                    ->where('time', $storagerecord['time'])
                    ->where('product_id', $storagerecord['product_id'])
                    ->first();
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $storagerecord = null;
        }

        $success = false;

        if($storagerecord) {
            $success = $storagerecord->delete();

            if($success) {
                return json_encode(['status' => 'success', 'id' => $storagerecord->id]);
            } else {
                return json_encode(['status' => 'error']);            
            }
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
