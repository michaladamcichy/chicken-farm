<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chicken;
use App\Chickenhouse;
use App\Feeding;
use App\Farmworker;
use App\ChickenhousesFarmworkers;
use Log;

class ChickenHouseController extends Controller
{
    public function show($id) {
       $chickens = Chicken::where('chickenhouse_id', $id)->get();
       $chickenhouseSize = Chickenhouse::find($id)['size']; //ALERT SPRAWDZAĆ

       return view('chickenHouse', ['chickens' => $chickens, 'id' => $id, 'size' => $chickenhouseSize]);
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
            return json_encode(['status' => 'error']);
        }
    }
    
    public function killChicken($id) { //ALERT dodać try catche tak jak w deleteChickenhouse 
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

    public function feedChickens(Request $request) {
        $feeding = $request->all();
        
        $success = true;
        try {
            Feeding::insert($feeding);
        } catch(Exception $e) {
            $success = false;
            Log::info($e->getMessage());
        }
        
        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function getChickenhouseWorkers($id) {
        $all = Farmworker::get();
        $onDuty = Farmworker::join('chickenhouses_farmworkers', 'chickenhouses_farmworkers.worker_id', '=', 'farmworkers.id')->where('chickenhouse_id', $id)->get();

        $result = json_encode(['all' => $all, 'onDuty' => $onDuty]);

        return $result;
    }

    public function updateWorkersOnDuty(Request $request) {
        $success = true;
        
        try {
            $data = $request->all();
            Log::info($data);

            $workers = $data['workers'];
            $chickenhouseId = $data['chickenhouseId'];

            $chickenhousesFarmworkers = ChickenhousesFarmworkers::where('chickenhouse_id', $chickenhouseId)->delete();

            $chickenhousesFarmworkers = [];
            foreach($workers as $worker) {
                array_push($chickenhousesFarmworkers, ['chickenhouse_id' => $chickenhouseId, 'worker_id' => $worker]);
            }
            
            ChickenhousesFarmworkers::insert($chickenhousesFarmworkers);
        }
        catch(Exception $e) {
            $success = false;
            Log::info($e->getMessage());
        }
        
        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
