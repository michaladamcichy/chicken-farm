<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link href=>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="/css/app.css">
        <style>
            body  {
            background-image: url("/images/grass.jpg");
            }
        </style>
    </head>
    <body>
        <div id="topBar"></div>
        @yield('content')
        <script src="/js/app.js"></script>
    </body>
</html>
