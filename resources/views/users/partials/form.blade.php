<div class="form-group">
    {!! Form::label('name', 'Nombre') !!}
    {!! Form::text('name', null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
   <ul class="list-unstyled">
       @foreach ( $roles as $role)
       <li>
           <div class="i-checks"><label for="">
             
             {!! Form::checkbox('roles[]', $role->id, null) !!}
             {{ $role->name }}
             <em>( {{ $role->description ?: 'N/A '}} ) </em>
             
           </label>
           </div>
        </li>    
       @endforeach
       
   </ul>
</div>

<div class="form-group">
    {!! Form::submit('Guardar',['class'=>'btn btn-sm btn-success']) !!}
</div>