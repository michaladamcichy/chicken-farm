@extends('master')
@section('content')
    <div id="chickenHouseView" chickens={{$chickens}} chickenhouseId={{$id}} chickenhouseSize={{$size}}></div>
@endsection