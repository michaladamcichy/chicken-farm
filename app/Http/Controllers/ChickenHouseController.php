<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chicken;

class ChickenHouseController extends Controller
{
    public function show($id) {
       $chickens = Chicken::where('chickenhouse_id', $id)->get();

       return view('chickenHouse', ['chickens' => $chickens]);
    }
}
