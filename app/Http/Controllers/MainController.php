<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChickenHouse;

class MainController extends Controller
{
    public function show() {
        $chickenHouses = ChickenHouse::get();
        return view('main', ['chickenHouses' => $chickenHouses]);
    }
}
