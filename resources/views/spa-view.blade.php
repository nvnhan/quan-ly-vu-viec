<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Loading... {{env("APP_NAME")}}</title>

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

    <link href="{{ asset('css/antd.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <div class="loading-wrapper">
            <div class="loading-content">
                <img src="{{ asset('images/intro.png') }}" />
                <div class="ant-spin ant-spin-lg ant-spin-spinning">
                    <span class="ant-spin-dot ant-spin-dot-spin">
                        <i class="ant-spin-dot-item"></i>
                        <i class="ant-spin-dot-item"></i>
                        <i class="ant-spin-dot-item"></i>
                        <i class="ant-spin-dot-item"></i>
                    </span>
                </div>
                <div class="loading-text">Đang tải ứng dụng!</div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/index.js') }}"></script>
</body>

</html>
