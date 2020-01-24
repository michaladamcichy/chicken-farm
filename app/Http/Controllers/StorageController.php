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
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($storagerecord);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function updateStoragerecord(Request $request) {
        $updatedStoragerecord = $request->all();
        $success = true;
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
            return json_encode(['status' => 'error']);
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
