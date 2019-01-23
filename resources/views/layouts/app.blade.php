<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('font-awesome/css/font-awesome.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/plugins/toastr/toastr.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('js/plugins/gritter/jquery.gritter.css') }}" rel="stylesheet" type="text/css">

      @yield("css")

    <link href="{{ asset('css/animate.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css">

    
    
</head>
<body id="app">
    <div id="wrapper">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav metismenu" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element"> <span>
                            <img alt="image" class="img-circle" src="{{ asset('img/profile_small.jpg') }}" />
                             </span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">@guest @else{{ Auth::user()->name }}</strong>
                             </span> <span class="text-muted text-xs block"> {{ Auth::user()->email }} @endguest<b class="caret"></b></span> </span> </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="profile.html">Profile</a></li>
                                <li><a href="contacts.html">Contacts</a></li>
                                <li><a href="mailbox.html">Mailbox</a></li>
                                <li class="divider"></li>
                                <li>
                                   <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </li>
                            </ul>
                        </div>
                        <div class="logo-element">
                          S+
                        </div>
                    </li>
                    @can('informes.index')
                    <li class="{!! Request::is('informe') ? 'active' : '' !!}">
                        <a href="{{ route('informes.index') }}"><i class="fa fa-file-archive-o"></i> <span class="nav-label">Expediente</span></a>
                    </li>
                    @endcan
                     @can('etapaprocesals.index')
                    <li class="{!! Request::is('etapaprocesals') ? 'active' : '' !!}">
                        <a href="{{ route('etapaprocesals.index') }}"><i class="fa fa-puzzle-piece"></i> <span class="nav-label">Etapa Procesal</span></a>
                    </li>
                    @endcan
                    <li class="{!! Request::is(['users','roles','permissions']) ? 'active' : '' !!}" >
                        <a href="#"><i class="fa fa-gear"></i> <span class="nav-label">Sistema</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse">
                          @can('users.index')
                            <li ><a href="{{ route('users.index') }}">Usuarios</a></li>
                          @endcan
                          @can('roles.index')
                            <li><a href="{{ route('roles.index') }}">Roles</a></li>
                              @endcan
                        @can('permissions.index')
                            <li><a href="{{ route('permissions.index') }}">Permisos</a></li>
                            @endcan
                        </ul>
                    </li>
                   
                </ul>

            </div>
        </nav>

        <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" action="search_results.html">
                <div class="form-group">
                    <input type="text" placeholder="Buscador" class="form-control" name="top-search" id="top-search">
                </div>
            </form>
        </div>
            <ul class="nav navbar-top-links navbar-right">
                <li>
                    <span class="m-r-sm text-muted welcome-message">Bienvenidos a SIGEDA</span>
                </li>
                


                <li>
                     <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                       <i class="fa fa-sign-out"> {{ __('Logout') }} </i> 
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                </li>
                <li>
                  
                    <a class="right-sidebar-toggle">
                        <i class="fa fa-tasks"></i>
                    </a>
                </li>
            </ul>

        </nav>
        </div>
        <!-- page content -->
       

        
            @if(session('info'))
            <div class="alert alert-success alert-dismissable" role="alert">
                <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                    {{ session('info') }}
                    <a class="alert-link" href="#">Alert Link</a>.
            </div>
            @endif
            @if(count($errors))
            <div class="alert alert-danger alert-dismissable">
                  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
                 <a class="alert-link" href="#">Alert Link</a>.
            </div>
            @endif
            @yield('content')
            
                <div class="footer">
                    <div class="pull-right">
                        Sistema para gestion de Datos
                    </div>
                    <div>
                        <strong>Copyright</strong> SIGEDA &copy; 2018
                    </div>
                </div>
            </div>
        </div>
  <!-- Scripts -->
     <script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.js') }}"></script>

    <script src="{{ asset('js/plugins/metisMenu/jquery.metisMenu.js') }}" ></script>
    <script src="{{ asset('js/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>

  <!-- Scripts views -->
    @yield("scripts")


    <script src="{{ asset('js/inspinia.js') }}" ></script>
    <script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>
    <script src="{{ asset('js/plugins/jquery-ui/jquery-ui.min.js') }}"></script>

    @yield("scriptslocal")

</body>
</html>
