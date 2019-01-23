<?php

namespace App\Http\Controllers;

use App\informe;
use Carbon\Carbon;
use App\etapaprocesal;
use Illuminate\Http\Request;
use App\Http\Requests\InformeStoreRequest;

class InformeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $informes = informe::All();
      
        return view('informe.index', compact('informes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $etapa = etapaprocesal::All('name')->pluck('name','name');
        return view('informe.create',compact('informes','etapa'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InformeStoreRequest $request)
    {
        
        $informe= informe::create([
            'actor'=>$request->input('actor'),
            'abogado'=>$request->input('abogado'),
            'demandada'=>$request->input('demandada'),
            'tribunal'=>$request->input('tribunal'),
            'expediente'=>$request->input('expediente'),
            'etapa'=>$request->input('etapa'),
            'estrategia'=>$request->input('estrategia'),
            'monto'=>$request->input('monto'),
            'propuesta'=>$request->input('propuesta'),
            'fecha_arreglo'=>Carbon::createFromFormat( 'd/m/Y', $request->input('fecha_arreglo'))
        ]);
      
        return redirect()->route('informes.edit',$informe->id)
        ->with('message-success','informe guardado correctamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\informe  $informe
     * @return \Illuminate\Http\Response
     */
    public function show(informe $informe)
    {
        return view('informe.show', compact('informe'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\informe  $informe
     * @return \Illuminate\Http\Response
     */
    public function edit(informe $informe)
    {
        $etapa = etapaprocesal::All('name')->pluck('name','name');
        
        $fecha=Carbon::parse($informe->fecha_arreglo)->format('d/m/Y');
        return view('informe.edit', compact('informe','etapa','fecha'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\informe  $informe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, informe $informe)
    {
        $informe->update([
            'actor'=>$request->input('actor'),
            'abogado'=>$request->input('abogado'),
            'demandada'=>$request->input('demandada'),
            'tribunal'=>$request->input('tribunal'),
            'expediente'=>$request->input('expediente'),
            'etapa'=>$request->input('etapa'),
            'estrategia'=>$request->input('estrategia'),
            'monto'=>$request->input('monto'),
            'propuesta'=>$request->input('propuesta'),
            'fecha_arreglo'=>$request->input('fecha_arreglo')
        ]);
        return redirect()->route('informes.edit',$informe->id)
        ->with('message-success','informe actualizado con exito');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\informe  $informe
     * @return \Illuminate\Http\Response
     */
    public function destroy(informe $informe)
    {
        $informe->delete();
        
        return response()->json('Se elimino Correctamente');
       
       
    }
}
