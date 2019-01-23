@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Rol
                </div>

                <div class="card-body">
                    <p><strong>ID</strong> {{ $etapa->id }}</p>
                    <p><strong>Role</strong> {{ $etapa->name }}</p> 
                    <p><strong>Slug</strong> {{ $etapa->slug }}</p> 
                    <p><strong>Description</strong> {{ $etapa->description }}</p> 
                </div>
            </div>
        </div>
    </div>
</div>
@endsection