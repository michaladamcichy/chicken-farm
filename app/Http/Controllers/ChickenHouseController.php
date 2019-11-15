<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChickenHouseController extends Controller
{
    public function show($id) {
        return view('chickenHouse');
    }
}
