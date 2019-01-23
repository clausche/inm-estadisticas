@extends('layouts.app')

@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-10">
                    <h2>Expediente</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a>informes</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <strong>ver Expediente</strong>
                        </li>
                    </ol>
                </div>
                <div class="col-lg-2">

                </div>
            </div>
            <div class="wrapper wrapper-content animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content border-sbottom">
                            <h4>Importante</h4>
                            <p>
                                Cada caso debe estar debidamente revisado antes de editar, eliminar o crear nuevo Expediente
                            </p>

                        </div>
                    </div>
                </div>
            </div>
             <div class="row animate fadeInLeft">
            <div class="col-lg-8">
                <div class="ibox ">
                    <div class="ibox-content">
                         <p><strong>Actor</strong> {{ $informe->actor }}</p>
                     <p><strong>Abogado</strong> {{ $informe->abogado }}</p>
                      <p><strong>Demandado(a)</strong> {{ $informe->demandada }}</p>
                       <p><strong>Tribual</strong> {{ $informe->tribunal }}</p>
                        <p><strong>Expediente</strong> {{ $informe->expediente }}</p>
                         <p><strong>Etapa Peocesal</strong> {{ $informe->etapa }}</p>
                          <p><strong>Estrategia</strong> {{ $informe->estrategia }}</p>
                           <p><strong>Monto estimado</strong> {{ $informe->monto }}</p>
                            <p><strong>Propuesta de Arreglo</strong> {{ $informe->propuesta }}</p>
                             <p><strong>Fecha de Audiencia</strong> {{ $informe->fecha_arreglo }}</p>

                    </div>
                </div>
            </div>

                    

@endsection