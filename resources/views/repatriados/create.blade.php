@extends('layouts.admin')
@section('css')
{!!Html::style('vendors/bootstrap-daterangepicker/daterangepicker.css')!!}
@endsection
@section('content')
<div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Nuevo Repatriado</h3>
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
                    <h2>Registrar<small>Repatriados</small></h2>
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

                    
                            {!! Form::open(['route'=>['repatriados.store','method'=>'PUT']]) !!}
                            {!! Form::hidden('user_id', auth()->user()->id) !!}

                           
                            <div class="form-group col-md-3">
                                {!! Form::label('nombre', 'Nombre') !!}
                                {!! Form::text('nombre', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-3">
                                {!! Form::label('apellidos', 'Apellidos') !!}
                                {!! Form::text('apellidos', null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-2 has-feedback">
                                {!! Form::label('fechanac', 'Fecha de Nacimiento') !!}
                                {!! Form::date('fechanac', null, ['class'=>'form-control', 'required']) !!}
                                <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                            </div>

                              <div class="form-group col-md-2">
                                {!! Form::label('menor', 'En caso de ser menor') !!}
                                {!! Form::select('menor',[''=>'','Acompañado'=>'Acompañado','No Acompañado'=>'No Acompañado'], null, ['class'=>'form-control']) !!}
                            </div>

                            <div class="form-group col-md-2 has-feedback">
                                {!! Form::label('fecharep', 'Fecha de Repatriacion' ) !!}
                                {!! Form::date('fecharep', null, ['class'=>'form-control', 'required']) !!}
                                <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>
                            </div>
                            <div class="form-group col-md-1">
                                {!! Form::label('sexo', 'Sexo') !!}
                                {!! Form::select('sexo',[''=>'','M'=>'M','F'=>'F'] ,null, ['class'=>'form-control', 'required']) !!}
                            </div>
                            <div class="form-group col-md-3">
                                {!! Form::label('lugardenac', 'Lugar de Nacimiento') !!}
                                {!! Form::select('lugarnac',[
                                ''=>'',
                                'AGUASCALIENTES'=>'AGUASCALIENTES',
'BAJA CALIFORNIA'=>'BAJA CALIFORNIA',
'BAJA CALIFORNIA SUR'=>'BAJA CALIFORNIA SUR',
'CAMPECHE'=>'CAMPECHE',
'CHIAPAS'=>'CHIAPAS',
'CHIHUAHUA'=>'CHIHUAHUA',
'COAHUILA'=>'COAHUILA', 
'COLIMA'=>'COLIMA',
'DURANGO'=>'DURANGO',
'ESTADO DE MÉXICO'=>'ESTADO DE MÉXICO',
'GUANAJUATO'=>'GUANAJUATO',
'GUERRERO'=>'GUERRERO',
'HIDALGO'=>'HIDALGO',
'JALISCO'=>'JALISCO',
'MICHOACÁN'=>'MICHOACÁN',
'MORELOS'=>'MORELOS',
'NAYARIT'=>'NAYARIT',
'NUEVO LEÓN'=>'NUEVO LEÓN',
'OAXACA'=>'OAXACA',
'PUEBLA'=>'PUEBLA',
'QUERÉTARO'=>'QUERÉTARO',
'QUINTANA ROO'=>'QUINTANA ROO',
'SAN LUIS POTOSÍ'=>'SAN LUIS POTOSÍ',
'SINALOA'=>'SINALOA',
'SONORA'=>'SONORA',
'TABASCO'=>'TABASCO',
'TAMAULIPAS'=>'TAMAULIPAS',
'TLAXCALA'=>'TLAXCALA',
'VERACRUZ'=>'VERACRUZ',
'YUCATÁN'=>'YUCATÁN',
'ZACATECAS'=>'ZACATECAS']

                                
                                
                                ,null, ['class'=>'form-control']) !!}
                            </div>
                            <div class="form-group col-md-3">
                              {!! Form::label('lugarorig', 'Lugar de Origen') !!}
                              {!! Form::select('lugarorig',[''=>'',
                              'AGUASCALIENTES'=>'AGUASCALIENTES',
'BAJA CALIFORNIA'=>'BAJA CALIFORNIA',
'BAJA CALIFORNIA SUR'=>'BAJA CALIFORNIA SUR',
'CAMPECHE'=>'CAMPECHE',
'CHIAPAS'=>'CHIAPAS',
'CHIHUAHUA'=>'CHIHUAHUA',
'COAHUILA'=>'COAHUILA', 
'COLIMA'=>'COLIMA',
'DURANGO'=>'DURANGO',
'ESTADO DE MÉXICO'=>'ESTADO DE MÉXICO',
'GUANAJUATO'=>'GUANAJUATO',
'GUERRERO'=>'GUERRERO',
'HIDALGO'=>'HIDALGO',
'JALISCO'=>'JALISCO',
'MICHOACÁN'=>'MICHOACÁN',
'MORELOS'=>'MORELOS',
'NAYARIT'=>'NAYARIT',
'NUEVO LEÓN'=>'NUEVO LEÓN',
'OAXACA'=>'OAXACA',
'PUEBLA'=>'PUEBLA',
'QUERÉTARO'=>'QUERÉTARO',
'QUINTANA ROO'=>'QUINTANA ROO',
'SAN LUIS POTOSÍ'=>'SAN LUIS POTOSÍ',
'SINALOA'=>'SINALOA',
'SONORA'=>'SONORA',
'TABASCO'=>'TABASCO',
'TAMAULIPAS'=>'TAMAULIPAS',
'TLAXCALA'=>'TLAXCALA',
'VERACRUZ'=>'VERACRUZ',
'YUCATÁN'=>'YUCATÁN',
'ZACATECAS'=>'ZACATECAS'], null, ['class'=>'form-control']) !!}
                          </div>
                            <div class="form-group col-md-1">
                                {!! Form::label('banda', 'Banda') !!}
                                {!! Form::select('banda',[''=>'','SI'=>'SI','NO'=>'NO'], null, ['class'=>'form-control']) !!}
                            </div>
                            <div class="form-group col-md-3">
                                {!! Form::label('delito', 'Delito') !!}
                                {!! Form::select('delito',[
                                  ''=>'',
                                  'Abuso Sexual'=>'Abuso Sexual',
                                  'Alteracion del orden público'=>'Alteracion del orden público',
                                  'Complicidad-encubrimiento'=>'Complicidad-encubrimiento',
                                  'Consumo de drogas'=>'Consumo de drogas',
                                  'DUI-DWI'=>'DUI-DWI',
                                  'Falsificacion de documentos'=>'Falsificacion de documentos',
                                  'Falta administraiva'=>'Falta administraiva',
                                  'Falta de transito'=>'Falta de transito',
                                  'Fraude'=>'Fraude',
                                  'Homicidio'=>'Homicidio',
                                  'Lavado de Dinero'=>'Lavado de Dinero',
                                  'No contesto'=>'No contesto',
                                  'Posesion de arma de fuego'=>'Posesion de arma de fuego',
                                  'Posesion de drogas'=>'Posesion de drogas',
                                  'Proceso Migratorio'=>'Proceso Migratorio',
                                  'Robo'=>'Robo',
                                  'Secuestro'=>'Secuestro',
                                  'Trafico de drogas'=>'Trafico de drogas',
                                  'Trafico de personas'=>'Trafico de personas',
                                  'Violencia'=>'Violencia',
                                  
                                  ], null, ['class'=>'form-control']) !!}
                            </div>
                            <div class="form-group col-md-1">
                              {!! Form::label('class', 'Clase') !!}
                              {!! Form::Select('class',[ ''=>'','ML'=>'ML','MH'=>'MH','HI'=>'HI','LO'=>'LO'], null, ['class'=>'form-control']) !!}
                          </div>
                          <div class="form-group col-md-2">
                            {!! Form::label('Sitio', 'Sitio') !!}
                            {!! Form::select('sitio',[''=>'','Juarez'=>'Juarez','Ojinaga'=>'Ojinaga'], null, ['class'=>'form-control']) !!}
                        </div>
                        <div class="form-group col-md-2">
                          {!! Form::label('oficial', 'Oficial USA') !!}
                          {!! Form::select('oficial',[''=>'','Border Patrol'=>'Border Patrol','CBP'=>'CBP','ICE'=>'ICE','US. Marchalls'=>'US. Marchalls',], null, ['class'=>'form-control']) !!}
                      </div>
                      <div class="form-group col-md-3">
                          {!! Form::label('Origen', 'USA Origen') !!}
                          {!! Form::select('detencion',$detencion->pluck('lugar','id'), null, ['class'=>'form-control']) !!}
                      </div>
                            </div>
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