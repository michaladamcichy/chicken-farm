<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Log;
use Validator;


class ProductsController extends Controller
{
    public function show() {
        return view('products');
    }

    public function addProduct(Request $request) {
        $product = $request->all();
		
		$rules = [
            'name' => 'required|max:20',
			'unit_cost' => 'required|numeric|gt:0'
        ];
        $customMessages = [
            'unit_cost.gt' => 'Koszt nie moze byc ujemny ani rowny 0!',
			'unit_cost.numeric' => 'Koszt musi byc liczba!',
			'name.required' => 'Pole nazwa nie moze byc puste',
			'unit_cost.required' => 'Pole koszt nie moze byc puste',
			'name.max' => 'Nazwa produktu moze zawierac maksymalnie 20 znakow'
        ];
        $validator = Validator::make($product, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
		
        $success = true;
        $id = null;
        try {
            $id = Product::insertGetId($product);
            $product = Product::find($id);
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($product);
        } else {
            return json_encode(['status' => 'error', 'messages' => ['Nie udalo sie dodac produktu']]);
        }
    }

    public function getProducts() {
        $products = Product::get();

        return json_encode($products);
    }

    public function updateProduct(Request $request) {
        $updatedProduct = $request->all();
        $success = true;
		
		$rules = [
            'name' => 'required|max:20',
			'unit_cost' => 'required|numeric|gt:0'
        ];
        $customMessages = [
            'unit_cost.gt' => 'Koszt nie moze byc ujemny ani rowny 0!',
			'unit_cost.numeric' => 'Koszt musi byc liczba!',
			'name.required' => 'Pole nazwa nie moze byc puste',
			'unit_cost.required' => 'Pole koszt nie moze byc puste',
			'name.max' => 'Nazwa produktu moze zawierac maksymalnie 20 znakow'
        ];
        $validator = Validator::make($updatedProduct, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
		
        try {
            $product = Product::find($updatedProduct['id']);
            $product->update($updatedProduct);
            $product->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($product);
        } else {
            return json_encode(['status' => 'error', 'messages' => ['Nie udalo sie edytowac produktu']]);
        }
    }

    public function deleteProduct($id) {
        $product = Product::find($id);
        $success = false;

        if($product) {
            $success = $product->delete();

            if($success) {
                return json_encode(['status' => 'success', 'id' => $product->id]);
            } else {
                return json_encode(['status' => 'error']);            
            }
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
