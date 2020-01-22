<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Log;

class ProductsController extends Controller
{
    public function show() {
        return view('products');
    }

    public function addProduct(Request $request) {
        $product = $request->all();


        $success = true;
        $id = null;
        try {
            $id = Product::insertGetId($product);
            $product = Product::find($id);
        } catch(Exception $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            return json_encode($product);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function getProducts() {
        $products = Product::get();

        return json_encode($products);
    }

    public function updateProduct(Request $request) {
        $updatedProduct = $request->all();
        $success = true;
        try {
            $product = Product::find($updatedProduct['id']);
            $product->update($updatedProduct);
            $product->save();
        } catch(Exception $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($product);
        } else {
            return json_encode(['status' => 'error']);
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
