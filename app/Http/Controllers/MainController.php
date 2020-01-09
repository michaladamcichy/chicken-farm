<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChickenHouse;
use Log;

class MainController extends Controller
{
    public function show() {
        $chickenHouses = ChickenHouse::get();
        return view('main', ['chickenHouses' => $chickenHouses]);
    }

    public function addChickenhouse (Request $request) {
        $chickenhouse = $request->all();

        $id = null;
        $id = Chickenhouse::insertGetId($chickenhouse);

        if($id) {
            $chickenhouse['id'] = $id;
            return $chickenhouse;
        } else {
            return ['status' => 'error'];
        }
    }

    public function updateChickenhouse(Request $request) {
        $newChickenhouse = $request->all();
        
        $success = true;
        try{
            $chickenhouse = Chickenhouse::find($request['id']);
            $chickenhouse->update(['size' => $newChickenhouse['size']]);
            $chickenhouse->save();
        } catch(Exception $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success) {
            return $chickenhouse;
        } else {
            return ['status' => 'error'];
        }
    }

    public function deleteChickenhouse($id) {
        $chickenhouse = null;
        try {
            $chickenhouse = Chickenhouse::find($id);
        } catch(Error $e) { //ALERT catch nie działa
            Log::info($e->getMessage());
        }

        if($chickenhouse) {
            $success = true;
            try{
                $chickenhouse->delete();
            } catch(Error $e) {
                $success = false;
                Log::info($e->getMessage());
            }

            if($success) {
                return json_encode(['status' => 'success']);
            } else {
                return json_encode(['status' => 'error']);            
            }
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
