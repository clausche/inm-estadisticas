@extends('layouts.admin')

@section('content')
<div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Roles<small>Lista</small></h3>
      </div>

      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <a href="{{route('roles.create')}}" class="btn btn-success">Nuevo Rol</a>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Rol<small>Sistema</small></h2>
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
                <div class="table-responsive">

                   <table class="table table-striped table-responsive table-hover dataTables-example">
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
                           @foreach($roles as $role)
                           <tr>
                               <td>{{ $role->id }}</td>
                                <td>{{ $role->name }}</td>
                               
                                       <td width="50px">
                                           @can('roles.show')
                                           <a href="{{ route('roles.show',$role->id) }}" class="btn btn-sm btn-default">Ver</a>
                                           @endcan
                                           @can('roles.edit')
                                           <a href="{{ route('roles.edit',$role->id) }}" class="btn btn-sm btn-primary">Editar</a>
                                           @endcan
                                           @can('roles.destroy')
                                            
                                           {!! Form::open(['route'=>['roles.destroy', $role->id],
                                           
                                           'method'=>'DELETE']) !!}

                                           <button class="btn btn-danger btn-sm">Eliminar</button>
                                           {!! Form::close() !!}
                                           @endcan
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                   </table>
                   {{ $roles->render() }}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection