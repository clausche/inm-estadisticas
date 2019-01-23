@extends('layouts.admin')

@section('content')
<div class="">

    <div class="row top_tiles">
      <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="tile-stats">
          <div class="icon"><i class="fa fa-archive"></i></div>
          <div class="count">{{$repatriadosdia}}</div>
          <h3>Repatriados</h3>
          <p>Repatriados en el Dia</p>
        </div>
      </div>
      <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="tile-stats">
          <div class="icon"><i class="fa fa-file-archive-o"></i></div>
          <div class="count">0</div>
          <h3>Item</h3>
          <p>item</p>
        </div>
      </div>
      <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="tile-stats">
          <div class="icon"><i class="fa fa-calendar-check-o"></i></div>
          <div class="count">0</div>
          <h3>item</h3>
          <p>item</p>
        </div>
      </div>
      <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="tile-stats">
          <div class="icon"><i class="fa fa-calendar-o"></i></div>
          <div class="count">0</div>
          <h3>Item</h3>
          <p>item</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Repatriados <small>mes</small></h2>
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
          <div style="width: 75%">{!! $charjs->render() !!}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="row">
      
    </div>
            
    

</div>
@endsection
@section('js')
{!!Html::script('vendors/Chart.js/dist/Chart.min.js')!!}

@endsection
