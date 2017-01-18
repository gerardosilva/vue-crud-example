<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="/css/sweetalert.css" rel="stylesheet">
        <link href="/css/app.css" rel="stylesheet">

        <!-- Scripts -->
        @yield('scripts', '')

        <script>
            window.Laravel = <?php echo json_encode([
                    'csrfToken' => csrf_token(),
            ]); ?>
        </script>

    </head>
    <body>
        <div id="app">
            @include('layouts.navbar')
            <!-- Main Content -->
            @yield('content')
        </div>
        <!-- JavaScript -->
        <script src="/js/app.js"></script>
        <script src="/js/sweetalert.min.js"></script>
    </body>
</html>
