

{!! Form::hidden('user_id', auth()->user()->id) !!}

<div class="form-group">
    {!! Form::label('actor', 'Actor') !!}
    {!! Form::text('actor', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('abogado', 'Abogado') !!}
    {!! Form::text('abogado', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('Demandada', 'demandada') !!}
    {!! Form::text('demandada', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('tribunal', 'Tribunal') !!}
    {!! Form::text('tribunal', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('expediente', 'Expediente') !!}
    {!! Form::text('expediente', null, ['class'=>'form-control','id'=>"mask1"]) !!}
</div>
<div class="form-group">
    {!! Form::label('etapa', 'Etapa Procesal') !!}
    {!! Form::select('etapa', $etapa,null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('estrategia', 'Estrategia') !!}
    {!! Form::textarea('estrategia', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('monto', 'Monto Estimado') !!}
    {!! Form::text('monto', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('propuesta', 'Propuesta de Arreglo') !!}
    {!! Form::textarea('propuesta', null, ['class'=>'form-control']) !!}
</div>
<fieldset>
<div class="control-group">
        <div class="controls">
<div class="col-md-11 xdisplay_inputx form-group has-feedback">
    {!! Form::label('fecha', 'Fecha de Audiencia') !!}
    
    {!! Form::date('fecha_arreglo',null, ['class'=>'form-control has-feedback-left',"id"=>"single_cal4", "placeholder"=>"First Name","aria-describedby"=>"inputSuccess2Status4"]) !!}
    <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
    <span id="inputSuccess2Status4" class="sr-only">(success)</span>
</div>
</div>
</div>
</fieldset>
</div>
<div class="form-group">
    {!! Form::submit('Guardar',['class'=>'btn btn-sm btn-success']) !!}
</div>