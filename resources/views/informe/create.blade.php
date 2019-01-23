@extends('layouts.admin')
@section('css')
{!!Html::style('vendors/bootstrap-daterangepicker/daterangepicker.css')!!}
@endsection
@section('content')
<div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Nuevo Expediente</h3>
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
                    <h2>Expediente<small>Alta</small></h2>
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

                    
                            {!! Form::open(['route'=>['informes.store','method'=>'PUT']]) !!}
                            @include('informe.partials.form')
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
               $("#mask1").inputmask("999/99/99");

              
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