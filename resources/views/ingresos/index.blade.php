@extends('layouts.admin')
@section('content')
<div class="">
        <div class="page-title">
          <div class="title_left">
            <h3>ingresos <small></small></h3>
          </div>

          <div class="title_right">
            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                @can('ingresos.create')
                    <a href="{{ route('ingresos.create') }}"  class="btn btn-primary btn-sm pull-right">Registrar</a>
                @endcan        
                </div>
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Tabla<small>Ingresos</small></h2>
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
                              No
                          </th>
                               <th>
                                   Fecha de Ingreso
                               </th>
                               <th>Nombre</th>
                               <th>Fecha Nacimiento</th>
                               <th>Genero</th>
                               <th>Nacionalidad</th>
                               <th>Doc. Mig.</th>
                               <th>No. Dod. Mig.</th>
                               <th>No. Acta</th>
                               <th>No. Internaciones 1,2, 3</th>
                              
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           @foreach($ingresos as $ingreso)
                           <tr>
                            <td>{{ $ingreso->id }}</td>
                                <td>{{ $ingreso->formatvalue($ingreso->fregistro) }}</td>
                                <td>{{ $ingreso->FullName }}</td>
                                 <td>{{ $ingreso->formatvalue($ingreso->fechanac) }}</td>
                                  <td>{{ $ingreso->genero }}</td>
                                   <td>{{ $ingreso->nacionalidad }}</td>
                                   <td>{{ $ingreso->documento }}</td>
                                   <td>{{ $ingreso->nodocumento}}</td>
                                   <td>{{ $ingreso->noacta }}</td>
                                       
                                        <td>{{ $ingreso->nointernaciones }}</td>
                                       <td class="" >
                                           
                                            <div class="btn-group">
                                           @can('ingresos.show')
                                           <a href="{{ route('ingresos.show',$ingreso->id) }}" class="btn btn-xs btn-default" data-toggle="tooltip" data-placement="left" title="Ver"><i class="fa fa-eye"></i></a>
                                           @endcan
                                           @can('ingresos.edit')
                                           <a href="{{ route('ingresos.edit',$ingreso->id) }}" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="left" title="Editar"><i class="fa fa-edit"></i></a>
                                           @endcan
                                           @can('ingresos.destroy')
                                            
                                           <a href="{{ route('ingresos.destroy', $ingreso->id) }}" data-method="DELETE" data-token="{{ csrf_token() }}" data-toggle="tooltip" data-placement="left" title="Eliminar" class="btn btn-xs btn-warning jquery-postback"><i class="fa fa-close"></i></a
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