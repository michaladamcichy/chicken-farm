<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChickenHouse;
use App\Feeding;
use App\Farmworker;
use App\ChickenhousesFarmworkers;
use Log;
use Validator;

class MainController extends Controller
{
    public function show() {
        $chickenHouses = ChickenHouse::get();
        return view('main', ['chickenHouses' => $chickenHouses]);
    }

    public function addChickenhouse (Request $request) {
        $chickenhouse = $request->all();

		$rules = [
            'size' => 'required|numeric|gt:0',
        ];
        $customMessages = [
            'size.gt' => 'Liczba grzed nie moze byc ujemna ani rowna 0!',
			'size.numeric' => 'Liczba grzed musi byc liczba!',
			'size.required' => 'Pole liczba grzed nie moze byc puste!'
        ];
        $validator = Validator::make($chickenhouse, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
        $id = null;
        $success = true;
        try{
            $id = Chickenhouse::insertGetId($chickenhouse);
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
            $success = false;
        }

        if($success == true) {
            $chickenhouse['id'] = $id;
            return json_encode($chickenhouse);
        } else {
            return json_encode (['status' => 'error', 'messages'=> ['Nie udalo sie stworzyc kurnika'] ]);
        }
    }

    public function updateChickenhouse(Request $request) {
        $newChickenhouse = $request->all();
        
		$rules = [
            'size' => 'required|numeric|gt:0',
        ];
        $customMessages = [
            'size.gt' => 'Liczba grzed nie moze byc ujemna ani rowna 0!',
			'size.numeric' => 'Liczba grzed musi byc liczba!',
			'size.required' => 'Pole liczba grzed nie moze byc puste!'
        ];
        $validator = Validator::make($newChickenhouse, $rules, $customMessages);

        $messages = [];
        if ($validator->fails()) {
            $messages = $validator->messages()->get('*');
			Log::info($messages);
			return json_encode(['status' => 'error', 'messages' => $messages]);
        }
		
        $success = true;
        try{
            $chickenhouse = Chickenhouse::find($request['id']);
            $chickenhouse->update(['size' => $newChickenhouse['size']]);
            $chickenhouse->save();
        } catch(\Throwable $e) {
            $success = false;
            Log::info($e->getMessage());
        }

        if($success) {
            return json_encode($chickenhouse);
        } else {
            return json_encode(['status' => 'error', 'messages'=> ['Nie udalo sie edytowac kurnika']]);
        }
    }

    public function deleteChickenhouse($id) {
        $chickenhouse = null;
        try {
            $chickenhouse = Chickenhouse::find($id);
        } catch(\Throwable $e) {
            Log::info($e->getMessage());
        }

        if($chickenhouse) {
            $success = true;
            try{
                Feeding::where('chickenhouse_id', $id)->delete();
                ChickenhousesFarmworkers::where('chickenhouse_id', $id)->delete();
                $chickenhouse->delete();
            } catch(\Throwable $e) {
                $success = false;
                Log::info($e->getMessage());
            }

            if($success) {
                return json_encode(['status' => 'success']);
            } else {
                return json_encode(['status' => 'error', 'messages' => ['Oszalałeś? A gdzie podzieją się te biedne kurczaki? Najpierw przenieś je do innych kurników lub zabij.']]);            
            }
        } else {
            return json_encode(['status' => 'error', 'messages' => ['Kurnik nie istnieje']]);
        }
    }

    public function getChickenhousesIds(Request $request) {
        $chickenhouses = ChickenHouse::get('id');

        $chickenhousesIds = [];
        foreach($chickenhouses as $chickenhouse) {
            array_push($chickenhousesIds, $chickenhouse->id); 
        }

        return json_encode($chickenhousesIds);
    }

    public function getWorkers(Request $request) {
        return json_encode(Farmworker::get());
    }

    public function updateWorkers(Request $request) {
        $data = $request->all();
        $newWorkers = $data['newWorkers'];
        $updatedWorkers = $data['updatedWorkers'];
        $deletedWorkers = $data['deletedWorkers'];

        $success = true;
        foreach($newWorkers as $worker) {
            try {
                if(array_key_exists('changed', $worker)) unset($worker['changed']);
                Farmworker::insert($worker);
            } catch(\Throwable $e) {
                Log::info($e->getMessage());
                $success = false;
            }
        }

        foreach($updatedWorkers as $worker) {
            try {
                if(array_key_exists('changed', $worker)) unset($worker['changed']);
                $oldWorker = Farmworker::find($worker['id']);
                $oldWorker->update($worker);
                $oldWorker->save();
            } catch(\Throwable $e) {
                Log::info($e->getMessage());
                $success = false;
            }
        }

        foreach($deletedWorkers as $worker) {
            try {
                $worker = Farmworker::find($worker);
                $worker->delete();
            } catch(\Throwable $e) {
                Log::info($e->getMessage());
                $success = false;
            }
        }
        
        if($success) {
            return json_encode(['status' => 'success']);
        } else {
            return json_encode(['status' => 'error']);
        }
    }
}
