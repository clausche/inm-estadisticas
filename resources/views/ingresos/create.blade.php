@extends('layouts.admin')
@section('css')
{!!Html::style('vendors/bootstrap-daterangepicker/daterangepicker.css')!!}
@endsection
@section('content')
<div class="">
            <div class="page-title">
              <div class="title_left">
              
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                 
                </div>
              </div>
            </div>
             <div class="clearfix"></div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Ingresos<small></small></h2>
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

                    
                            {!! Form::open(['route'=>['ingresos.store','method'=>'PUT']]) !!}
                            {!! Form::hidden('user_id', auth()->user()->id) !!}

                            <h2>Datos</h2>
                            <div class="form-group col-md-2 has-feedback">
                              {!! Form::label('fecha', 'Fecha de Ingreso') !!}
                              {!! Form::date('fingreso', null, ['class'=>'form-control', 'required']) !!}
                              <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                          </div>
                            <div class="form-group col-md-2">
                                {!! Form::label('nombre', 'Nombre') !!}
                                {!! Form::text('nombre', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-2">
                                {!! Form::label('apellidos', 'Apellidos') !!}
                                {!! Form::text('apellidos', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-2 has-feedback">
                                {!! Form::label('fechanac', 'Fecha de Nacimiento') !!}
                                {!! Form::date('fnacimiento', null, ['class'=>'form-control', 'required']) !!}
                                <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                            </div>
                            <div class="form-group col-md-1">
                              {!! Form::label('genero', 'Genero') !!}
                              {!! Form::select('genero',[''=>'','M'=>'M','F'=>'F'] ,null, ['class'=>'form-control', 'required']) !!}
                          </div>
                            
                          <div class="form-group col-md-2">
                            {{ Form::label('name', 'Nacionalidad') }}
                            {{ Form::select('nacionalidad', $paises->pluck('nacionalidad','nacionalidad') ,null, array('placeholder' => 'Seleccione un Opcion ...','class' => 'form-control')) }}
                          </div>

                         
                          <div class="clearfix"></div>
                          <h2>Documentacion</h2>
                          <div class="form-group col-md-1">
                            {!! Form::label('documento', 'Doc. Mig.') !!}
                            {!! Form::select('documento',[''=>'','FMM'=>'FMM','TVRH'=>'TVRH','TR'=>'TR'] ,null, ['class'=>'form-control', 'required']) !!}
                          </div>
                          <div class="form-group col-md-2">
                            {!! Form::label('documento', '# Doc. Mig.') !!}
                            {!! Form::text('nodocumento', null, ['class'=>'form-control', 'required']) !!}
                          </div>
                          <div class="form-group col-md-2">
                            {!! Form::label('acta', 'No. Acta') !!}
                            {!! Form::text('noacta', null, ['class'=>'form-control', 'required']) !!}
                          </div>
                          <div class="form-group col-md-3">
                            {!! Form::label('nointernaciones', 'No. Internaciones 1,2,3') !!}
                            {!! Form::text('nointernaciones', null, ['class'=>'form-control']) !!}
                          </div>

                            <div class="form-group col-md-2 has-feedback">
                                {!! Form::label('fretorno', 'Fecha de Retorno USA' ) !!}
                                {!! Form::date('fretorno', null, ['class'=>'form-control', 'required']) !!}
                                <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                            </div>
                            <div class="form-group col-md-2 has-feedback">
                              {!! Form::label('fvigencia', 'Vencimiento de Documento' ) !!}
                              {!! Form::date('fvigencia', null, ['class'=>'form-control', 'required']) !!}
                              <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                          </div>
                            
                          </div>
                            <div class="form-group col-md-1">
                                {!! Form::label('CANCEL', 'Cancel Doc. Mig.') !!}
                                {!! Form::select('doccancelacion',[''=>'','SI'=>'SI','NO'=>'NO'], null, ['class'=>'form-control']) !!}
                            </div>
                           
                            <div class="clearfix"></div>
                          <h2>Grupos</h2>
                            <div class="form-group col-md-1">
                              {!! Form::label('familia', 'Familia') !!}
                              {!! Form::text('familia', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-2">
                              {!! Form::label('Acreditacion', 'Acreditacion Vinculo') !!}
                              {!! Form::text('acreditacionv', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-2">
                              {!! Form::label('salud', 'Salud') !!}
                              {!! Form::text('saludo', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-3">
                              {!! Form::label('Observaciones', 'Observaciones') !!}
                              {!! Form::text('observaciones', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="clearfix"></div>
                            <h2>Referencias</h2>

                            <div class="form-group col-md-3">
                              {!! Form::label('tienesf', 'Tiene Familiares en USA?') !!}
                              {!! Form::text('usafamiliares', null, ['class'=>'form-control', ]) !!}
                            </div>
                            <div class="form-group col-md-3">
                              {!! Form::label('Observaciones', 'Quienes los esperan en USA?') !!}
                              {!! Form::text('quienesperausa', null, ['class'=>'form-control', ]) !!}
                            </div>
                            <div class="form-group col-md-3">
                              {!! Form::label('Observaciones', 'En Donde esperan en Mexico para su cita?') !!}
                              {!! Form::text('quienesperamx', null, ['class'=>'form-control', ]) !!}
                            </div>
                            <div class="form-group col-md-3">
                              {!! Form::label('Observaciones', 'Comentarios sobre el lugar de espera de su Proxima Cita') !!}
                              {!! Form::text('proximacita', null, ['class'=>'form-control', ]) !!}
                            </div>

                            <div class="clearfix"></div>
                            <div class="form-group pull-right">
                                {!! Form::submit('Guardar',['class'=>'btn btn-sm btn-success']) !!}
                            </div>
                            {!! Form::close() !!}
                    
                        </div>
                    </div>
                  </div>
                </div>
    
    
                </div>
    @stop
    @section('js')
      {!!Html::script('vendors/datatables.net/js/jquery.dataTables.min.js')!!}
      {!!Html::script('vendors/datatables.net-bs/js/dataTables.bootstrap.min.js')!!}
      {!!Html::script('vendors/datatables.net-responsive/js/dataTables.responsive.min.js')!!}
      {!!Html::script('vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js')!!}
      {!!Html::script('vendors/datatables.net-scroller/js/datatables.scroller.min.js')!!}

      {!!Html::script('vendors/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js')!!}
      {!!Html::script('vendors/devbridge-autocomplete/dist/jquery.autocomplete.min.js')!!}
      {!!Html::script('js/angular-datatables.min.js')!!}
       <!-- Datatables -->
        <script>
          $(document).ready(function() {
              $('#datatable').dataTable();
               $('#datatable-responsive').DataTable();
              
              
             });
          </script>
           <script>
          $(document).ready(function() {
               $.ajaxSetup({
                      headers: {
                                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                              }
                            });
    
            var token = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
              url:'/api/personal',
              type:'GET',
              dataType:'JSON',
              success:function(respuesta){
                var countries = respuesta
    
                  var countriesArray = $.map(countries, function(value, key) {
                      return {
                      value: value,
                        data: key
                        };
                    });
    
                 $('#autocomplete-custom-append').autocomplete({
                          lookup: countriesArray,
                          appendTo: '#autocomplete-container'
                        });
    
                }
              });
    
             $.ajax({
              url:'',
              type:'GET',
              dataType:'JSON',
              success:function(respuesta){
                var countries2 = respuesta
    
                  var countriesArray2 = $.map(countries2, function(value, key) {
                      return {
                        value: value,
                        data: key
                      };
                  });
    
                    $('#autocomplete-custom-append2').autocomplete({
                            lookup: countriesArray2,
                            appendTo: '#autocomplete-container2'
                          });
    
                  
                }
              });
    
      // initialize autocomplete with custom appendTo
          
    
          
    
              });
           
            </script>
    
      @stop     