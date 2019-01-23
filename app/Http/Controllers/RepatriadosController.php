<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repatriados;
use App\Detencion;
use Carbon\Carbon; 

class RepatriadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        
         
        $repatriados= Repatriados::All();
        
        return view('repatriados.index',compact('repatriados'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $detencion = Detencion::All();
        $detencion->push([''=>'']);
        return view('repatriados.create', compact('detencion'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validar = Repatriados::where('fechanac','=',$request->input('fechanac'))
        ->where('apellidos','=',$request->input('apellidos'))->where('fecharep','=',$request->input('fecharep'))->get()->count();

        if($validar>=1){
            return back()->with('message-warning','Ya exite registro con mismo apellidos, fecha de nacimiento y fecha de repatriacion');
        }else{

        $repatriados=Repatriados::create($request->all());
        return redirect()->route('repatriados.create')
        ->with('message-success','Se registro Corretamente');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Repatriados $repatriado)
    {
        $detencion = Detencion::All();
        $detencion->push([''=>'']);
        return view('repatriados.edit', compact('repatriado','detencion'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Repatriados $repatriado)
    {
        $repatriado->update($request->all());
        return redirect()->route('repatriados.edit',$repatriado->id)
        ->with('message-success','Repatriado actualizado con exito');
    }

    /**
     * Remove the specified resource from storage.
     *
      * @param  \App\Repatriados  $repatriados
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $repatriados=Repatriados::find($id);
        $repatriados->delete();
        
        return response()->json('Se elimino Correctamente');
    }

    public function char(){
        $result = Repatriados::where('fecharep',Carbon::now()->format('Y-m-d'))->get()->count();
        return response()->json($result);
    }
}
