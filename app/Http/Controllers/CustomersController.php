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
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($customer);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function updateCustomer(Request $request) {
        $updatedCustomer = $request->all();
        $success = true;
        try {
            $customer = Customer::find($updatedCustomer['id']);
            $customer->update($updatedCustomer);
            $customer->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($customer);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function deleteCustomer($id) {
        $customer = Customer::find($id);
        $success = false;

        if($customer) {
            $success = $customer->delete();

            if($success) {
                return json_encode(['status' => 'success', 'id' => $customer->id]);
            } else {
                return json_encode(['status' => 'error']);            
            }
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function getCustomers(Request $request) {
        $customers = Customer::get();

        return json_encode($customers);
    }
}
