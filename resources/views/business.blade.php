@extends('master')
@section('content')
    <div id="businessView" customers={{$customers}} products={{$products}} transactions={{$transactions}} storagerecords={{$storagerecords}}></div>
@endsection