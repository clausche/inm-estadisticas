<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingresos;
use App\Paises;
use Illuminate\Support\Facades\Storage;

class IngresosController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:ingresos.create')->only(['create','store']);
        $this->middleware('permission:ingresos.index')->only(['index']);
        $this->middleware('permission:ingresos.edit')->only(['edit','update']);
        $this->middleware('permission:ingresos.show')->only(['show']);
        $this->middleware('permission:ingresos.destroy')->only(['destroy']);
    }
    /**
     * 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingresos=Ingresos::where('fingreso',->get();
        return view('ingresos.index',compact('ingresos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $paises=Paises::all();
        return view('ingresos.create',compact('paises'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newDate = date("Y-m-d", strtotime($request->input('fingreso')));
        $newDate1 = date("Y-m-d", strtotime($request->input('fnacimiento')));
        $newDate2 = date("Y-m-d", strtotime($request->input('fretorno')));
        $newDate3 = date("Y-m-d", strtotime($request->input('fvigencia')));
        $ingreso= Ingresos::create([
            'fingreso'=>$newDate,
        'nombre'=>$request->input('nombre'),
        'apellidos'=>$request->input('apellidos'),
        'fnacimiento'=>$newDate1,
        'genero'=>$request->input('genero'),
        'nacionalidad'=>$request->input('nacionalidad'),
        'documento'=>$request->input('documento'),
        'nodocumento'=>$request->input('nodocumento'),
        'noacta'=>$request->input('noacta'),
        'nointernaciones'=>$request->input('nointernaciones'),
        'fretorno'=>$newDate2,
        'fvigencia'=>$newDate3,
        'doccancelacion'=>$request->input('doccancelacion'),
        'familia'=>$request->input('familia'),
        'acreditacionv'=>$request->input('acreditacionv'),
        'salud'=>$request->input('salud'),
        'observaciones'=>$request->input('observaciones'),
        'usafamiliares'=>$request->input('usafamiliares'),
        'quienesperausa'=>$request->input('quienesperausa'),
        'quienesperamx'=>$request->input('quienesperamx'),
        'proximacita'=>$request->input('proximacita'),
        ]);

        if($request->input('image')){
            $img= $request->input('image');
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        //$image_type = $image_type_aux[1];
  
        $image_base64 = base64_decode($image_parts[1]);
       
        $imgName=$ingreso->id.$ingreso->nodocumento.'.jpeg';
       $pathimagen='storage/'.$imgName;
       $path=Storage::disk('local')->put($imgName,$image_base64);
       $ingreso->fill(['image'=>$pathimagen])->save();
        }
        

      
        return redirect()->route('ingresos.index')
        ->with('message-success','Se registro correctamente No.'.$ingreso->id);
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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
