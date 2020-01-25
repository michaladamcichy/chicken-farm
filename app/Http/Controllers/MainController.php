<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChickenHouse;
use App\Feeding;
use App\Farmworker;
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
                $feedings = Feeding::where('chickenhouse_id', $id)->delete();
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

		$rules = [
            'salary' => 'required|numeric|gt:0',
			'first_name' => 'required|max:20',
			'last_name' => 'required|max:20'
        ];
        $customMessages = [
            'salary.gt' => 'Pensja nie moze byc ujemna ani rowna 0!',
			'salary.numeric' => 'Pensja musi byc liczba!',
			'first_name.required' => 'Pole imie nie moze byc puste',
			'last_name.required' => 'Pole nazwisko kurczaka nie moze byc puste',
			'salary.required' => 'Pole pensja nie moze byc puste',
			'first_name.max' => 'Imie moze zawierac maksymalnie 20 znakow',
			'last_name.max' => 'Nazwisko moze zawierac maksymalnie 20 znakow'
        ];
        $validator = NULL;
		$messages = [];
	
        $success = true;
		$validation = true;
		
		foreach($newWorkers as $worker) {
			$validator = Validator::make($worker, $rules, $customMessages);

			if ($validator->fails()) {
				$validation = false;
				$messagesTemp = $validator->messages()->get('*');
				Log::info($messages);
				$messages = array_merge($messages, $messagesTemp);
			}
		}
		
		
		foreach($updatedWorkers as $worker) {
			$validator = Validator::make($worker, $rules, $customMessages);
			
			if ($validator->fails()) {
				$validation = false;
				$messagesTemp = $validator->messages()->get('*');
				Log::info($messages);
				$messages = array_merge($messages, $messagesTemp);
			}
		}
		
		if ($validation==false) {
				Log::info($messages);
				return json_encode(['status' => 'error', 'messages' => $messages]);
			}
		
		
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
            return json_encode(['status' => 'error', 'messages' => ['Nie mozna usunac pracownika poniewaz jest on juz zwiazany z jakims kurnikiem, usun go z listy odpowiedzialnych za kurnik osob przed proba usuniecia go calkowicie']]);
        }
    }
	
	 public function feedAll() {
        //
        return json_encode(['status' => 'success']);
    }
}
