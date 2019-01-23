@extends('layouts.app')

@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-10">
                    <h2>Lista de Etapas Procesal</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="{{ route('home') }}">Home</a>
                        </li>
                        <li class="breadcrumb-item active">
                          <strong>Etapas</strong>
                        </li>
                       
                    </ol>
                </div>
                <div class="col-lg-2">

                  
                </div>
            </div>
            <div class="wrapper wrapper-content animated fadeInRight ecommerce">


            <div class="ibox-content m-b-sm border-bottom">
                <div class="row">
                      {!! Form::open(['route'=>['etapaprocesals.store','method'=>'PUT']]) !!}
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" for="order_id">Etapa</label>
                            <input type="text" id="order_id" name="name" value="" placeholder="Etapa" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="form-group">
                            <label class="col-form-label" for="status">Descripcion</label>
                            <input type="text" id="status" name="description" value="" placeholder="Description" class="form-control">
                        </div>
                    </div>
                     <div class="col-sm-1">
                        <div class="form-group">
                             <br>
                             <br>
                             {!! Form::submit('Guardar',['class'=>'btn btn-success']) !!}
                        </div>
                    </div>
                    {!! Form::close() !!}
                    
                </div>

            </div>

           
            <div class="row">
<div class="col-lg-12">
        <div class="ibox float-e-margins">
        <div class="ibox-title">
            <h5>Lista de Etapas</h5>
            <div class="ibox-tools">
                <a class="collapse-link">
                    <i class="fa fa-chevron-up"></i>
                </a>
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-wrench"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="#">Config option 1</a>
                    </li>
                    <li><a href="#">Config option 2</a>
                    </li>
                </ul>
                <a class="close-link">
                    <i class="fa fa-times"></i>
                </a>
            </div>
        </div>
        <div class="ibox-content">
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
                               <th>
                                   Description
                               </th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($etapas as $etapa)
                           <tr>
                               <td>{{ $etapa->id }}</td>
                                <td>{{ $etapa->name }}</td>
                                <td>{{ $etapa->description }}</td>
                               
                                       <td class="text-right">
                                           <div class="btn-group">

                                           @can('roles.show')
                                           <a href="{{ route('etapaprocesals.show',$etapa->id) }}" class="btn btn-sm btn-default">Ver</a>
                                           @endcan
                                           @can('roles.edit')
                                           <a href="{{ route('etapaprocesals.edit',$etapa->id) }}" class="btn btn-sm btn-primary">Editar</a>
                                           @endcan
                                           @can('etapaprocesals.destroy')
                                            
                                           {!! Form::open(['route'=>['etapaprocesals.destroy', $etapa->id],
                                           
                                           'method'=>'DELETE']) !!}

                                           <button class="btn btn-danger btn-sm">Eliminar</button>
                                           {!! Form::close() !!}
                                           @endcan
                                           </div>
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                   </table>
                   {{ $etapas->render() }}
                </div>
            </div>
        </div>
    </div>
</div>
            </div>
@endsection