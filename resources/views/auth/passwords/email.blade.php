<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>SIGEDA | Forgot password</title>

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('font-awesome/css/font-awesome.css') }}" rel="stylesheet">

    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

</head>

<body class="gray-bg">

    <div class="passwordBox animated fadeInDown">
        <div class="row">

            <div class="col-md-12">
                <div class="ibox-content">

                    <h2 class="font-bold">{{ __('Reset Password') }}</h2>
                     <p>
                        Enter your email address and your password will be reset and emailed to you.
                    </p>


                 <div class="row">

                        <div class="col-lg-12">

                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" class="m-t" role="form"  action="{{ route('password.email') }}" aria-label="{{ __('Reset Password') }}">
                        @csrf

                        <div class="form-group">
                            
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Email address"  name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            
                        </div>

                       <button type="submit" class="btn btn-primary block full-width m-b">
                                    {{ __('Send Password Reset Link') }}
                                </button>
                         
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
 <hr/>
        <div class="row">
            <div class="col-md-6">
                Copyright desarrollo A medida
            </div>
            <div class="col-md-6 text-right">
               <small>© 2018</small>
            </div>
        </div>
</div>

</body>

</html>

