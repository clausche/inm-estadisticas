<div class="form-group">
    {!! Form::label('name', 'Nombre') !!}
    {!! Form::text('name', null, ['class'=>'form-control {{ $errors->has("name") ? "is-invalid" : " " }}', 'id'=>'name']) !!}
    @if ($errors->has('name'))
        <span class="invalid-feedback" role="alert">
        <strong>{{ $errors->first('name') }}</strong>
        </span>
    @endif
</div>
<div class="form-group">
    {!! Form::label('slug', 'URL amigable') !!}
    {!! Form::text('slug', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('description', 'Description') !!}
    {!! Form::textarea('description', null, ['class'=>'form-control']) !!}
</div>
<hr>


<div class="form-group">
    {!! Form::submit('Guardar',['class'=>'btn btn-sm btn-success']) !!}
</div>