<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chicken;
use App\Chickenhouse;

class ChickenHouseController extends Controller
{
    public function show($id) {
       $chickens = Chicken::where('chickenhouse_id', $id)->get();

       return view('chickenHouse', ['chickens' => $chickens, 'id' => $id]);
    }

    public function addChicken(Request $request) {
        $chicken = $request->all();
        
        $id = null;
        try {
            $id = Chicken::insertGetId($chicken);
        } catch(Exception $e) {
        }
        
        if($id) {
            $chicken['id'] = strval($id);
            return json_encode($chicken);
        } else {
            return json_encode(['error' => 'INSERT FAILED']);
        }
    }
}
