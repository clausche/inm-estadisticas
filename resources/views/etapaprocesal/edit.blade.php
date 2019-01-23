@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Etapa Procesal</div>
                <div class="card-body">
                    
                    {!! Form::model($etapa, ['route'=>['etapaprocesals.update',$etapa->id], 'method'=>'PUT']) !!}
                    @include('etapaprocesal.partials.form')
                    {!! Form::close() !!}
                    
                </div>
            </div>
        </div>
    </div>
</div>
@endsection