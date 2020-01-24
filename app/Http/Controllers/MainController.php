<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChickenHouse;
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
        $validator = Validator::make($chickenHouses, $rules, $customMessages);

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
            return return json_encode($chickenhouse);
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
            return return json_encode($chickenhouse);
        } else {
            return return json_encode(['status' => 'error', 'messages'=> ['Nie udalo sie edytowac kurnika']]);
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
                $chickenhouse->delete();
            } catch(\Throwable $e) {
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

    public function getChickenhousesIds(Request $request) {
        $chickenhouses = ChickenHouse::get('id');

        $chickenhousesIds = [];
        foreach($chickenhouses as $chickenhouse) {
            array_push($chickenhousesIds, $chickenhouse->id); 
        }

        return json_encode($chickenhousesIds);
    }
}
