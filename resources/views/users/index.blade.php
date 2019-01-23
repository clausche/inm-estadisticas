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
            <p>Tabla de usuarios para acceso a modulos del sistema <span class="pull-right"><a href="{{route('register')}}" class="btn btn-success"   >Nuevo</a></span></p>

            <!-- start project list -->
            <table class="table table-striped projects">
                       <thead>
                           <tr>
                               <th style="width: 1%">Id</th>
                               <th style="width: 20%">Nombre</th>
                               <th>Username</th>
                               <th>Correo</th>
                               <th>Rol</th>
                               <th style="width: 20%">Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($users as $user)
                           <tr>
                               <td>{{ $user->id }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->username }}</td>
                                <td>{{ $user->email }}</td>
                                <td>{{ $user->role }}</td>
                               
                                       <td>
                                           @can('users.show')
                                           <a href="{{ route('users.show',$user->id) }}" class="btn btn-xs btn-default">Ver</a>
                                           @endcan
                                           @can('users.edit')
                                           <a href="{{ route('users.edit',$user->id) }}" class="btn btn-xs btn-primary">Editar</a>
                                           @endcan
                                           @can('users.destroy')
                                            
                                           {!! Form::open(['route'=>['users.destroy', $user->id],'method'=>'DELETE']) !!}
                                           <button class="btn btn-danger btn-xs">Eliminar</button>
                                           {!! Form::close() !!}
                                           @endcan
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                      </table>
                   {{ $users->render() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>


@endsection
@section('scripts')

  <script src="{{ asset('js/plugins/dataTables/datatables.min.js') }}" ></script>
    <script src="{{ asset('js/plugins/dataTables/dataTables.bootstrap4.min.js') }}" ></script>
@endsection

    @section('scriptslocal')
     <!-- Page-Level Scripts -->
    <script>
        $(document).ready(function(){
            $('.dataTables-example').DataTable({
                pageLength: 25,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {extend: 'print',
                     customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                    }
                    }
                ]

            });

        });

    </script>



@endsection