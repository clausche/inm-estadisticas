@extends('layouts.admin')
@section('css')
<link href="{{ asset('css/plugins/dataTables/datatables.min.css') }}" rel="stylesheet">


@endsection
@section('content')
<div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Usuarios <small>Lista</small></h3>
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
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Usuarios</h2>
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
                <div class="row">

                        <div class="col-md-12 ">
                               
                          <!-- price element -->
                          {!! Form::open(['route'=>['users.passchange','method'=>'POST']]) !!}
                          <div class="col-md-3 col-md-offset-4">
                            <div class="pricing">
                              <div class="title">
                                    <h1>Cuenta</h1>
                                <h2>Cambiar Contraseña</h2>
                                
                              </div>
                              <div class="x_content">
                                <div class="">
                                   <div class="pricing_features">
                                    <ul class="list-unstyled text-left">
                
                                    <div class="form-group">
    
    {!! Form::password('clave_actual',['class'=>'form-control','placeholder'=>'Contraseña Actual']) !!}
    <div class="text-danger">{{$errors->first('clave_actual')}}</div>
</div>
    <div class="form-group">
    {!! Form::password('clave', ['class'=>'form-control','placeholder'=>'Contraseña Nueva']) !!}
    <div class="text-danger">{{$errors->first('clave')}}</div>
</div>
<div class="form-group">
        {!! Form::password('clave_confirmation', ['class'=>'form-control','placeholder'=>'Repetir Contraseña']) !!}
        
    </div>
  

</div>
</div>
<div class="pricing_footer">
        {!! Form::submit('Cambiar',['class'=>'btn btn-sm btn-success btn-block']) !!}
</div>
</div>
</div>
</div>
</div>

{!! Form::close() !!}

<!-- price element -->

</div>
</div>
</div>
</div>
</div>
</div>


@endsection