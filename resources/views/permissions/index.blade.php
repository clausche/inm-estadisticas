@extends('layouts.admin')

@section('content')
<div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Permisos<small></small></h3>
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
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Lista<small>Permisos</small></h2>
            
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
                <p class=""> @can('permissions.create')
                        <a href="{{ route('permissions.create') }}"  class="btn btn-primary btn-sm">Registrar</a>
                    @endcan  </p>
                <div class="table-responsive">
                   <table class="table table-striped table-responsive">
                       <thead>
                           <tr>
                               <th>
                                   Id
                               </th>
                               <th>
                                   Nombre
                               </th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($permissions as $permission)
                           <tr>
                               <td>{{ $permission->id }}</td>
                                <td>{{ $permission->name }}</td>
                               
                                       <td width="50px">
                                           @can('permissions.show')
                                           <a href="{{ route('permissions.show',$permission->id) }}" class="btn btn-sm btn-default">Ver</a>
                                           @endcan
                                          
                                           @can('permissions.destroy')
                                            
                                           {!! Form::open(['route'=>['permissions.destroy', $permission->id],
                                           
                                           'method'=>'DELETE']) !!}

                                           <button class="btn btn-danger btn-sm">Eliminar</button>
                                           {!! Form::close() !!}
                                           @endcan
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                   </table>
                   {{ $permissions->render() }}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection