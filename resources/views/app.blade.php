<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Polska - fanowski portal hiszpańskiego klubu Real Madrid</title>
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-134339010-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-134339010-1');
		</script>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{secure_asset('js/app.js')}}" ></script>
    </body>
</html>