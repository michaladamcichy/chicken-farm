<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Log;

class CustomersController extends Controller
{
    public function show() {
        return view('customers');
    }

    public function addCustomer(Request $request) {
        $customer = $request->all();

        $success = true;
        $id = null;
        try {
            $id = Customer::insertGetId($customer);
            $customer = Customer::find($id);
        } catch(Exception $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($customer);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
