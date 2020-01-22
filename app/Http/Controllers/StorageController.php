<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Storagerecord;
use Log;

class StorageController extends Controller
{
    public function show() {
        return view('storage');
    }

    public function addStoragerecord(Request $request) {
        $storagerecord = $request->all();

        $success = true;
        try {
            Storagerecord::insert($storagerecord);
            $storagerecord = Storagerecord::where('date', $storagerecord['date'])
                ->where('time', $storagerecord['time'])
                ->where('product_id', $storagerecord['product_id'])->first();
        } catch(Exception $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($storagerecord);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
