@extends('layouts.admin')
@section('css')
 <link href="{{ asset('css/plugins/iCheck/custom.css') }}" rel="stylesheet">
  <link href="{{ asset('css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css') }}" rel="stylesheet">


@endsection
@section('content')
<div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Roles<small></small></h3>
      </div>

      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for...">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Asignacion<small>Roles</small></h2>
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Settings 1</a>
                  </li>
                  <li><a href="#">Settings 2</a>
                  </li>
                </ul>
              </li>
              <li><a class="close-link"><i class="fa fa-close"></i></a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
                    
                    {!! Form::model($user, ['route'=>['users.update',$user->id], 'method'=>'PUT']) !!}
                    @include('users.partials.form')
                    {!! Form::close() !!}
                   </div>
                    </div> 
                </div>
                </div>
                </div>
   

@endsection
@section('scriptslocal')
 <!-- iCheck -->
    <script src="{{ asset('js/plugins/iCheck/icheck.min.js') }}" type="text/javascript" defer></script>
        <script type="text/javascript" defer>
            $(document).ready(function () {
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
                });
            });
        </script>
@endsection
