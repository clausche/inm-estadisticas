@extends('layouts.admin')
@section('content')
<div class="">
        <div class="page-title">
          <div class="title_left">
            <h3>Expediente <small>Casos</small></h3>
          </div>

          <div class="title_right">
            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                @can('informes.create')
                    <a href="{{ route('informes.create') }}"  class="btn btn-primary btn-sm pull-right">Crear</a>
                @endcan        
                </div>
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Tabla<small>Expendientes</small></h2>
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
                                   Actor
                               </th>
                               <th>
                                   Contrario
                               </th>
                               <th>Cliente</th>
                               <th>No. Junta</th>
                               <th>Expediente</th>
                               <th>Etapa Procesal</th>
                               <th>Fecha de Audencia</th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($informes as $info)
                           <tr>
                               <td>{{ $info->actor }}</td>
                                <td>{{ $info->abogado }}</td>
                                <td>{{ $info->demandada }}</td>
                                 <td>{{ $info->tribunal }}</td>
                                  <td>{{ $info->expediente }}</td>
                                   <td>{{ $info->etapa }}</td>
                                
                                       <td>{{ $info->formatvalue($info->fecha_arreglo) }}</td>
                                       <td class="" >
                                           
                                            <div class="btn-group">
                                           @can('informes.show')
                                           <a href="{{ route('informes.show',$info->id) }}" class="btn btn-xs btn-default" data-toggle="tooltip" data-placement="left" title="Ver"><i class="fa fa-eye"></i></a>
                                           @endcan
                                           @can('informes.edit')
                                           <a href="{{ route('informes.edit',$info->id) }}" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="left" title="Editar"><i class="fa fa-edit"></i></a>
                                           @endcan
                                           @can('informes.destroy')
                                            
                                           <a href="{{ route('informes.destroy', $info->id) }}" data-method="delete" data-toggle="tooltip" data-placement="left" title="Eliminar" class="btn btn-xs btn-warning jquery-postback"><i class="fa fa-close"></i></a
                                           @endcan
                                        </div>
                                        
                                       </td>
                           </tr>
                           @endforeach
                       </tbody>
                       <tfoot>
                                <tr>
                                     <th>
                                   Actor
                               </th>
                               <th>
                                   Contrario
                               </th>
                               <th>Cliente</th>
                               <th>No. Junta</th>
                               <th>Expediente</th>
                               <th>Etapa Procesal</th>
                               <th>Fecha de Audencia</th>
                               <th>Action</th>
                                </tr>
                                </tfoot>

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

    $.post({
        type: $this.data('method'),
        url: $this.attr('href')
    }).done(function (data) {
        alert('success');
        location.reload();
        console.log(data);
    });
});

});
</script>
@endsection