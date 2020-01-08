<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chicken;
use App\Chickenhouse;
use Log;

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
            Log::info($e->getMessage());
        }
        
        if($id) {
            $chicken['id'] = strval($id);
            return json_encode($chicken);
        } else {
            return json_encode(['error' => 'INSERT FAILED']);
        }
    }
    
    public function killChicken($id) {
        $chicken = Chicken::find($id);
        $success = false;

        if($chicken) {
            $success = $chicken->delete();

            if($success) {
                return json_encode(['status' => 'success', 'id' => $chicken->id]);
            } else {
                return json_encode(['status' => 'error']);            
            }
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function updateChicken(Request $request) {
        $updatedChicken = $request->all();
        Log::info($updatedChicken);
        $success = true;
        try {
            $chicken = Chicken::find($updatedChicken['id']);
            $chicken->update($updatedChicken);
            $chicken->save();
        } catch(Exception $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($chicken);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
