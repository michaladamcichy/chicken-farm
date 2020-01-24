<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chicken;
use App\Chickenhouse;
use App\Feeding;
use App\Farmworker;
use App\ChickenhousesFarmworkers;
use Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Input;

class ChickenHouseController extends Controller
{
    public function show($id) {
       $chickens = Chicken::where('chickenhouse_id', $id)->get();
       $chickenhouseSize = Chickenhouse::find($id)['size']; //ALERT SPRAWDZAĆ

       return view('chickenHouse', ['chickens' => $chickens, 'id' => $id, 'size' => $chickenhouseSize]);
    }

    public function addChicken(Request $request) {
		$success = true;
        $chicken = $request->all();
        $rules = [
            'weight' => 'required|numeric|gt:0',
			'birthdate' => 'required',
			'type' => 'required'
        ];
        $customMessages = [
            'weight.gt' => 'Waga nie moze byc ujemna ani rowna 0!',
			'weight.numeric' => 'Waga musi byc liczba!',
			'birthdate.required' => 'Pole data urodzenia nie moze byc puste',
			'type.required' => 'Pole rodzaj kurczaka nie moze byc puste',
			'weight.required' => 'Pole masa nie moze byc puste'
        ];
        $validator = Validator::make($chicken, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
        
		$id = null;
        try {
            $id = Chicken::insertGetId($chicken);
        } catch(\Throwable $e) {
			$success = false;
            Log::info($e->getMessage());
        }
		
        if($success == true) {
            $chicken['id'] = strval($id);
            return json_encode($chicken);
        } 
		else{
			return json_encode(['status' => 'error', 'messages'=> ['Nie udalo sie dodac kurczaka'] ]);
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
		
		$rules = [
            'weight' => 'required|numeric|gt:0',
			'birthdate' => 'required',
			'type' => 'required'
        ];
        $customMessages = [
            'weight.gt' => 'Waga nie moze byc ujemna ani rowna 0!',
			'weight.numeric' => 'Waga musi byc liczba!',
			'birthdate.required' => 'Pole data urodzenia nie moze byc puste',
			'type.required' => 'Pole rodzaj kurczaka nie moze byc puste',
			'weight.required' => 'Pole masa nie moze byc puste'
        ];
        $validator = Validator::make($updatedChicken, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
		
        try {
            $chicken = Chicken::find($updatedChicken['id']);
            $chicken->update($updatedChicken);
            $chicken->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success == true) {
            return json_encode($chicken);
        } else {
            return json_encode(['status' => 'error', 'messages'=> ['Nie udalo sie edytowac kurczaka'] ]);
        }
    }

    public function feedChickens(Request $request) {
        $feeding = $request->all();
        $success = true;
		
		$rules = [
            'fodder_amount' => 'required|numeric|gt:0',
			'date' => 'required',
			'time' => 'required'
        ];
        $customMessages = [
            'fodder_amount.gt' => 'Waga nie moze byc ujemna ani rowna 0!',
			'fodder_amount.numeric' => 'Waga musi byc liczba!',
			'date.required' => 'Pole data nie moze byc puste',
			'fodder_amount.required' => 'Pole ilosc karmy nie moze byc puste',
			'time.required' => 'Pole godzina nie moze byc puste',
        ];
        $validator = Validator::make($feeding, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
        try {
            Feeding::insert($feeding);
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }
        
        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error', 'messages'=> ['Nie udalo sie nakarmic kurnika'] ]);
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
        catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }
        
        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function moveChicken(Request $request) {
        $success = true;
        
        try {
            $data = $request->all();

            $chickenId = $data['chickenId'];
            $targetChickenhouseId = $data['targetChickenhouseId'];

            $chicken = Chicken::find($chickenId);
            $chicken->update(['chickenhouse_id' => $targetChickenhouseId]);
            $chicken->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }

    public function getLastFeeding($id) {
        $success = true;

        $lastFeeding = '';
        try {
            $lastFeeding = Feeding::where('chickenhouse_id', $id)->orderBy('date', 'desc')->orderBy('time', 'desc')->first();
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == false) {
            return json_encode(['status' => 'error']);
        } else {
            return json_encode($lastFeeding);
        }


    }
}
