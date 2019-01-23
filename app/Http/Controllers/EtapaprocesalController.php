<?php

namespace App\Http\Controllers;

use App\etapaprocesal;
use Illuminate\Http\Request;

class EtapaprocesalController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:etapaprocesals.create')->only(['create','store']);
        $this->middleware('permission:etapaprocesals.index')->only(['index']);
        $this->middleware('permission:etapaprocesals.edit')->only(['edit','update']);
        $this->middleware('permission:etapaprocesals.show')->only(['show']);
        $this->middleware('permission:etapaprocesals.destroy')->only(['destroy']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $etapas = etapaprocesal::paginate();
        return view('etapaprocesal.index', compact('etapas'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $etapaprocesal= etapaprocesal::create($request->all());
        return redirect()->route('etapaprocesals.index')
        ->with('info','Etapa se guardado correctamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\etapaprocesal  $etapaprocesal
     * @return \Illuminate\Http\Response
     */
    public function show(etapaprocesal $etapaprocesal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\etapaprocesal  $etapaprocesal
     * @return \Illuminate\Http\Response
     */
    public function edit(etapaprocesal $etapaprocesal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\etapaprocesal  $etapaprocesal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, etapaprocesal $etapaprocesal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\etapaprocesal  $etapaprocesal
     * @return \Illuminate\Http\Response
     */
    public function destroy(etapaprocesal $etapaprocesal)
    {
        //
    }
}
