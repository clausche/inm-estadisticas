@extends('layouts.admin')
@section('content')
<div class="">
        <div class="page-title">
          <div class="title_left">
            <h3>Repatriados <small></small></h3>
          </div>

          <div class="title_right">
            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                @can('repatriados.create')
                    <a href="{{ route('repatriados.create') }}"  class="btn btn-primary btn-sm pull-right">Registrar</a>
                @endcan        
                </div>
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Tabla<small>Repatriados</small></h2>
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
                  <p class="text-muted font-13 m-b-30">
                    
                  </p>
               
                   <table id="datatable" class="table table-striped table-bordered table-hover table-responsive">
                       <thead>
                           <tr>
                               
                               <th>
                                   Nombre
                               </th>
                               <th>Apellidos</th>
                               <th>Fecha Nac</th>
                               <th>Menor</th>
                               <th>Sexo</th>
                               <th>Delito</th>
                               <th>Banda</th>
                               <th>Clase</th>
                               <th>Fecha de Repatriacion</th><th>Sitio</th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($repatriados as $repatriado)
                           <tr>
                               
                                <td>{{ $repatriado->nombre }}</td>
                                <td>{{ $repatriado->apellidos }}</td>
                                 <td>{{ $repatriado->formatvalue($repatriado->fechanac) }}</td>
                                  <td>{{ $repatriado->menor }}</td>
                                   <td>{{ $repatriado->sexo }}</td>
                                   <td>{{ $repatriado->delito }}</td>
                                   <td>{{ $repatriado->banda}}</td>
                                   <td>{{ $repatriado->class }}</td>
                                       <td>{{ $repatriado->formatvalue($repatriado->fecharep) }}</td>
                                        <td>{{ $repatriado->sitio }}</td>
                                       <td class="" >
                                           
                                            <div class="btn-group">
                                           @can('repatriados.show')
                                           <a href="{{ route('repatriados.show',$repatriado->id) }}" class="btn btn-xs btn-default" data-toggle="tooltip" data-placement="left" title="Ver"><i class="fa fa-eye"></i></a>
                                           @endcan
                                           @can('repatriados.edit')
                                           <a href="{{ route('repatriados.edit',$repatriado->id) }}" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="left" title="Editar"><i class="fa fa-edit"></i></a>
                                           @endcan
                                           @can('repatriados.destroy')
                                            
                                           <a href="{{ route('repatriados.destroy', $repatriado->id) }}" data-method="DELETE" data-token="{{ csrf_token() }}" data-toggle="tooltip" data-placement="left" title="Eliminar" class="btn btn-xs btn-warning jquery-postback"><i class="fa fa-close"></i></a
                                           @endcan
                                        </div>
                                        
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                      
                   </table>
                
                

                </div>
            </div>
        </div>
    </div>
</div>

@endsection    
@section('js')
{!!Html::script('vendors/datatables.net/js/jquery.dataTables.min.js')!!}
{!!Html::script('vendors/datatables.net-bs/js/dataTables.bootstrap.min.js')!!}
{!!Html::script('vendors/datatables.net-responsive/js/dataTables.responsive.min.js')!!}
{!!Html::script('vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js')!!}
{!!Html::script('vendors/datatables.net-scroller/js/datatables.scroller.min.js')!!}
{!!Html::script('vendors/Chart.js/dist/Chart.min.js')!!}
{!!Html::script('js/angular-datatables.min.js')!!}
<!-- Datatables -->
<script>
$(document).ready(function() {
    $('#datatable').dataTable();
     $('.datatable-responsive').DataTable();

     $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
$(document).on('click', 'a.jquery-postback', function(e) {
    
    e.preventDefault(); // does not go through with the link.

    var $this = $(this);

    $.ajax({
        url: $this.attr('href'),
        type:$this.data('method'),
        headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        success:function(data){
       
        
        location.reload();
        alert('success');
        console.log(data);
        }
    });
});

});
</script>
@endsection