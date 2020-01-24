@extends('master')
@section('content')
    <div id="farmView" chickenHouses="{{json_encode($chickenHouses)}}"></div>
@endsection