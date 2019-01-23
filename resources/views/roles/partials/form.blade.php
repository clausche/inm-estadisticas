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
<h3>Permiso Especial</h3>
<div class="form-group">
<label for="">{!! form::radio('special','all-access') !!} Acceso Total</label>
<label for="">{!! form::radio('special','no-access') !!} Ningun Acceso</label>
</div>
<hr>
<h3>Lista de Permisos</h3>
<div class="form-group">
   <ul class="list-unstyled">
       @foreach ( $permissions as $permission)
       <li>
           <label for="">
             
             {!! Form::checkbox('permissions[]', $permission->id, null) !!}
             {{ $permission->name }}
             <em>( {{ $permission->description ?: 'N/A '}} ) </em>
             
           </label>
        </li>    
       @endforeach
       
   </ul>
</div>

<div class="form-group">
    {!! Form::submit('Guardar',['class'=>'btn btn-sm btn-success']) !!}
</div>