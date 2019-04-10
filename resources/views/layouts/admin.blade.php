<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" >
  <head>
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="icon" type="image/png" sizes="32x32" href="{!!asset('img/favicon-96x96.png')!!}">
    <title>{{ config('app.name', 'PE') }}</title>

    <!-- Bootstrap -->
    {!!Html::style('vendors/bootstrap/dist/css/bootstrap.min.css')!!}
    <!--<link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">-->
    <!-- Font Awesome -->
    {!!Html::style('vendors/font-awesome/css/font-awesome.min.css')!!}
    <!--<link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">-->
    <!-- iCheck -->
    {!!Html::style('vendors/iCheck/skins/flat/green.css')!!}
    <!--<link href="vendors/iCheck/skins/flat/green.css" rel="stylesheet">-->
    <!-- bootstrap-progressbar -->
    {!!Html::style('vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css')!!}
    {!!Html::style('vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css')!!}
   <!-- <link href="vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">-->
    <!-- jVectorMap -->
    {!!Html::style('css/maps/jquery-jvectormap-2.0.3.css')!!}
   <!-- <link href="css/maps/jquery-jvectormap-2.0.3.css" rel="stylesheet"/>-->

   {!!Html::style('js/pnotify/pnotify.custom.min.css')!!}


    @yield('css')
    <!-- Custom Theme Style -->
    {!!Html::style('build/css/custom.min.css')!!}
   <!-- <link href="build/css/custom.min.css" rel="stylesheet">-->

   <script language="JavaScript">
function fullScreen() {
var el = document.documentElement
    , rfs = // for newer Webkit and Firefox
           el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullScreen
;
if(typeof rfs!="undefined" && rfs){
  rfs.call(el);
} else if(typeof window.ActiveXObject!="undefined"){
  // for Internet Explorer
  var wscript = new ActiveXObject("WScript.Shell");
  if (wscript!=null) {
     wscript.SendKeys("{F11}");
  }
}

}
// End -->
</script>
</head>
<body class="nav-md">
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col menu_fixed">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <a href="index.html" class="site_title"><i class="fa fa-book"></i> <span>Estadisticas</span></a>
          </div>
          <div class="clearfix"></div>

          <!-- menu profile quick info -->
          <div class="profile">
            <div class="profile_pic">
              {!!Html::image('images/user.png','alt',array('class'=>'img-circle profile_img'))!!}
            </div>
            <div class="profile_info">
              <span>Bienvenido,</span>
              <h2 id="userlog">{!!Auth::user()->name!!}</h2>
            </div>
          </div>
          <!-- /menu profile quick info -->
          <br />
          

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <h3>General</h3>
              <ul class="nav side-menu">
                <li><a href="{!!URL::to('home')!!}"><i class="fa fa-home"></i> Home </a></li>
                @can('ingresos.index')
                <li><a><i class="fa fa-list"></i>Ingresos<span class="fa fa-chevron-down"></span></a>
                  <ul class="nav child_menu">
                    <li><a href="{{ route('ingresos.index') }}">Registrados</a></li>
                    <li><a href="{{ url('downloadExcel/xlsx') }}">Exportar Tabla</a></li>
                  </ul>
                </li>
                @endcan
                @can('repatriados.index')
                <li><a><i class="fa fa-flash"></i>Repatriados<span class="fa fa-chevron-down"></span></a>
                  <ul class="nav child_menu">
                    <li><a href="{{ route('repatriados.index') }}">Lista</a></li>
                  </ul>
                </li>
                @endcan
                @can('informes.index')
                <li><a><i class="fa fa-file"></i>Expedientes<span class="fa fa-chevron-down"></span></a>
                  <ul class="nav child_menu">
                    <li><a href="{{ route('informes.index') }}">Lista</a></li>
                  </ul>
                </li>
                @endcan
                

                <li><a><i class="fa fa-gears"></i>Sistema<span class="fa fa-chevron-down"></span></a>
                  <ul class="nav child_menu">
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
          </div>
          <!-- /sidebar menu -->

          <!-- /menu footer buttons -->
          <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a href="javascript:void(0);" onclick="fullScreen('http://google.com');" data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true">
                  
                </span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
          </div>
          <!-- /menu footer buttons -->

          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                   {!!Html::image('images/user.png','alt')!!}{!!Auth::user()->name!!}
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    
                    <li><a href="{{route('users.pass')}}">Cambiar Contraseña</a></li>
                    <li>
                        <a href="{{ route('logout') }}"
                        onclick="event.preventDefault();
                                      document.getElementById('logout-form').submit();">
                        {{ __('Logout') }} 
                        </a>

                     <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                         @csrf
                     </form>
                      
                    </li>
                  </ul>
                </li>

                

                  </ul>
                </li>
            
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->
        
        <div class="right_col" role="main">
        @if(Session::has('message-success'))
          <div class="alert alert-success alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                    </button>
                   {{Session::get('message-success')}}
                  </div>
        @endif
        @if(Session::has('message-info'))
          <div class="alert alert-info alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                    </button>
                   {{Session::get('message-info')}}
                  </div>
        @endif
        @if(Session::has('message-warning'))
          <div class="alert alert-warning alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                    </button>
                   {{Session::get('message-warning')}}
                  </div>
        @endif
        @if(Session::has('message-error'))
          <div class="alert alert-error alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                    </button>
                   {{Session::get('message-error')}}
                  </div>
        @endif

         @yield('content')
        
        </div>
          <!-- footer content -->
        <footer>
          <div class="pull-left">
            version 2
          </div>
          <div class="pull-right">
            Derechos Reservados &copy; 2018
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->

      </div>
    </div>
    

    <!-- jQuery -->
    {!!Html::script('vendors/jquery/dist/jquery.min.js')!!}
    
    <!-- Bootstrap -->
    {!!Html::script('vendors/bootstrap/dist/js/bootstrap.min.js')!!}
   
    <!-- FastClick -->
    {!!Html::script('vendors/fastclick/lib/fastclick.js')!!}
    
    <!-- NProgress -->
    {!!Html::script('vendors/nprogress/nprogress.js')!!}
    
   
    {!!Html::script('js/moment/moment.min.js')!!}
    {!!Html::script('vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js')!!}

    {!!Html::script('js/datepicker/daterangepicker.js')!!}

    {!!Html::script('js/pnotify/pnotify.custom.min.js')!!}
   
    {!!Html::script('js/socket/socket.io.js')!!}
    
     <script>
        //var socket = io('http://localhost:3000');
       // var socket = io('http://10.100.4.4:3000');
    </script>

   

    <!-- Custom Theme Scripts -->
  

    //{!!Html::script('js/angular-1.5.5/angular.min.js')!!}
    
      //{!!Html::script('angular/app.js')!!}
   
   @yield('js')

   {!!Html::script('build/js/custom.min.js')!!}
 
    
  </body>
</html>